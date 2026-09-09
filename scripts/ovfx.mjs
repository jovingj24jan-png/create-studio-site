import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
const p=await b.newPage();
await p.setViewport({width:360,height:900});
await p.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
await new Promise(r=>setTimeout(r,1200));
const out=await p.evaluate(()=>{
  const vw=document.documentElement.clientWidth,rows=[];
  document.querySelectorAll("*").forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.width===0)return;
    if(r.right>vw+1||r.left<-1){
      let q=el.parentElement,clip=false;
      while(q&&q!==document.body){const cs=getComputedStyle(q);if(cs.overflowX==="hidden"||cs.overflow==="hidden"){clip=true;break}q=q.parentElement}
      if(!clip)rows.push(el.tagName.toLowerCase()+"."+String(el.className).slice(0,38)+" R="+Math.round(r.right)+" W="+Math.round(r.width));
    }});
  return {vw,sw:document.documentElement.scrollWidth,rows:rows.slice(0,8)};
});
console.log(JSON.stringify(out,null,1));
await b.close();
