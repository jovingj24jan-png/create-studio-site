import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
const p=await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
await new Promise(r=>setTimeout(r,800));
const top=await p.evaluate(()=>document.getElementById("work").offsetTop);
await p.evaluate(y=>window.scrollTo(0,y), top+1840);
await new Promise(r=>setTimeout(r,1500));
const m=await p.evaluate(()=>{
  const pan=[...document.querySelectorAll(".panel")][2], R=pan.getBoundingClientRect();
  const f=e=>{const r=e.getBoundingClientRect();return{L:+(((r.left-R.left)/R.width)*100).toFixed(1),
    R:+(((R.right-r.right)/R.width)*100).toFixed(1),B:+(((R.bottom-r.bottom)/R.height)*100).toFixed(1)};};
  const h=pan.querySelector(".t-project");
  return {title:h.textContent.trim(),
    logo:pan.querySelector(".p3-logo")?.textContent.trim()||"(img)",
    ticks:!!pan.querySelector(".p3-ticks"),
    sub:pan.querySelector(".t-mono")?.textContent.trim(),
    stack:[...pan.querySelectorAll(".stack li")].map(x=>x.textContent),
    stackPos:f(pan.querySelector(".stack")), yr:pan.querySelector(".flex.between.end p").textContent.trim(),
    headSize:getComputedStyle(h).fontSize, headWeight:getComputedStyle(h).fontWeight, h:Math.round(R.height)};
});
console.log(JSON.stringify(m,null,1));
await p.screenshot({path:"cmp/L5.png"});
await b.close();
