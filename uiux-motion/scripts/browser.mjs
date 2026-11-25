// Optional, read-only local browser discovery.
import {createRequire} from "node:module";
import path from "node:path";
import fs from "node:fs/promises";
const [address,output]=process.argv.slice(2);
if(!address||!output)throw Error("Usage: browser.mjs http://localhost:PORT/path output.json");
const url=new URL(address);
if(!["http:","https:"].includes(url.protocol)||!["localhost","127.0.0.1","[::1]"].includes(url.hostname)||url.username||url.password)throw Error("Use an authorized local test URL");
const require=createRequire(path.join(process.cwd(),"package.json"));
const {chromium}=require("playwright");
const browser=await chromium.launch();
try{
 const page=await browser.newPage({viewport:{width:1280,height:800}});
 await page.goto(url.href,{waitUntil:"domcontentloaded"});
 if(new URL(page.url()).origin!==url.origin)throw Error("Unexpected navigation origin");
 const data=await page.evaluate(async()=>{
   const found=[...document.querySelectorAll("button,a,input,select,textarea,summary,[role],[tabindex],[draggable]")].filter(e=>e.getClientRects().length).slice(0,3000).map(e=>{
     const s=getComputedStyle(e);
     return {tag:e.tagName,id:e.id,role:e.getAttribute("role"),type:e.getAttribute("type"),transition:s.transitionProperty,duration:s.transitionDuration,animation:s.animationName};
   });
   const times=[];await new Promise(resolve=>{function next(t){times.push(t);if(times.length<31)requestAnimationFrame(next);else resolve()}requestAnimationFrame(next)});
   const intervals=times.slice(1).map((t,i)=>t-times[i]);
   return {candidates:found,activeAnimations:document.getAnimations().length,rafIntervalsMs:intervals,reducedMotion:matchMedia("(prefers-reduced-motion: reduce)").matches};
 });
 await fs.mkdir(path.dirname(path.resolve(output)),{recursive:true});
 const screenshot=output+".png";
 await page.screenshot({path:screenshot});
 await fs.writeFile(output,JSON.stringify({...data,viewport:{width:1280,height:800},screenshot,limitations:"Initial state only, no interactions; rAF cadence is not actual rendered frame rate. Visible DOM heuristic, capped at 3000."},null,2));
}finally{await browser.close()}
