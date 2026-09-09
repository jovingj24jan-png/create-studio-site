import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { mkdirSync } from "node:fs";
mkdirSync("cmp",{recursive:true});
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
let bad=0;
for(const w of [1440,1280,1024,768,430,390,375,360]){
  const p=await b.newPage(); const e=[];
  p.on("pageerror",x=>e.push(String(x).slice(0,90)));
  p.on("console",m=>m.type()==="error"&&e.push(m.text().slice(0,90)));
  await p.setViewport({width:w,height:900});
  await p.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
  await p.evaluate(async()=>{const s=innerHeight*.8;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo(0,y);await new Promise(r=>setTimeout(r,35));}scrollTo(0,0);await new Promise(r=>setTimeout(r,500));
    await Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.addEventListener("load",r,{once:true});i.addEventListener("error",r,{once:true});setTimeout(r,4000);})));});
  const r=await p.evaluate(()=>({ovf:document.documentElement.scrollWidth-document.documentElement.clientWidth,
    imgs:document.images.length,broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).length,
    fonts:document.fonts.check('16px "Figtree"')&&document.fonts.check('16px "Fragment Mono"'),
    anim:!!document.querySelector(".stage.in"),sect:document.querySelectorAll("section").length}));
  const f=r.ovf>1||r.broken||e.length||!r.fonts;
  if(f)bad++;
  console.log(`${f?"FAIL":"ok  "} ${String(w).padStart(4)} ovf=${r.ovf} imgs=${r.imgs} broken=${r.broken} fonts=${r.fonts} anim=${r.anim} sect=${r.sect}`+(e.length?` err:${e[0]}`:""));
  if(w===1440){await new Promise(r=>setTimeout(r,2600));await p.screenshot({path:"cmp/hero.png"});}
  await p.close();
}
await b.close();
console.log(bad?`\n${bad} failing`:"\nall widths clean");
