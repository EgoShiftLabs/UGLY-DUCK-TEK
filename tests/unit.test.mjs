import test from "node:test";
import assert from "node:assert/strict";
import {LESSONS,getLesson,gradeLesson,PASS_SCORE} from "../src/curriculum.js";
import {blank,validate,migrateV1,recordAttempt,recordArtifact,progress,exportPractice,exportPortfolio,STORAGE_KEY,MIN_SECTION} from "../src/state.js";
const makeArtifact=(lesson)=>Object.fromEntries(lesson.template.map((x,i)=>[x.key,
 "For "+lesson.name+", step "+(i+1)+" on "+x.label+": I will record a specific delivery step, seek evidence from three participants and revise the documented plan."]));
test("six substantial lessons with worked examples, four prompts and self-review rubrics",()=>{
 assert.equal(LESSONS.length,6);
 assert.equal(new Set(LESSONS.map(x=>x.id)).size,6);
 for(const l of LESSONS){
  assert.equal(l.sections.length,3);
  assert.ok(l.sections.flatMap(s=>s.paragraphs).join(" ").length>1100,"Depth insufficient for "+l.id);
  assert.equal(l.objectives.length,3);
  assert.equal(l.example.steps.length,4);
  assert.equal(l.template.length,4);
  assert.equal(l.rubric.length,4);
  assert.ok(l.antiPattern.length>80);
  assert.equal(l.questions.length,5);
  for(const q of l.questions){
   assert.equal(q.options.length,4);
   assert.ok(q.prompt.length>85);
   assert.ok(q.why.length>55);
   assert.ok(q.answer>=0&&q.answer<4);
   assert.equal(new Set(q.options).size,4);
  }
 }
});
test("scenario-based knowledge checks still require 80% but do not confer a credential",()=>{
 assert.equal(PASS_SCORE,4);
 assert.equal(LESSONS.reduce((n,l)=>n+l.questions.length,0),30);
 for(const l of LESSONS){
  assert.equal(gradeLesson(l.id,l.questions.map(q=>q.answer)),5);
  assert.equal(gradeLesson(l.id,l.questions.map(q=>(q.answer+1)%q.options.length)),0);
 }
});
test("isolated local state and a two-part practical learning milestone",()=>{
 assert.equal(STORAGE_KEY,"ugly-duck-tek.practice.v1");
 const s=blank();
 assert.equal(validate(s),true);
 assert.equal(progress(s).passed,0);assert.equal(progress(s).practiced,0);
 assert.throws(()=>exportPractice(s),/Complete all six/);
 for(const l of LESSONS)recordAttempt(s,l.id,4);
 assert.equal(progress(s).passed,6);assert.equal(progress(s).practiced,0);
 assert.equal(progress(s).complete,false);assert.equal(s.completedAt,null);
 for(const l of LESSONS)recordArtifact(s,l.id,makeArtifact(l),true);
 assert.equal(progress(s).complete,true);
 assert.equal(progress(s).percent,100);
 assert.ok(s.completedAt);
 assert.equal(validate(s),true);
 const practice=exportPractice(s);
 assert.equal(practice.schema,"bodybagz.local-practice.v1");
 assert.equal(practice.kind,"local-practice-only");
 assert.equal(practice.notice.includes("No identity verification"),true);
 assert.equal("wallet" in practice,false);
 assert.equal(Object.keys(practice.results).length,6);
 const portfolio=exportPortfolio(s);
 assert.equal(portfolio.schema,"udt.local-portfolio.v1");
 assert.equal(portfolio.artifacts.length,6);
 assert.equal(portfolio.notice.includes("not graded"),true);
});
test("an applied exercise must have four distinct substantial fields and an explicit self-review",()=>{
 const l=getLesson("orientation"),s=blank(),values=makeArtifact(l);
 assert.throws(()=>recordArtifact(s,l.id,values,false),/self-review/);
 const short={...values,[l.template[0].key]:"short"};
 assert.throws(()=>recordArtifact(s,l.id,short,true),/four distinct/);
 const duplicate={...values,[l.template[3].key]:values[l.template[0].key]};
 assert.throws(()=>recordArtifact(s,l.id,duplicate,true),/four distinct/);
 recordArtifact(s,l.id,values,true);
 assert.equal(s.artifacts[l.id].sections[l.template[1].key].length>=MIN_SECTION,true);
 assert.equal(progress(s).practiced,1);
 assert.throws(()=>exportPractice(s),/Complete all six/);
});
test("failed attempt and retry retain best score and attempt count",()=>{
 const s=blank();
 recordAttempt(s,"orientation",2,"2026-11-17T10:00:00Z");
 recordAttempt(s,"orientation",4,"2026-11-17T11:00:00Z");
 recordAttempt(s,"orientation",1,"2026-11-17T12:00:00Z");
 assert.deepEqual([s.results.orientation.best,s.results.orientation.attempts,s.results.orientation.passed],[4,3,true]);
});
test("legacy V0.1 scores and private notes survive migration without claiming applied readiness",()=>{
 const s={schema:"udt-local-state-v1",results:{},notes:{orientation:"Old draft about a neighborhood creator workshop."},completedAt:"2026-11-17T12:00:00Z"};
 for(const l of LESSONS)s.results[l.id]={best:4,attempts:1,passed:true,at:"2026-11-17T12:00:00Z"};
 const next=migrateV1(s);
 assert.equal(validate(next),true);
 assert.equal(next.notes.orientation,s.notes.orientation);
 assert.equal(next.results.orientation.best,4);
 assert.equal(progress(next).passed,6);
 assert.equal(progress(next).practiced,0);
 assert.equal(next.completedAt,null);
 assert.equal(s.completedAt,"2026-11-17T12:00:00Z");
});
test("tampered or excessive artifacts do not validate",()=>{
 const s=blank(),l=LESSONS[0];
 recordArtifact(s,l.id,makeArtifact(l),true);
 s.artifacts[l.id].sections[l.template[0].key]="A".repeat(901);
 assert.equal(validate(s),false);
 delete s.artifacts[l.id];s.artifacts.invalid={};
 assert.equal(validate(s),false);
});
test("pinned hub practice export schema remains local-only and backwards compatible",async()=>{
 const {readFile}=await import("node:fs/promises");
 const schema=JSON.parse(await readFile(new URL("../contracts/practice.v1.schema.json",import.meta.url)));
 assert.equal(schema.properties.schema.const,"bodybagz.local-practice.v1");
 assert.equal(schema.properties.kind.const,"local-practice-only");
 assert.equal(schema.additionalProperties,false);
 const portfolio=JSON.parse(await readFile(new URL("../contracts/portfolio.v1.schema.json",import.meta.url)));
 assert.equal(portfolio.properties.schema.const,"udt.local-portfolio.v1");
 assert.equal(portfolio.properties.artifacts.minItems,1);
});
