import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
mkdirSync("cmp",{recursive:true});
const CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe";
const b=await puppeteer.launch({executablePath:CHROME,headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
async function shots(url,tag,ys){
  const p=await b.newPage();
  await p.setViewport({width:1440,height:900});
  await p.goto(url,{waitUntil:"domcontentloaded",timeout:120000});
  await new Promise(r=>setTimeout(r,4500));
  await p.evaluate(async()=>{const s=innerHeight*.85;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}scrollTo(0,0);await new Promise(r=>setTimeout(r,700));});
  const H=await p.evaluate(()=>document.body.scrollHeight);
  for(let i=0;i<ys.length;i++){
    await p.evaluate(y=>window.scrollTo(0,y), Math.round(ys[i]*H));
    await new Promise(r=>setTimeout(r,1100));
    await p.screenshot({path:`cmp/${tag}-${i}.png`});
  }
  await p.close();
  return H;
}
const frac=[0.17,0.24,0.33,0.45,0.58,0.72,0.86,0.96];
const rh=await shots("https://createstudio.framer.media/","R",frac);
const lh=await shots("http://127.0.0.1:8080/index.html","L",frac);
await b.close();
console.log("ref height",rh," local height",lh);
