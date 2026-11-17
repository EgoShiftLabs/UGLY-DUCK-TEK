import {LESSONS,getLesson,gradeLesson} from "./curriculum.js";
import {load,save,progress,recordAttempt,exportPractice} from "./state.js";

let state=load();
const nav=document.querySelector("#lessonNav"),main=document.querySelector("#main"),toast=document.querySelector("#toast");
const esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const label=x=>x?.passed?"PASSED":"TO COMPLETE";
const date=x=>Number.isFinite(new Date(x).getTime())?new Date(x).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"Unknown date";
const curRoute=()=>{
 const route=location.hash.replace(/^#\/?/,"");
 if(route==="home"||!route)return {kind:"home"};
 if(route.startsWith("lesson/")){const lesson=getLesson(route.slice(7));if(lesson)return {kind:"lesson",lesson};}
 return {kind:"home"};
};
let toastTimer;
function inform(msg){toast.textContent=msg;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.hidden=true,5500);}
function persist(msg){if(!save(state)){state=load();inform("Unable to save locally; check your browser storage.");render();return;}render();inform(msg);}
function download(name,data){
 const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)+"\n"],{type:"application/json"}));
 const a=document.createElement("a");a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
}
function renderNav(route){
 nav.innerHTML='<a class="nav-link '+(route.kind==="home"?"active":"")+'" href="#/home"'+(route.kind==="home"?' aria-current="page"':"")+'><span>⌂</span> Overview</a>'+
 LESSONS.map((l,i)=>{
 const current=route.kind==="lesson"&&route.lesson.id===l.id;
 return '<a class="nav-link '+(current?"active":"")+'" href="#/lesson/'+esc(l.id)+'"'+(current?' aria-current="page"':"")+'><span class="nav-no">'+String(i+1).padStart(2,"0")+'</span><span class="nav-text">'+esc(l.name)+'</span><span class="nav-state">'+(state.results[l.id]?.passed?"✓":"○")+'</span></a>';
 }).join("");
}
function showHome(){
 const p=progress(state);
 return '<section class="hero"><p class="overline">UGLY DUCK TEK / BUILDER DEVELOPMENT</p><h1>Builders before <em>hype.</em></h1><p>Six essentials for the new economy. Learn digital literacy, operational discipline, governance, risk management and how to create value that survives speculative cycles.</p>'+
 '<div class="hero-row"><a class="btn primary" href="#/lesson/'+esc(LESSONS.find(l=>!state.results[l.id]?.passed)?.id||LESSONS[0].id)+'">'+(p.complete?"Review your learning":"Continue learning")+' ↗</a><a class="btn ghost" href="https://egoshiftlabs.github.io/BodyBagz-Ecosystem/" target="_blank" rel="noopener noreferrer">BodyBagz Ecosystem ↗</a></div>'+
 '<div class="hero-art" aria-hidden="true">UD<span>.</span></div></section>'+
 '<section class="disclaimer"><strong>PRACTICE, NOT CERTIFICATION.</strong> This is a locally scored course. There are no verified identities, certificates, NFTs, financial privileges, or official access grants in this release.</section>'+
 '<div class="section-title"><div><p class="overline">YOUR LEARNING</p><h2>Six tracks. One standard.</h2></div><span class="muted">'+p.passed+' of '+p.total+' completed</span></div>'+
 '<div class="progress-meter" role="progressbar" aria-label="Course completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+p.percent+'"><span style="width:'+p.percent+'%"></span></div>'+
 '<div class="lesson-grid">'+LESSONS.map((l,i)=>'<article class="course-card"><div class="card-head"><span class="tiny-code">TRACK '+String(i+1).padStart(2,"0")+'</span><span class="pill '+(state.results[l.id]?.passed?"mint":"")+'">'+label(state.results[l.id])+'</span></div><h3>'+esc(l.name)+'</h3><p>'+esc(l.subtitle)+'</p><div class="card-foot"><span>'+esc(l.time)+' · 5 questions</span><a href="#/lesson/'+esc(l.id)+'">Open track ↗</a></div></article>').join("")+'</div>'+
 '<section class="next-step"><div><p class="overline">LOCAL PRACTICE MILESTONE</p><h2>'+(p.complete?"All six learning tracks passed":"Learn the principles. Practice the work.")+'</h2><p>'+(p.complete?"You can export a local practice record. It is editable and cannot be used as an official credential.":"Each track includes an original builder exercise. Passing requires at least 4 of 5 correct quiz answers, but the exercises are not independently assessed.")+'</p></div><div class="actions">'+(p.complete?'<button class="btn primary" data-action="export-practice">Export local practice record ↗</button>':'<a class="btn ghost" href="#/lesson/'+esc(LESSONS[0].id)+'">Start with orientation ↗</a>')+'<button class="btn subtle" data-action="reset">Clear this device’s practice progress</button></div></section>';
}
function showLesson(l){
 const i=LESSONS.indexOf(l),r=state.results[l.id];
 return '<div class="lesson-header"><div><a class="back" href="#/home">← Course overview</a><p class="overline" style="margin-top:28px">TRACK '+String(i+1).padStart(2,"0")+' / 06 · '+esc(l.time)+'</p><h1>'+esc(l.name)+'</h1><p class="subheading">'+esc(l.subtitle)+'</p></div><span class="pill '+(r?.passed?"mint":"")+'">'+label(r)+'</span></div>'+
 '<section class="disclaimer"><strong>LEARNING PRACTICE:</strong> All answers and assessment logic run locally. Practice scores are not identity-verified or accepted for any official program privileges.</section>'+
 '<div class="content-columns"><div><article class="reading"><h2>Why this matters</h2><p>'+esc(l.intro)+'</p><div class="principle">'+esc(l.principle)+'</div><h3>What to take away</h3><ul>'+l.points.map(p=>'<li>'+esc(p)+'</li>').join("")+'</ul></article>'+
 '<section class="exercise"><p class="overline">APPLY THE KNOWLEDGE</p><h2>Builder exercise</h2><p>'+esc(l.task)+'</p><form id="notesForm" data-lesson="'+esc(l.id)+'"><label for="builder-notes">Your private working notes</label><textarea id="builder-notes" name="notes" rows="5" maxlength="5000" placeholder="Draft an original response. Saved only in this browser.">'+esc(state.notes[l.id]||"")+'</textarea><div class="form-footer"><span class="muted">Not graded or transmitted.</span><button type="submit" class="btn ghost">Save my exercise notes</button></div></form></section></div>'+
 '<section class="assessment"><p class="overline">KNOWLEDGE CHECK</p><h2>Five questions</h2><p>Pass with 4 or more correct answers. You can retry any module.</p>'+
 (r?'<div class="result"><strong>Best score: '+r.best+'/5 · '+(r.passed?"PASSED":"NOT PASSED")+'</strong><span>'+r.attempts+' attempt'+(r.attempts===1?"":"s")+' · last '+esc(date(r.at))+'</span></div>':"")+
 '<form id="quizForm" data-lesson="'+esc(l.id)+'">'+l.questions.map((q,idx)=>'<fieldset class="quiz-item"><legend><span class="question-no">'+String(idx+1).padStart(2,"0")+'</span> '+esc(q.prompt)+'</legend><div class="answers">'+q.options.map((opt,oi)=>'<label class="answer"><input type="radio" name="q'+idx+'" value="'+oi+'" required><span>'+esc(opt)+'</span></label>').join("")+'</div></fieldset>').join("")+
 '<button class="btn primary full" type="submit">Score practice assessment ↗</button></form></section></div>'+
 '<div class="lesson-footer"><a class="btn subtle" href="#/home">← All learning tracks</a><a class="btn ghost" href="#/lesson/'+esc(LESSONS[(i+1)%LESSONS.length].id)+'">Next learning track →</a></div>';
}
function render(focus=false){
 const route=curRoute();
 renderNav(route);
 main.innerHTML=route.kind==="lesson"?showLesson(route.lesson):showHome();
 document.title=(route.kind==="lesson"?route.lesson.name+" | ":"")+"UGLY DUCK TEK";
 if(focus){main.focus({preventScroll:true});window.scrollTo({top:0,behavior:"instant"});}
}
document.addEventListener("submit",e=>{
 const f=e.target;if(!(f instanceof HTMLFormElement)||!main.contains(f))return;
 e.preventDefault();const l=getLesson(f.dataset.lesson);if(!l)return;
 if(f.id==="notesForm"){state.notes[l.id]=String(new FormData(f).get("notes")||"").slice(0,5000);persist("Builder exercise saved privately on this device.");return;}
 if(f.id==="quizForm"){
  const formData=new FormData(f);const answers=l.questions.map((_,i)=>formData.get("q"+i));
  if(answers.some(x=>x===null)){inform("Answer all five questions first.");return;}
  const score=gradeLesson(l.id,answers);
  recordAttempt(state,l.id,score);
  persist(score>=4?score+"/5 — practice assessment passed.":score+"/5 — review the lesson and retry.");
 }
});
document.addEventListener("click",e=>{
 const el=e.target.closest("[data-action]");if(!el||!main.contains(el))return;
 if(el.dataset.action==="export-practice"){
  try{download("ugly-duck-tek-local-practice.json",exportPractice(state));inform("Exported a locally editable practice record, NOT a verified credential.");}
  catch{inform("Complete all six learning tracks first.");}
 }
 if(el.dataset.action==="reset"){
  if(!confirm("Clear all locally saved quiz results and exercise notes on this device? This cannot be undone."))return;
  state={schema:"udt-local-state-v1",results:{},notes:{},completedAt:null};persist("Local course practice cleared.");
 }
});
window.addEventListener("hashchange",()=>render(true));
render();
