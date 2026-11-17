import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {chromium} from "playwright";
import {LESSONS} from "../src/curriculum.js";
const browser=await chromium.launch({headless:true});
const base="http://127.0.0.1:8000/";
const saved=p=>p.evaluate(()=>JSON.parse(localStorage.getItem("ugly-duck-tek.practice.v1")));
async function fillArtifact(page,lesson){
 const form=page.locator("#artifactForm");
 await form.waitFor();
 for(const [i,p] of lesson.template.entries()){
  await form.locator('textarea[name="'+p.key+'"]').fill("This is my original applied draft for "+lesson.name+" and prompt "+p.label+". Step "+(i+1)+": I will interview three voluntary participants, record the actual outcome, and update the deliverable.");
 }
 await form.locator('input[name="selfReview"]').check();
 await form.locator("button[type=submit]").click();
}
async function answer(page,lesson,correct){
 for(let i=0;i<lesson.questions.length;i++){
  const q=lesson.questions[i],option=correct?q.answer:(q.answer+1)%q.options.length;
  await page.locator('#quizForm input[name="q'+i+'"][value="'+option+'"]').check();
 }
 await page.locator("#quizForm button[type=submit]").click();
}
try{
 const errors=[],page=await browser.newPage({viewport:{width:1320,height:900},acceptDownloads:true});
 page.on("pageerror",e=>errors.push(e.message));
 await page.goto(base,{waitUntil:"networkidle"});
 await page.locator(".hero h1").waitFor();
 await page.getByText("Read → Apply → Decide → Improve").waitFor();
 await page.locator('a[href="#/lesson/orientation"]').first().click();
 await page.locator("#quizForm").waitFor();
 assert.equal(await page.locator(".topic").count(),3);
 assert.equal(await page.locator(".artifact-field").count(),4);
 assert.equal(await page.locator("#quizForm fieldset").count(),5);
 await answer(page,LESSONS[0],false);
 assert.equal((await saved(page)).results.orientation.passed,false);
 await answer(page,LESSONS[0],true);
 assert.equal((await saved(page)).results.orientation.passed,true);
 assert.equal((await saved(page)).results.orientation.attempts,2);
 assert.equal((await saved(page)).completedAt,null);
 // Form validation must not allow an almost empty portfolio claim.
 const form=page.locator("#artifactForm");
 await form.locator('textarea[name="audience"]').fill("too short");
 await form.locator('input[name="selfReview"]').check();
 await form.locator("button[type=submit]").click();
 assert.equal((await saved(page)).artifacts.orientation,undefined);
 await fillArtifact(page,LESSONS[0]);
 assert.equal((await saved(page)).artifacts.orientation.selfChecked,true);
 await page.reload({waitUntil:"networkidle"});
 await page.locator("#artifactForm").waitFor();
 assert.ok((await page.locator('#artifactForm textarea[name="audience"]').inputValue()).length>=30);
 for(const l of LESSONS.slice(1)){
  await page.locator('a[href="#/lesson/'+l.id+'"]').first().click();
  await page.locator('#artifactForm[data-lesson="'+l.id+'"]').waitFor();
  await page.locator('#quizForm[data-lesson="'+l.id+'"]').waitFor();
  await fillArtifact(page,l);
  await answer(page,l,true);
 }
 await page.locator('a[href="#/portfolio"]').first().click();
 await page.locator(".portfolio-card").first().waitFor();
 assert.equal(await page.locator(".portfolio-card").count(),6);
 const portfolioDownload=page.waitForEvent("download");
 await page.locator('[data-action="export-portfolio"]').click();
 const pfile=await portfolioDownload;
 const payload=JSON.parse(await readFile(await pfile.path(),"utf8"));
 assert.equal(payload.schema,"udt.local-portfolio.v1");
 assert.equal(payload.artifacts.length,6);
 assert.equal(payload.notice.includes("not graded"),true);
 const receiptDownload=page.waitForEvent("download");
 await page.locator('[data-action="export-practice"]').click();
 const receipt=JSON.parse(await readFile(await (await receiptDownload).path(),"utf8"));
 assert.deepEqual(Object.keys(receipt).sort(),["schema","kind","completedAt","notice","results"].sort());
 assert.equal(receipt.kind,"local-practice-only");
 assert.equal(receipt.results.orientation.attempts,2);
 assert.equal((await saved(page)).completedAt!==null,true);
 await page.locator('a[href="#/home"]').first().click();
 assert.equal(await page.locator(".metric-row .metric").count(),3);
 // Declining a reset must not lose data.
 page.once("dialog",dialog=>dialog.dismiss());
 await page.locator('[data-action="reset"]').click();
 assert.equal((await saved(page)).artifacts.orientation.selfChecked,true);
 // Confirming it clears every local section and old text.
 page.once("dialog",dialog=>dialog.accept());
 await page.locator('[data-action="reset"]').click();
 const cleared=await saved(page);
 assert.equal(Object.keys(cleared.results).length,0);
 assert.equal(Object.keys(cleared.artifacts).length,0);
 assert.equal(cleared.completedAt,null);
 await page.locator('a[href="#/lesson/orientation"]').first().focus();
 await page.keyboard.press("Enter");
 await page.locator("#artifactForm").waitFor();
 assert.equal(errors.length,0,errors.join("\n"));
 const nojs=await browser.newPage({javaScriptEnabled:false});
 await nojs.goto(base);
 await nojs.getByText("Four-part practical artifacts, self-review rubrics and cumulative portfolio").waitFor();
 await nojs.close();
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 mobile.on("pageerror",e=>errors.push("Mobile "+e.message));
 await mobile.goto(base,{waitUntil:"networkidle"});
 await mobile.locator(".hero h1").waitFor();
 assert.equal(await mobile.locator("#lessonNav").isVisible(),false);
 await mobile.locator("#mobileNavToggle").click();
 assert.equal(await mobile.locator("#lessonNav").isVisible(),true);
 await mobile.locator('a[href="#/lesson/orientation"]').first().click();
 await mobile.locator('#artifactForm[data-lesson="orientation"]').waitFor();
 await mobile.locator("#lessonNav").waitFor({state:"hidden"});
 assert.equal(errors.length,0,errors.join("\n"));
 console.log("UGLY DUCK TEK V0.2: scenarios, artifacts, migration, two-part completion, export fields, reset confirm/cancel, no-JS and mobile nav PASS");
}catch(e){console.error("Applied academy E2E failed:",e);process.exitCode=1;}finally{await browser.close();}
