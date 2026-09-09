import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
const p=await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
const g=await p.evaluate(()=>{const s=document.getElementById("story-section");return{t:s.offsetTop,h:s.offsetHeight,vh:innerHeight}});
await p.evaluate(y=>window.scrollTo(0,y), g.t+(g.h-g.vh)*0.5);
await new Promise(r=>setTimeout(r,11000));           // past longest drip delay
const snap=()=>p.evaluate(()=>[...document.querySelectorAll(".story-drip")].map(d=>Math.round(d.getBoundingClientRect().top)));
const a=await snap(); await new Promise(r=>setTimeout(r,2200)); const c=await snap();
const delta=a.map((v,i)=>c[i]-v);
console.log("drip Y change (negative = rising):", delta.join(", "));
console.log("rising:", delta.filter(v=>v<-3).length+"/6", " falling:", delta.filter(v=>v>3).length+"/6");

// idle drift direction of both image layers
const ty=()=>p.evaluate(()=>[".story-water-a",".story-water-b"].map(s=>{
  const m=getComputedStyle(document.querySelector(s)).transform.match(/matrix\(([^)]+)\)/);
  return m?+m[1].split(",")[5]:0;}));
const t1=await ty(); await new Promise(r=>setTimeout(r,3000)); const t2=await ty();
console.log("layer A idle Y:", t1[0].toFixed(1), "->", t2[0].toFixed(1));
console.log("layer B idle Y:", t1[1].toFixed(1), "->", t2[1].toFixed(1));

// scroll-down check on the wrapper
async function wy(q){await p.evaluate(y=>window.scrollTo(0,y), g.t+(g.h-g.vh)*q);await new Promise(r=>setTimeout(r,220));
  return p.evaluate(()=>{const m=getComputedStyle(document.querySelector(".story-water")).transform.match(/matrix\(([^)]+)\)/);return m?+m[1].split(",")[5]:0;});}
console.log("scroll down 0->1 wrapper Y:", (await wy(0)).toFixed(0), "->", (await wy(1)).toFixed(0), "(decreasing = moving up)");
await b.close();
