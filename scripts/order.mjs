import puppeteer from "puppeteer-core";
const CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe";
const b=await puppeteer.launch({executablePath:CHROME,headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
async function heads(url){
  const p=await b.newPage();
  await p.setViewport({width:1440,height:900});
  await p.goto(url,{waitUntil:"domcontentloaded",timeout:90000});
  await new Promise(r=>setTimeout(r,4000));
  await p.evaluate(async()=>{const s=innerHeight*.9;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}scrollTo(0,0);await new Promise(r=>setTimeout(r,400));});
  const r=await p.evaluate(()=>{
    const out=[],seen=new Set();
    document.querySelectorAll("h1,h2,h3").forEach(el=>{
      const fs=parseFloat(getComputedStyle(el).fontSize);
      if(fs<40)return;
      const rect=el.getBoundingClientRect();
      if(rect.width<20)return;
      const t=el.textContent.trim().replace(/\s+/g," ").slice(0,44);
      if(!t||seen.has(t))return; seen.add(t);
      out.push({y:Math.round(rect.top+scrollY),t,fs:Math.round(fs)});
    });
    return out.sort((a,b)=>a.y-b.y);
  });
  await p.close(); return r;
}
const R=await heads("https://createstudio.framer.media/");
const L=await heads("http://127.0.0.1:8080/index.html");
await b.close();
console.log("=== REFERENCE ==="); R.forEach((x,i)=>console.log(String(i+1).padStart(2),String(x.y).padStart(6),String(x.fs).padStart(4),x.t));
console.log("\n=== LOCAL ==="); L.forEach((x,i)=>console.log(String(i+1).padStart(2),String(x.y).padStart(6),String(x.fs).padStart(4),x.t));
