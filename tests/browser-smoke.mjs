import assert from "node:assert/strict";
import {chromium} from "playwright";
import {LESSONS} from "../src/curriculum.js";
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1300,height:900},acceptDownloads:true});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("http://127.0.0.1:8000/",{waitUntil:"networkidle"});
 await page.locator(".hero h1").waitFor();
 await page.locator('a[href="#/lesson/orientation"]').first().click();
 await page.locator("#quizForm").waitFor();
 await page.locator("#builder-notes").fill("Build an original audio program with attribution and test releases.");
 await page.locator("#notesForm button[type=submit]").click();
 for(let i=0;i<5;i++){
  const q=LESSONS[0].questions[i];
  await page.locator('#quizForm input[name="q'+i+'"][value="'+((q.answer+1)%q.options.length)+'"]').check();
 }
 await page.locator("#quizForm button[type=submit]").click();
 let s=await page.evaluate(()=>JSON.parse(localStorage.getItem("ugly-duck-tek.practice.v1")));
 assert.equal(s.results.orientation.passed,false);
 assert.equal(s.notes.orientation.includes("original audio program"),true);
 for(let i=0;i<5;i++)await page.locator('#quizForm input[name="q'+i+'"][value="'+LESSONS[0].questions[i].answer+'"]').check();
 await page.locator("#quizForm button[type=submit]").click();
 await page.reload({waitUntil:"networkidle"});
 await page.locator("#quizForm").waitFor();
 await page.locator("#builder-notes").waitFor();
 assert.equal(await page.locator("#builder-notes").inputValue(),"Build an original audio program with attribution and test releases.");
 for(const l of LESSONS.slice(1)){
  await page.locator('a[href="#/lesson/'+l.id+'"]').first().click();
  await page.locator("#quizForm").waitFor();
  for(let i=0;i<5;i++)await page.locator('#quizForm input[name="q'+i+'"][value="'+l.questions[i].answer+'"]').check();
  await page.locator("#quizForm button[type=submit]").click();
 }
 await page.locator('.top-brand').click();
 await page.locator('[data-action="export-practice"]').waitFor();
 const downloaded=page.waitForEvent("download");
 await page.locator('[data-action="export-practice"]').click();
 assert.match((await downloaded).suggestedFilename(),/local-practice\.json$/);
 s=await page.evaluate(()=>JSON.parse(localStorage.getItem("ugly-duck-tek.practice.v1")));
 assert.equal(Object.keys(s.results).length,6);
 assert.equal(s.results.orientation.attempts,2);
 assert.equal(s.completedAt!==null,true);
 await page.locator("a[href='#/lesson/orientation']").first().focus();
 await page.keyboard.press("Enter");
 await page.locator("#quizForm").waitFor();
 assert.equal(errors.length,0,errors.join("\n"));
 const nojs=await browser.newPage({javaScriptEnabled:false});
 await nojs.goto("http://127.0.0.1:8000/");
 await nojs.getByText("Six learning modules and thirty knowledge questions").waitFor();
 await nojs.close();
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 await mobile.goto("http://127.0.0.1:8000/");
 await mobile.locator(".hero h1").waitFor();
 await mobile.locator("#lessonNav a").nth(1).click();
 await mobile.locator("#quizForm").waitFor();
 console.log("UGLY DUCK TEK standalone desktop/mobile course, retry, exercise notes and export PASS");
}catch(e){console.error("Academy E2E failed:",e);process.exitCode=1;}finally{await browser.close();}
