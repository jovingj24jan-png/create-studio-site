import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { mkdirSync } from "node:fs";
mkdirSync("cmp",{recursive:true});
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
const p=await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
await new Promise(r=>setTimeout(r,900));
const top=await p.evaluate(()=>document.getElementById("work").offsetTop);
await p.evaluate(y=>window.scrollTo(0,y), top+40);
await new Promise(r=>setTimeout(r,1600));
const m=await p.evaluate(()=>{
  const img=document.querySelector(".panel img.bg");
  const r=img.getBoundingClientRect();
  return {natural:img.naturalWidth+"x"+img.naturalHeight,
    box:Math.round(r.width)+"x"+Math.round(r.height),
    fit:getComputedStyle(img).objectFit, loaded:img.naturalWidth>0};
});
console.log("solvanne panel image:", JSON.stringify(m));
await p.screenshot({path:"cmp/p3.png"});
await b.close();
