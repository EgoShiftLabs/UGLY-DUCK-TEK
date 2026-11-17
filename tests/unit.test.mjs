import test from "node:test";
import assert from "node:assert/strict";
import {LESSONS,getLesson,gradeLesson,PASS_SCORE} from "../src/curriculum.js";
import {blank,validate,recordAttempt,progress,exportPractice,STORAGE_KEY} from "../src/state.js";
test("six independently imported curriculum modules, 30 questions, 80% passing",()=>{
 assert.equal(LESSONS.length,6);
 assert.equal(LESSONS.reduce((sum,l)=>sum+l.questions.length,0),30);
 assert.equal(PASS_SCORE,4);
 assert.equal(new Set(LESSONS.map(l=>l.id)).size,6);
 for(const l of LESSONS){
  assert.ok(l.intro.length>50&&l.task.length>25);
  for(const q of l.questions)assert.ok(q.answer>=0&&q.answer<q.options.length);
  assert.equal(gradeLesson(l.id,l.questions.map(q=>q.answer)),5);
  assert.equal(gradeLesson(l.id,l.questions.map(q=>(q.answer+1)%q.options.length)),0);
 }
});
test("local practice state is independent of BodyBagz hub storage",()=>{
 assert.equal(STORAGE_KEY,"ugly-duck-tek.practice.v1");
 const s=blank();assert.equal(validate(s),true);
 assert.equal(progress(s).passed,0);
 for(const l of LESSONS)recordAttempt(s,l.id,4);
 assert.equal(progress(s).complete,true);
 assert.equal(validate(s),true);
 assert.equal(s.completedAt!==null,true);
 const record=exportPractice(s);
 assert.equal(record.schema,"bodybagz.local-practice.v1");
 assert.equal(record.kind,"local-practice-only");
 assert.equal(record.notice.includes("No identity verification"),true);
 assert.equal("wallet" in record,false);
 assert.deepEqual(Object.keys(record.results).sort(),LESSONS.map(l=>l.id).sort());
});
test("retry retains best score, never converts a failed result into an official pass",()=>{
 const s=blank();
 recordAttempt(s,"orientation",2,"2026-11-17T10:00:00Z");
 assert.equal(s.results.orientation.passed,false);
 recordAttempt(s,"orientation",4,"2026-11-17T11:00:00Z");
 assert.equal(s.results.orientation.passed,true);
 recordAttempt(s,"orientation",1,"2026-11-17T12:00:00Z");
 assert.equal(s.results.orientation.best,4);
 assert.equal(s.results.orientation.attempts,3);
 assert.throws(()=>exportPractice(s),/All tracks/);
});
test("storage validation rejects oversized private notes and invalid module keys",()=>{
 const s=blank();s.notes.orientation="A".repeat(5001);assert.equal(validate(s),false);
 s.notes.orientation="hello";s.notes.outside="unknown";assert.equal(validate(s),false);
 delete s.notes.outside;s.results.orientation={best:5,attempts:0,passed:true,at:"not-date"};assert.equal(validate(s),false);
});
test("pinned practice schema is a local-only receipt, not a certificate issuer",async()=>{
 const {readFile}=await import("node:fs/promises");
 const s=JSON.parse(await readFile(new URL("../contracts/practice.v1.schema.json",import.meta.url)));
 assert.equal(s.properties.schema.const,"bodybagz.local-practice.v1");
 assert.equal(s.properties.kind.const,"local-practice-only");
 assert.ok(s.required.includes("results"));
});
