import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
const p=await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
const g=await p.evaluate(()=>{const s=document.getElementById("story-section");return{t:s.offsetTop,h:s.offsetHeight,vh:innerHeight}});
await p.evaluate(y=>window.scrollTo(0,y), g.t+(g.h-g.vh)*0.5);
// wait past the longest delay (9s) so every drip has started
await new Promise(r=>setTimeout(r,10500));
const snap=()=>p.evaluate(()=>[...document.querySelectorAll(".story-drip")].map(d=>({
  y:Math.round(d.getBoundingClientRect().top), o:+getComputedStyle(d).opacity})));
const s1=await snap();
await new Promise(r=>setTimeout(r,2500));
const s2=await snap();
const d=s1.map((v,i)=>Math.abs(s2[i].y-v.y));
console.log("drip Y deltas:", d.join(", "), "px   moving:", d.filter(v=>v>3).length+"/6");
console.log("max opacity seen:", Math.max(...s2.map(x=>x.o)).toFixed(2), "(keyframe cap .55)");
// pre-delay state check: fresh load, immediately
const p2=await b.newPage();
await p2.setViewport({width:1440,height:900});
await p2.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
await new Promise(r=>setTimeout(r,300));
const early=await p2.evaluate(()=>[...document.querySelectorAll(".story-drip")].map(d=>+getComputedStyle(d).opacity));
console.log("opacity during delay (should be ~0):", early.map(x=>x.toFixed(2)).join(", "));
await b.close();
