import {LESSONS,getLesson,gradeLesson,PASS_SCORE} from "./curriculum.js";
import {blank,load,save,progress,recordAttempt,recordArtifact,exportPractice,exportPortfolio,MIN_SECTION,MAX_SECTION} from "./state.js";

let state=load();
const nav=document.querySelector("#lessonNav"),main=document.querySelector("#main"),toast=document.querySelector("#toast");
const side=document.querySelector(".side"),mobileToggle=document.querySelector("#mobileNavToggle");
const esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const date=x=>Number.isFinite(Date.parse(x))?new Date(x).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"Unknown";
const badge=(text,good=false)=>'<span class="pill'+(good?" mint":"")+'">'+esc(text)+'</span>';
const link=(url,text,primary=false)=>'<a class="btn '+(primary?"primary":"ghost")+'" href="'+esc(url)+'">'+esc(text)+'</a>';
const route=()=>{
 const r=location.hash.replace(/^#\/?/,"");
 if(r==="portfolio")return {kind:"portfolio"};
 if(r.startsWith("lesson/")){const lesson=getLesson(r.slice(7));if(lesson)return {kind:"lesson",lesson};}
 return {kind:"home"};
};
let toastTimer;
function inform(msg){toast.textContent=msg;toast.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.hidden=true,5500);}
function persist(msg){
 if(!save(state)){state=load();render();inform("Could not save locally. Check browser storage or reduce text length.");return false;}
 render();inform(msg);return true;
}
function download(name,data){
 const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)+"\n"],{type:"application/json"}));
 const a=document.createElement("a");a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
}
function closeMenu(){side.dataset.open="false";mobileToggle?.setAttribute("aria-expanded","false");}
function navigation(r){
 const selected=(kind,id)=>r.kind===kind&&(kind!=="lesson"||r.lesson.id===id);
 nav.innerHTML='<a class="nav-link '+(selected("home")?"active":"")+'" href="#/home"'+(selected("home")?' aria-current="page"':"")+'><span>⌂</span> Overview</a>'+
 LESSONS.map((l,i)=>'<a class="nav-link '+(selected("lesson",l.id)?"active":"")+'" href="#/lesson/'+esc(l.id)+'"'+(selected("lesson",l.id)?' aria-current="page"':"")+'><span class="nav-no">'+String(i+1).padStart(2,"0")+'</span><span class="nav-text">'+esc(l.name)+'</span><span class="nav-state">'+(state.results[l.id]?.passed?"✓":"○")+'/'+(state.artifacts?.[l.id]?"✓":"○")+'</span></a>').join("")+
 '<a class="nav-link '+(selected("portfolio")?"active":"")+'" href="#/portfolio"'+(selected("portfolio")?' aria-current="page"':"")+'><span>▣</span> Builder Portfolio</a>';
}
function home(){
 const p=progress(state),next=LESSONS.find(l=>!state.results[l.id]?.passed||!state.artifacts?.[l.id])||LESSONS[0];
 return '<section class="hero"><p class="overline">UGLY DUCK TEK / THE APPLIED BUILDER PATH</p><h1>Builders before <em>hype.</em></h1>'+
 '<p>Go from a real problem to a testable idea, a delivery plan and a responsible operating model. Read, apply, test your judgment and build a private portfolio one track at a time.</p>'+
 '<div class="hero-row">'+link("#/lesson/"+next.id,p.complete?"Review your learning ↗":"Continue building ↗",true)+link("#/portfolio","Open my portfolio ↗")+'</div><div class="hero-art" aria-hidden="true">UD<span>.</span></div></section>'+
 '<section class="disclaimer"><strong>SELF-GUIDED PRACTICE, NOT CERTIFICATION.</strong> Scores, artifacts and reviews exist only in your browser. They are editable, not instructor-graded or identity-verified, and grant no financial or program permissions.</section>'+
 '<div class="section-title"><div><p class="overline">HOW THIS WORKS</p><h2>Read → Apply → Decide → Improve</h2></div><span class="muted">Approximately 3–4 hours across six tracks</span></div>'+
 '<div class="steps">'+[
 ["01","Study","Read outcomes, real-world explanations and an example."],
 ["02","Build","Complete four structured portfolio prompts and self-review against a rubric."],
 ["03","Practice","Answer five scenario questions. Four correct answers pass the knowledge check."],
 ["04","Reflect","Review both parts, export your local work, and decide what to improve."]
 ].map(x=>'<div class="step"><span class="overline">'+x[0]+'</span><h3>'+x[1]+'</h3><p>'+x[2]+'</p></div>').join("")+'</div>'+
 '<div class="section-title"><div><p class="overline">YOUR PROGRESS</p><h2>Six tracks. Two kinds of work.</h2></div><span class="muted">'+p.percent+'% of 12 practice milestones</span></div>'+
 '<div class="metric-row"><div class="metric"><small>KNOWLEDGE CHECKS</small><strong>'+p.passed+' / 6</strong><p>Four of five correct per module</p></div><div class="metric"><small>APPLIED EXERCISES</small><strong>'+p.practiced+' / 6</strong><p>Four self-reviewed sections each</p></div><div class="metric"><small>FULL PRACTICE PATH</small><strong>'+(p.complete?"COMPLETE":"IN PROGRESS")+'</strong><p>Not a verified credential</p></div></div>'+
 '<div class="progress-meter" role="progressbar" aria-label="Knowledge and practical exercise progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+p.percent+'"><span style="width:'+p.percent+'%"></span></div>'+
 '<div class="section-title"><div><p class="overline">CURRICULUM / V0.2</p><h2>The applied foundations</h2></div><span class="muted">Six practical learning tracks</span></div>'+
 '<div class="lesson-grid">'+LESSONS.map((l,i)=>'<article class="course-card"><div class="card-head"><span class="tiny-code">TRACK '+String(i+1).padStart(2,"0")+'</span>'+badge(state.results[l.id]?.passed&&state.artifacts?.[l.id]?"BOTH PRACTICED":"BUILDING",Boolean(state.results[l.id]?.passed&&state.artifacts?.[l.id]))+'</div><h3>'+esc(l.name)+'</h3><p>'+esc(l.subtitle)+'</p><div class="course-milestones">'+badge("Knowledge "+(state.results[l.id]?.passed?"✓":"○"),state.results[l.id]?.passed)+badge("Artifact "+(state.artifacts?.[l.id]?"✓":"○"),Boolean(state.artifacts?.[l.id]))+'</div><div class="card-foot"><span>'+esc(l.time)+'</span><a href="#/lesson/'+esc(l.id)+'">Study & practice ↗</a></div></article>').join("")+'</div>'+
 '<section class="next-step"><div><p class="overline">LOCAL PORTFOLIO</p><h2>'+(p.complete?"Your self-guided course practice is complete.":"Build proof of practice as you learn.")+'</h2><p>'+(p.complete?"You can export a local practice record and private learning portfolio. Neither is a certificate.":"Export your practical drafts from the portfolio at any stage. The full course practice export unlocks after both knowledge and applied milestones are complete for all tracks.")+'</p></div><div class="actions">'+link("#/portfolio","View portfolio ↗",true)+(p.complete?'<button class="btn ghost" data-action="export-practice">Export full practice receipt ↗</button>':"")+'<button class="btn subtle" data-action="reset">Reset all local learning data</button></div></section>';
}
function lessonView(l){
 const index=LESSONS.indexOf(l),result=state.results[l.id],artifact=state.artifacts?.[l.id];
 const sections=l.sections.map((section,i)=>'<section class="topic"><div class="overline">LESSON '+String(i+1).padStart(2,"0")+'</div><h3>'+esc(section.title)+'</h3>'+section.paragraphs.map(text=>'<p>'+esc(text)+'</p>').join("")+'</section>').join("");
 const example='<details class="example-panel"><summary>View worked example: '+esc(l.example.title)+'</summary><div class="example-body"><p><strong>Situation:</strong> '+esc(l.example.context)+'</p><ol>'+l.example.steps.map(s=>'<li>'+esc(s)+'</li>').join("")+'</ol><p><strong>Evidence to collect:</strong> '+esc(l.example.outcome)+'</p></div></details>';
 const fields=l.template.map((s,i)=>'<div class="artifact-field"><label for="field-'+esc(s.key)+'">'+String(i+1).padStart(2,"0")+' / '+esc(s.label)+'</label><p>'+esc(s.prompt)+'</p><textarea id="field-'+esc(s.key)+'" name="'+esc(s.key)+'" required minlength="'+MIN_SECTION+'" maxlength="'+MAX_SECTION+'" rows="4" placeholder="'+esc(s.example)+'">'+esc(artifact?.sections?.[s.key]||"")+'</textarea><small>Write at least '+MIN_SECTION+' characters in your own words. Example for reference: '+esc(s.example)+'</small></div>').join("");
 const selfReview='<div class="rubric"><h3>Self-review before saving</h3><p>These are criteria you check yourself—not an independent grade.</p><ul>'+l.rubric.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul><label class="self-review"><input name="selfReview" type="checkbox" required> I have checked all four criteria and written distinct, useful responses.</label></div>';
 return '<div class="lesson-header"><div><a class="back" href="#/home">← Course overview</a><p class="overline track-label">TRACK '+String(index+1).padStart(2,"0")+' / 06 · '+esc(l.time)+'</p><h1>'+esc(l.name)+'</h1><p class="subheading">'+esc(l.subtitle)+'</p></div><div class="status-stack">'+badge(result?.passed?"KNOWLEDGE PRACTICED":"KNOWLEDGE OPEN",Boolean(result?.passed))+badge(artifact?"EXERCISE SAVED":"EXERCISE OPEN",Boolean(artifact))+'</div></div>'+
 '<section class="disclaimer"><strong>NOT AN ASSESSED CREDENTIAL.</strong> Scenarios are self-scored, practical responses are self-reviewed and neither result authorizes program participation or transactions.</section>'+
 '<div class="learning-route"><a href="#read">1 · Learn</a><a href="#worked-example">2 · Example</a><a href="#builder-exercise">3 · Build</a><a href="#knowledge-check">4 · Practice</a></div>'+
 '<section id="read" class="reading expanded"><p class="overline">WHAT YOU WILL BE ABLE TO DO</p><ul class="outcomes">'+l.objectives.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>'+sections+
 '<div class="anti-pattern"><strong>Watch for this failure pattern:</strong> '+esc(l.antiPattern)+'</div></section>'+
 '<div id="worked-example">'+example+'</div>'+
 '<section class="exercise" id="builder-exercise"><p class="overline">PORTFOLIO ARTIFACT / SELF-REVIEWED</p><h2>Apply the skill</h2><p>Build something you could later show a mentor or collaborator. Follow four prompts. Your response is stored only on this device and is never sent to us.</p>'+
 (artifact?'<div class="result"><strong>Last self-reviewed: '+esc(date(artifact.at))+'</strong><span>You may revise any section and save again.</span></div>':"")+
 (state.notes[l.id]?'<details class="legacy-notes"><summary>Open notes saved in V0.1</summary><p>'+esc(state.notes[l.id])+'</p></details>':"")+
 '<form id="artifactForm" data-lesson="'+esc(l.id)+'" class="artifact-form">'+fields+selfReview+'<button class="btn primary" type="submit">Save four-part practice artifact ↗</button></form></section>'+
 '<section class="assessment" id="knowledge-check"><p class="overline">APPLIED KNOWLEDGE CHECK</p><h2>Choose a defensible next action.</h2><p>These are practice scenarios, not trick slogans. Four of five correct answers pass this local assessment; retry whenever you need.</p>'+
 (result?'<div class="result"><strong>Best: '+result.best+'/5 · '+(result.passed?"PASSED":"RETRY NEEDED")+'</strong><span>'+result.attempts+' attempt'+(result.attempts===1?"":"s")+' · last '+esc(date(result.at))+'</span></div>':"")+
 '<form id="quizForm" data-lesson="'+esc(l.id)+'">'+l.questions.map((q,i)=>'<fieldset class="quiz-item"><legend><span class="question-no">'+String(i+1).padStart(2,"0")+'</span> '+esc(q.prompt)+'</legend><div class="answers">'+q.options.map((option,j)=>'<label class="answer"><input required type="radio" name="q'+i+'" value="'+j+'"><span>'+esc(option)+'</span></label>').join("")+'</div></fieldset>'+
 (result?'<details class="explanation"><summary>Explain the decision</summary><p>'+esc(q.why)+'</p></details>':"")).join("")+
 '<button class="btn primary full" type="submit">Check my decisions ↗</button></form></section>'+
 '<div class="lesson-footer">'+link("#/portfolio","View my portfolio ↗")+link("#/lesson/"+LESSONS[(index+1)%LESSONS.length].id,"Next learning track →")+'</div>';
}
function portfolio(){
 const p=progress(state),entries=LESSONS.filter(l=>Boolean(state.artifacts?.[l.id]));
 return '<div class="page-head"><p class="overline">MY PRIVATE WORKSPACE</p><h1>Your builder portfolio.</h1><p>These are works in progress, not instructor-graded artifacts. Review them, improve them and export a personal backup. Nothing here is uploaded to the academy.</p></div>'+
 '<section class="disclaimer"><strong>PRIVATE DRAFTS:</strong> Anyone with access to this browser profile may be able to read this local data. Avoid secrets, participant identities and confidential business information.</section>'+
 '<div class="metric-row"><div class="metric"><small>APPLIED DRAFTS</small><strong>'+p.practiced+' / 6</strong><p>Four reviewed sections per track</p></div><div class="metric"><small>KNOWLEDGE CHECKS</small><strong>'+p.passed+' / 6</strong><p>Self-scored</p></div><div class="metric"><small>LOCAL PATH</small><strong>'+p.percent+'%</strong><p>Not independent validation</p></div></div>'+
 '<div class="portfolio-actions"><button type="button" class="btn primary" data-action="export-portfolio"'+(!entries.length?" disabled":"")+'>Export my private portfolio JSON ↗</button>'+
 (p.complete?'<button class="btn ghost" data-action="export-practice">Export full practice receipt ↗</button>':"")+'</div>'+
 '<div class="section-title"><div><p class="overline">BUILD RECORD</p><h2>Artifacts across six tracks</h2></div></div>'+
 '<div class="portfolio-grid">'+LESSONS.map(l=>{const a=state.artifacts?.[l.id];return '<article class="course-card portfolio-card"><div class="card-head">'+badge(a?"SELF-REVIEWED":"NOT YET SAVED",Boolean(a))+'<span class="tiny-code">'+esc(l.id.toUpperCase())+'</span></div><h3>'+esc(l.name)+'</h3>'+
 (a?'<p>Saved '+esc(date(a.at))+'</p><details><summary>View my responses</summary>'+l.template.map(x=>'<div class="saved-section"><strong>'+esc(x.label)+'</strong><p>'+esc(a.sections[x.key])+'</p></div>').join("")+'</details>':'<p>No structured exercise saved on this device.</p>')+
 '<div class="card-foot">'+link("#/lesson/"+l.id,a?"Revise artifact ↗":"Build artifact ↗")+'</div></article>';}).join("")+'</div>';
}
function render(focus=false){const r=route();navigation(r);main.innerHTML=r.kind==="home"?home():r.kind==="portfolio"?portfolio():lessonView(r.lesson);
 document.title=(r.kind==="lesson"?r.lesson.name+" | ":r.kind==="portfolio"?"My Portfolio | ":"")+"UGLY DUCK TEK";
 if(focus){main.focus({preventScroll:true});window.scrollTo({top:0,behavior:"instant"});}
}
document.addEventListener("submit",e=>{
 const form=e.target;if(!(form instanceof HTMLFormElement)||!main.contains(form))return;
 e.preventDefault();const l=getLesson(form.dataset.lesson);if(!l)return;
 const input=new FormData(form);
 if(form.id==="artifactForm"){
  try{
   const values=Object.fromEntries(l.template.map(item=>[item.key,input.get(item.key)]));
   recordArtifact(state,l.id,values,input.has("selfReview"));
   persist("Structured builder exercise saved locally. It is self-reviewed, not graded.");
  }catch(err){inform(err.message||"Please complete all four exercise sections.");}
 }
 if(form.id==="quizForm"){
  const answers=l.questions.map((_,i)=>input.get("q"+i));
  if(answers.some(x=>x===null)){inform("Answer all five scenarios before submitting.");return;}
  const score=gradeLesson(l.id,answers);
  recordAttempt(state,l.id,score);
  persist(score>=PASS_SCORE?score+"/5 — local knowledge practice passed.":score+"/5 — review the explanations and retry.");
 }
});
document.addEventListener("click",e=>{
 const el=e.target.closest("[data-action]");if(!el||!main.contains(el))return;
 if(el.dataset.action==="export-practice"){
  try{download("ugly-duck-tek-local-practice.json",exportPractice(state));inform("Unverified course practice receipt exported.");}
  catch(err){inform(err.message||"Course practice is incomplete.");}
 }
 if(el.dataset.action==="export-portfolio"){
  try{download("ugly-duck-tek-local-portfolio.json",exportPortfolio(state));inform("Private, self-reviewed learning drafts exported.");}
  catch(err){inform(err.message||"No drafts to export yet.");}
 }
 if(el.dataset.action==="reset"){
  if(!window.confirm("Delete all local quiz results, old notes and structured portfolio drafts on this device? This cannot be undone."))return;
  state=blank();persist("All local learning data cleared from this device.");
 }
});
mobileToggle?.addEventListener("click",()=>{
 const next=side.dataset.open!=="true";side.dataset.open=String(next);mobileToggle.setAttribute("aria-expanded",String(next));
});
nav.addEventListener("click",e=>{if(e.target.closest("a"))closeMenu();});
window.addEventListener("hashchange",()=>{closeMenu();render(true);});
render();
