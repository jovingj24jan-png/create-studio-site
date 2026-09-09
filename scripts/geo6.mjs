import puppeteer from "puppeteer-core";
const b=await puppeteer.launch({executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:"new",args:["--no-sandbox","--hide-scrollbars","--allow-file-access-from-files"]});
async function geo(url,tag){
 const p=await b.newPage();
 await p.setViewport({width:1440,height:900});
 await p.goto(url,{waitUntil:"domcontentloaded",timeout:120000});
 await new Promise(r=>setTimeout(r,4500));
 await p.evaluate(async()=>{const s=innerHeight*.85;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}scrollTo(0,0);await new Promise(r=>setTimeout(r,800));});
 const r=await p.evaluate(()=>{
  const txt=t=>{let hit=null;document.querySelectorAll("*").forEach(el=>{if(el.children.length)return;
    const s=(el.textContent||"").trim();if(s.toLowerCase().startsWith(t)&&!hit){const b=el.getBoundingClientRect();
      if(b.width>20)hit={y:Math.round(b.top+scrollY),fs:Math.round(parseFloat(getComputedStyle(el).fontSize)),
        col:getComputedStyle(el).color};}});return hit;};
  // the dark band = widest element with a near-black background
  let band=null;
  document.querySelectorAll("*").forEach(el=>{
    const b=el.getBoundingClientRect(), c=getComputedStyle(el).backgroundColor;
    const m=/rgba?\((\d+), (\d+), (\d+)/.exec(c); if(!m)return;
    const lum=+m[1]+ +m[2]+ +m[3];
    if(lum<70 && b.width>=innerWidth*0.97 && b.height>500){
      const y=Math.round(b.top+scrollY);
      if(!band||y<band.y)band={y,h:Math.round(b.height),bg:c};
    }});
  return {band, proof:txt("the proof")||txt("numbers we"), perf:txt("performance"), pageH:document.body.scrollHeight};
 });
 await p.close(); console.log(tag,JSON.stringify(r)); return r;
}
await geo("https://createstudio.framer.media/","REF");
await geo("http://127.0.0.1:8080/index.html","LOC");
await b.close();
