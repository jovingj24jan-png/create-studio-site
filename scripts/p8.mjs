import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { mkdirSync } from "node:fs";
mkdirSync("cmp",{recursive:true});
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
async function grab(url,tag,needle){
 const p=await b.newPage();
 await p.setViewport({width:1440,height:900});
 await p.goto(url,{waitUntil:"domcontentloaded",timeout:120000});
 await new Promise(r=>setTimeout(r,4500));
 await p.evaluate(async()=>{const s=innerHeight*.85;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}scrollTo(0,0);await new Promise(r=>setTimeout(r,800));});
 const hit=await p.evaluate((n)=>{
  let best=null;
  document.querySelectorAll("*").forEach(el=>{
   if(el.children.length)return;
   const t=(el.textContent||"").trim();
   if(t.toLowerCase()===n){const r=el.getBoundingClientRect();
    const fs=parseFloat(getComputedStyle(el).fontSize);
    if(fs>80&&!best)best={y:Math.round(r.top+scrollY),fs:Math.round(fs)};}
  });
  return best;
 },needle);
 console.log(tag,JSON.stringify(hit));
 if(hit){await p.evaluate(y=>window.scrollTo(0,y),hit.y-210);await new Promise(r=>setTimeout(r,1300));
  await p.screenshot({path:`cmp/${tag}.png`});}
 await p.close();
}
await grab("https://createstudio.framer.media/","R8","brand identity");
await grab(pathToFileURL(resolve("index.html")).href,"L8","brand identity");
await b.close();
