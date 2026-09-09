import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
const p=await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
const g=await p.evaluate(()=>{const s=document.getElementById("story-section");return{t:s.offsetTop,h:s.offsetHeight,vh:innerHeight}});
await p.evaluate(y=>window.scrollTo(0,y), g.t+(g.h-g.vh)*0.5);
await new Promise(r=>setTimeout(r,600));

const sample=()=>p.evaluate(()=>{
  const gt=e=>getComputedStyle(e).transform;
  const a=document.querySelector(".story-water-a"), bb=document.querySelector(".story-water-b");
  const drips=[...document.querySelectorAll(".story-drip")];
  return {a:gt(a), b:gt(bb),
    drips:drips.map(d=>{const r=d.getBoundingClientRect();return Math.round(r.top)}),
    dripOp:drips.map(d=>+getComputedStyle(d).opacity.slice(0,4))};
});
const s1=await sample();
await new Promise(r=>setTimeout(r,2500));
const s2=await sample();

console.log("layer A moved:", s1.a!==s2.a);
console.log("layer B moved:", s1.b!==s2.b);
console.log("A t0:", s1.a.slice(0,58));
console.log("A t1:", s2.a.slice(0,58));
const moved=s1.drips.map((v,i)=>Math.abs(s2.drips[i]-v));
console.log("drip Y deltas over 2.5s:", moved.join(", "), "px");
console.log("drips moving:", moved.filter(v=>v>3).length + "/6");
console.log("drip opacities:", s2.dripOp.join(", "));
const running=await p.evaluate(()=>[...document.querySelectorAll(".story-water img,.story-drip")].every(e=>getComputedStyle(e).animationPlayState==="running"));
console.log("all animations running:", running);
await b.close();
