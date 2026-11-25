import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {addItem,patchItem,invalidate,summarize} from "./core.mjs";
const root=process.cwd(), dir=path.join(root,".motion"), registryPath=path.join(dir,"registry.json");
const read=f=>JSON.parse(fs.readFileSync(f,"utf8"));
const write=(f,value)=>{const tmp=f+"."+process.pid+".tmp";try{fs.writeFileSync(tmp,JSON.stringify(value,null,2)+"\n",{flag:"wx"});fs.renameSync(tmp,f)}finally{if(fs.existsSync(tmp))fs.unlinkSync(tmp)}};
const print=x=>console.log(JSON.stringify(x,null,2));
function locked(fn){
  fs.mkdirSync(dir,{recursive:true});const lock=path.join(dir,".write.lock");
  const fd=fs.openSync(lock,"wx");
  try{fs.writeFileSync(fd,String(process.pid));return fn()}finally{fs.closeSync(fd);fs.unlinkSync(lock)}
}
function init(){
  locked(()=>{
    const initial={"registry.json":{schemaVersion:1,revision:0,items:[],unknownScope:["Discovery not yet completed"]},"config.json":{schemaVersion:1,mode:"auto",depth:"auto",quality:"premium",manualReview:false},"task-state.json":{schemaVersion:1,status:"pending",nextAction:"Discover interactions"},"motion-tokens.json":read(fileURLToPath(new URL("../assets/defaults/motion-tokens.json",import.meta.url)))};
    for(const [name,value] of Object.entries(initial)){const f=path.join(dir,name);if(!fs.existsSync(f))write(f,value)}
    const ignore=path.join(dir,".gitignore");if(!fs.existsSync(ignore))fs.writeFileSync(ignore,"evidence/\nbaselines/\n.write.lock\n*.tmp\n");
  });print({initialized:dir});
}
function mutate(fn){return locked(()=>{const next=fn(read(registryPath));write(registryPath,next);print(summarize(next))})}
function scan(){
  const skipped=new Set(["node_modules",".git",".motion","dist","build","coverage",".next","vendor",".venv"]);
  const pattern=/\b(onClick|onPointer\w+|onMouse\w+|onKey\w+|onTouch\w+|onDrag\w+|onFocus|onBlur|onChange|onSubmit|addEventListener|requestAnimationFrame|animate|transition|animation|keyframes|useSpring|GestureDetector|AnimationController|AnimatedVisibility|withAnimation)\b|@click|:hover|:focus-visible|prefers-reduced-motion/i;
  const candidates=[];let truncated=false,scanned=0;
  function walk(folder){for(const e of fs.readdirSync(folder,{withFileTypes:true})){
    if(skipped.has(e.name)||e.name.startsWith("."))continue;
    const f=path.join(folder,e.name);
    if(e.isDirectory()){walk(f);continue}
    if(!e.isFile()||!/\.(tsx?|jsx?|mjs|cjs|vue|svelte|css|scss|html|swift|kt|dart|xaml|cs)$/i.test(e.name)||fs.statSync(f).size>1024*1024)continue;
    scanned++;const lines=fs.readFileSync(f,"utf8").split(/\r?\n/);
    for(let i=0;i<lines.length;i++){const m=lines[i].match(pattern);if(m){if(candidates.length>=5000){truncated=true;break}candidates.push({file:path.relative(root,f).split(path.sep).join("/"),line:i+1,signal:m[0]})}}
  }}
  walk(root);print({scanned,candidates,truncated,limitations:"Static heuristics only; inspect routes, states, runtime, unscanned files and missing animations manually."});
}
try{
  const [cmd,...a]=process.argv.slice(2);
  switch(cmd){
    case "init":init();break;
    case "scan":scan();break;
    case "list":print(read(registryPath));break;
    case "report":print(summarize(read(registryPath)));break;
    case "add":mutate(r=>addItem(r,read(a[0])));break;
    case "patch":mutate(r=>patchItem(r,a[0],Number(a[1]),read(a[2])));break;
    case "invalidate":mutate(r=>invalidate(r,read(a[0])));break;
    default:throw Error("Usage: motion.mjs init|scan|list|report|add FILE|patch ID REV FILE|invalidate FILE");
  }
}catch(e){console.error(e.message);process.exitCode=1}
