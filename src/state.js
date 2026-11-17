// UGLY DUCK TEK owns its browser-local progress. No hub localStorage access.
import {LESSONS,PASS_SCORE} from "./curriculum.js";
export const STORAGE_KEY="ugly-duck-tek.practice.v1";
export const STATE_SCHEMA="udt-local-state-v1";
export const blank=()=>({schema:STATE_SCHEMA,results:{},notes:{},completedAt:null});
const ids=new Set(LESSONS.map(l=>l.id));
const isDate=x=>typeof x==="string"&&x.length<=40&&Number.isFinite(Date.parse(x));
export function validate(s){
 if(!s||typeof s!=="object"||Array.isArray(s)||s.schema!==STATE_SCHEMA)return false;
 if(!s.results||typeof s.results!=="object"||Array.isArray(s.results)||!s.notes||typeof s.notes!=="object"||Array.isArray(s.notes))return false;
 if(Object.entries(s.results).some(([id,r])=>!ids.has(id)||!r||!Number.isInteger(r.best)||r.best<0||r.best>5||!Number.isInteger(r.attempts)||r.attempts<1||r.attempts>10000||typeof r.passed!=="boolean"||!isDate(r.at)))return false;
 if(Object.entries(s.notes).some(([id,n])=>!ids.has(id)||typeof n!=="string"||n.length>5000))return false;
 if(s.completedAt!==null&&!isDate(s.completedAt))return false;
 return true;
}
export function load(){
 try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY)||"null");if(validate(value))return value;}catch{}
 return blank();
}
export function save(s){
 if(!validate(s))return false;
 try{const text=JSON.stringify(s);if(text.length>42000)return false;localStorage.setItem(STORAGE_KEY,text);return true;}catch{return false;}
}
export function progress(s){const passed=LESSONS.filter(l=>s.results[l.id]?.passed).length;return {passed,total:LESSONS.length,percent:Math.round(passed*100/LESSONS.length),complete:passed===LESSONS.length};}
export function recordAttempt(s,id,score,at=new Date().toISOString()){
 if(!ids.has(id)||!Number.isInteger(score)||score<0||score>5)throw Error("Invalid lesson result");
 const prev=s.results[id];s.results[id]={best:Math.max(prev?.best||0,score),attempts:(prev?.attempts||0)+1,passed:Boolean(prev?.passed||score>=PASS_SCORE),at};
 if(progress(s).complete&&!s.completedAt)s.completedAt=at;
 return s.results[id];
}
export function exportPractice(s){
 if(!progress(s).complete)throw Error("All tracks must be completed");
 return {schema:"bodybagz.local-practice.v1",kind:"local-practice-only",completedAt:s.completedAt||new Date().toISOString(),notice:"Unverified editable browser-practice record. No identity verification, certificate, NFT or authorization.",results:Object.fromEntries(Object.entries(s.results).map(([id,r])=>[id,{score:r.best,attempts:r.attempts,passed:r.passed,at:r.at}]))};
}
