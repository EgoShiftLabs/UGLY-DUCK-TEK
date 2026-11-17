// UGLY DUCK TEK applied builder-practice curriculum; not proctored or identity verified.
import {SCENARIOS} from "./scenario-bank.js";
import {CONTENT} from "./lesson-content.js";
const tracks=[
 ["orientation","Builder Orientation","Start with the person, problem, and first useful deliverable."],
 ["literacy","Digital Systems & Evidence","Understand interfaces, data, accounts and how to verify a source."],
 ["execution","Execution Discipline","Scope work, define acceptance evidence and learn from delivery."],
 ["governance","Collaboration & Governance","Assign decision roles, manage conflicts and document approvals."],
 ["custody","Digital Safety & Operations","Protect accounts, people, data and operating continuity."],
 ["long-term","Long-Term Builder Mindset","Create original work that remains useful after the launch."]
];
export const LESSONS=tracks.map(([id,name,subtitle])=>{
 const lesson=CONTENT[id], questions=SCENARIOS[id];
 if(!lesson||!questions||questions.length!==5)throw Error("Missing lesson content for "+id);
 return {id,name,subtitle,time:"25–35 MIN",intro:lesson.sections[0].paragraphs[0],principle:lesson.antiPattern,
  points:lesson.objectives,task:lesson.template.map(x=>x.prompt).join(" "),
  objectives:lesson.objectives,sections:lesson.sections,example:lesson.example,antiPattern:lesson.antiPattern,
  template:lesson.template,rubric:lesson.rubric,questions};
});
export const PASS_SCORE=4;
export const getLesson=id=>LESSONS.find(x=>x.id===id);
export function gradeLesson(id,answers){
 const lesson=getLesson(id);if(!lesson)throw Error("Unknown lesson");
 if(!Array.isArray(answers)||answers.length!==lesson.questions.length)throw Error("Answer all five questions");
 return lesson.questions.reduce((total,q,i)=>total+(Number(answers[i])===q.answer?1:0),0);
}
