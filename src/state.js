// UGLY DUCK TEK V0.2: browser-only education state. No hub data access, issuer or identity authority.
import {LESSONS,PASS_SCORE} from "./curriculum.js";
export const STORAGE_KEY="ugly-duck-tek.practice.v1";
export const STATE_SCHEMA="udt-local-state-v1"; // Additive: existing v0.1 scores and notes remain loadable.
export const MIN_SECTION=30,MAX_SECTION=900;
const lessonIds=new Set(LESSONS.map(l=>l.id));
const isDate=x=>typeof x==="string"&&x.length<=40&&Number.isFinite(Date.parse(x));
export const blank=()=>({schema:STATE_SCHEMA,results:{},notes:{},artifacts:{},completedAt:null});

const artifactValid=(a,lesson)=>{
 if(!a||typeof a!=="object"||!a.sections||typeof a.sections!=="object"||Array.isArray(a.sections)||!isDate(a.at)||a.selfChecked!==true)return false;
 const keys=lesson.template.map(x=>x.key);
 if(Object.keys(a.sections).length!==keys.length)return false;
 const items=keys.map(key=>a.sections[key]);
 return items.every(s=>typeof s==="string"&&s.length>=MIN_SECTION&&s.length<=MAX_SECTION)&&
  new Set(items.map(s=>s.toLowerCase().replace(/\s+/g," ").trim())).size===items.length;
};
export function validate(s){
 if(!s||typeof s!=="object"||Array.isArray(s)||s.schema!==STATE_SCHEMA)return false;
 if(!s.results||typeof s.results!=="object"||Array.isArray(s.results)||!s.notes||typeof s.notes!=="object"||Array.isArray(s.notes))return false;
 if(Object.entries(s.results).some(([id,r])=>!lessonIds.has(id)||!r||!Number.isInteger(r.best)||r.best<0||r.best>5||
    !Number.isInteger(r.attempts)||r.attempts<1||r.attempts>10000||typeof r.passed!=="boolean"||!isDate(r.at)))return false;
 if(Object.entries(s.notes).some(([id,n])=>!lessonIds.has(id)||typeof n!=="string"||n.length>5000))return false;
 if(s.artifacts!==undefined&&(!s.artifacts||typeof s.artifacts!=="object"||Array.isArray(s.artifacts)||
    Object.entries(s.artifacts).some(([id,a])=>!lessonIds.has(id)||!artifactValid(a,LESSONS.find(l=>l.id===id)))))return false;
 if(s.completedAt!==null&&!isDate(s.completedAt))return false;
 return true;
}
export function progress(s){
 const passed=LESSONS.filter(l=>s.results[l.id]?.passed).length;
 const practiced=LESSONS.filter(l=>artifactValid(s.artifacts?.[l.id],l)).length;
 return {passed,practiced,total:LESSONS.length,percent:Math.round((passed+practiced)*100/(2*LESSONS.length)),complete:passed===LESSONS.length&&practiced===LESSONS.length};
}
export function migrateV1(input){
 if(!validate(input))return null;
 const state={...input,artifacts:input.artifacts||{}};
 // Old V0.1 quiz-only completion is retained as knowledge progress, never as new applied-work completion.
 if(!progress(state).complete)state.completedAt=null;
 return state;
}
export function load(){
 try{const value=migrateV1(JSON.parse(localStorage.getItem(STORAGE_KEY)||"null"));if(value)return value;}catch{}
 return blank();
}
export function save(s){
 if(!validate(s))return false;
 try{const text=JSON.stringify(s);if(text.length>42000)return false;localStorage.setItem(STORAGE_KEY,text);return true;}catch{return false;}
}
function setCompletion(s,at){
 if(progress(s).complete&&!s.completedAt)s.completedAt=at;
 if(!progress(s).complete)s.completedAt=null;
}
export function recordAttempt(s,id,score,at=new Date().toISOString()){
 if(!lessonIds.has(id)||!Number.isInteger(score)||score<0||score>5)throw Error("Invalid lesson result");
 const prev=s.results[id];
 s.results[id]={best:Math.max(prev?.best||0,score),attempts:(prev?.attempts||0)+1,passed:Boolean(prev?.passed||score>=PASS_SCORE),at};
 setCompletion(s,at);
 return s.results[id];
}
export function recordArtifact(s,id,values,confirmed,at=new Date().toISOString()){
 const lesson=LESSONS.find(l=>l.id===id);
 if(!lesson)throw Error("Unknown builder lesson");
 if(confirmed!==true)throw Error("Check the exercise self-review first");
 const sections=Object.fromEntries(lesson.template.map(x=>[x.key,String(values?.[x.key]??"").trim()]));
 const record={sections,selfChecked:true,at};
 if(!artifactValid(record,lesson))throw Error("Complete four distinct exercise sections, at least 30 and at most 900 characters each");
 s.artifacts??={};s.artifacts[id]=record;
 setCompletion(s,at);
 return record;
}
export function exportPractice(s){
 if(!progress(s).complete)throw Error("Complete all six quizzes and practical exercises before exporting the full course practice record");
 return {schema:"bodybagz.local-practice.v1",kind:"local-practice-only",completedAt:s.completedAt,
   notice:"Unverified editable browser-practice record. No identity verification, certificate, NFT or authorization.",
   results:Object.fromEntries(Object.entries(s.results).map(([id,r])=>[id,{score:r.best,attempts:r.attempts,passed:r.passed,at:r.at}]))};
}
export function exportPortfolio(s){
 const entries=LESSONS.filter(l=>artifactValid(s.artifacts?.[l.id],l)).map(l=>({
   lessonId:l.id,lesson:l.name,sections:{...s.artifacts[l.id].sections},selfChecked:true,at:s.artifacts[l.id].at
 }));
 if(!entries.length)throw Error("Save at least one structured builder exercise first");
 return {schema:"udt.local-portfolio.v1",course:"UGLY DUCK TEK",exportedAt:new Date().toISOString(),
 notice:"Private self-assessed learning drafts; not graded, signed, certified or uploaded.",
 artifacts:entries};
}
