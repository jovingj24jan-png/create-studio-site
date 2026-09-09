import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
for(const w of [1440,390]){
 const p=await b.newPage();
 await p.setViewport({width:w,height:900});
 await p.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
 await new Promise(r=>setTimeout(r,700));
 const r=await p.evaluate(()=>{
  const sec=document.getElementById("work");
  const panels=[...document.querySelectorAll(".panel")];
  return {vh:innerHeight, sectionH:Math.round(sec.offsetHeight),
    panelCount:panels.length,
    panelH:panels.map(x=>Math.round(x.getBoundingClientRect().height)),
    panelPos:getComputedStyle(panels[0]).position,
    imgs:panels.map(x=>x.querySelector("img.bg").getAttribute("src").split("/").pop()),
    fit:getComputedStyle(panels[0].querySelector("img.bg")).objectFit};
 });
 console.log(w, JSON.stringify(r));
 await p.close();
}
await b.close();
