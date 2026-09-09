import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
const p=await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
await new Promise(r=>setTimeout(r,700));
const y=await p.evaluate(()=>{
  const s=[...document.querySelectorAll("section")].find(x=>x.getAttribute("aria-label")==="Performance");
  return s.offsetTop;
});
await p.evaluate(v=>window.scrollTo(0,v), y-60);
await new Promise(r=>setTimeout(r,2400));
const m=await p.evaluate(()=>{
  const s=[...document.querySelectorAll("section")].find(x=>x.getAttribute("aria-label")==="Performance");
  const h=s.querySelector("h2"), d=s.querySelector("#perf dd");
  return {heading:h.textContent.trim().slice(0,30), headColor:getComputedStyle(h).color, headSize:getComputedStyle(h).fontSize,
    statColor:getComputedStyle(d).color, statSize:getComputedStyle(d).fontSize, statText:d.textContent,
    rule:!!s.querySelector(".perf-rule"), bars:s.querySelectorAll(".perf-bar").length,
    labels:[...s.querySelectorAll("#perf dt")].map(x=>x.textContent)};
});
console.log(JSON.stringify(m,null,1));
await p.screenshot({path:"cmp/L6.png"});
await b.close();
