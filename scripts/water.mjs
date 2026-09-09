import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const W=Number(process.argv[2]||1440);
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
const p=await b.newPage();
await p.setViewport({width:W,height:900});
await p.goto(pathToFileURL(resolve("index.html")).href,{waitUntil:"load"});
await new Promise(r=>setTimeout(r,900));

// page-1 fingerprint (must not change)
const hero=await p.evaluate(()=>{
  const h=document.querySelector(".hero"), img=document.querySelector(".hero-bg img");
  const h1=document.querySelector("h1");
  return {heroH:Math.round(h.getBoundingClientRect().height), src:img.getAttribute("src"),
    fit:getComputedStyle(img).objectFit, pos:getComputedStyle(img).objectPosition,
    h1:h1.textContent.trim().replace(/\s+/g," ").slice(0,46),
    h1size:getComputedStyle(h1.querySelector("span")).fontSize};
});
console.log("PAGE1:", JSON.stringify(hero));

const g=await p.evaluate(()=>{const s=document.getElementById("story-section");return{t:s.offsetTop,h:s.offsetHeight,vh:innerHeight}});
async function at(q){
  await p.evaluate(y=>window.scrollTo(0,y), g.t+(g.h-g.vh)*q);
  await new Promise(r=>setTimeout(r,240));
  return p.evaluate(()=>{
    const w=document.querySelector(".story-water");
    const img=w.querySelector("img");
    const cs=getComputedStyle(w), ci=getComputedStyle(img);
    const m=/matrix.*?,\s*([-\d.]+)\)$/.exec(cs.transform);
    return {y: m?+m[1]:0, z:cs.zIndex, op:ci.opacity, blend:ci.mixBlendMode,
      anim:ci.animationName, state:ci.animationPlayState,
      lineOpacity:+getComputedStyle(document.querySelectorAll(".story-line")[1]).opacity};
  });
}
for(const q of [0,0.25,0.5,0.75,1]){
  const r=await at(q);
  console.log(`p=${q.toFixed(2)} waterY=${String(r.y).padStart(7)}px z=${r.z} op=${r.op} blend=${r.blend} anim=${r.anim}/${r.state} line2op=${r.lineOpacity.toFixed(2)}`);
}
// droplet drift actually moving?
const t1=await p.evaluate(()=>getComputedStyle(document.querySelector(".story-water img")).transform);
await new Promise(r=>setTimeout(r,1500));
const t2=await p.evaluate(()=>getComputedStyle(document.querySelector(".story-water img")).transform);
console.log("drift changing:", t1!==t2);
// stacking: water behind bubbles behind text
const z=await p.evaluate(()=>({water:getComputedStyle(document.querySelector(".story-water")).zIndex,
  bubbles:getComputedStyle(document.querySelector(".story-bubbles")).zIndex,
  text:getComputedStyle(document.querySelector(".story-text")).zIndex}));
console.log("stacking:", JSON.stringify(z));
await b.close();
