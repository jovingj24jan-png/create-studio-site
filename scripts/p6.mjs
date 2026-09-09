import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
mkdirSync("cmp",{recursive:true});
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
const p=await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto("https://createstudio.framer.media/",{waitUntil:"domcontentloaded",timeout:120000});
await new Promise(r=>setTimeout(r,5000));
await p.evaluate(async()=>{const s=innerHeight*.85;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo(0,y);await new Promise(r=>setTimeout(r,90));}scrollTo(0,0);await new Promise(r=>setTimeout(r,900));});
const marks=await p.evaluate(()=>{
  const out=[];
  document.querySelectorAll("*").forEach(el=>{
    if(el.children.length)return;
    const t=(el.textContent||"").trim();
    if(/^(PERFORMANCE|proof|Projects|Repeat|Industry|Client)/i.test(t)&&t.length<40){
      const r=el.getBoundingClientRect();
      if(r.width>30)out.push({t:t.slice(0,32),y:Math.round(r.top+scrollY),fs:Math.round(parseFloat(getComputedStyle(el).fontSize))});
    }});
  return out.sort((a,b)=>a.y-b.y).slice(0,12);
});
console.log(JSON.stringify(marks,null,1));
const anchor=marks.find(m=>/PERFORMANCE/i.test(m.t))||marks[0];
if(anchor){
  await p.evaluate(y=>window.scrollTo(0,y), anchor.y-140);
  await new Promise(r=>setTimeout(r,1400));
  await p.screenshot({path:"cmp/R6.png"});
  console.log("captured at",anchor.y-140);
}
await b.close();
