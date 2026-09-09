import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
const p=await b.newPage();
await p.setViewport({width:1440,height:900});
await p.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
await new Promise(r=>setTimeout(r,700));
const top=await p.evaluate(()=>document.getElementById("work").offsetTop);
await p.evaluate(y=>window.scrollTo(0,y), top+40);
await new Promise(r=>setTimeout(r,1500));
const m=await p.evaluate(()=>{
  const pan=document.querySelector(".panel");
  const R=pan.getBoundingClientRect();
  const f=e=>{const r=e.getBoundingClientRect();return{
    L:+(((r.left-R.left)/R.width)*100).toFixed(1),
    R:+(((R.right-r.right)/R.width)*100).toFixed(1),
    T:+(((r.top-R.top)/R.height)*100).toFixed(1),
    B:+(((R.bottom-r.bottom)/R.height)*100).toFixed(1)};};
  const h=pan.querySelector(".t-project"), hr=h.getBoundingClientRect();
  return {logo:f(pan.querySelector(".p3-logo")), stack:f(pan.querySelector(".stack")),
    yr:f(pan.querySelector(".flex.between.end p")),
    headCentre:+((((hr.top+hr.height/2)-R.top)/R.height*100)).toFixed(1),
    headSize:getComputedStyle(h).fontSize, headWeight:getComputedStyle(h).fontWeight,
    sub:getComputedStyle(pan.querySelector(".t-mono")).fontSize,
    panelH:Math.round(R.height)};
});
console.log(JSON.stringify(m,null,1));
await b.close();
