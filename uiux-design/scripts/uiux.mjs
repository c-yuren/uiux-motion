import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {emptyRegistry,addEntity,appendCheck,patchCheck,setScope,invalidate,migrate,summarize} from "./core.mjs";
const root=process.cwd(), dir=path.join(root,".uiux"), reg=path.join(dir,"registry.json");
const asset=f=>fileURLToPath(new URL("../"+f,import.meta.url));
const read=f=>JSON.parse(fs.readFileSync(f,"utf8"));
const print=x=>console.log(JSON.stringify(x,null,2));
function write(f,data){
 const tmp=f+"."+process.pid+".tmp";
 let created=false;try{const fd=fs.openSync(tmp,"wx");created=true;try{fs.writeFileSync(fd,JSON.stringify(data,null,2)+"\n");fs.fsyncSync(fd)}finally{fs.closeSync(fd)}fs.renameSync(tmp,f)}finally{if(created&&fs.existsSync(tmp))fs.unlinkSync(tmp)}
}
function lock(fn){
 fs.mkdirSync(dir,{recursive:true});
 if(fs.lstatSync(dir).isSymbolicLink())throw Error("Refuse symlinked .uiux");
 const f=path.join(dir,".write.lock"),fd=fs.openSync(f,"wx");
 try{fs.writeFileSync(fd,String(process.pid));return fn()}finally{fs.closeSync(fd);fs.unlinkSync(f)}
}
function init(){
 lock(()=>{
 const system=read(asset("assets/defaults/design-system.json"));system.motion.tokens=read(asset("modules/motion/assets/defaults/motion-tokens.json"));
 const values={"registry.json":emptyRegistry(),"design-system.json":system,"config.json":{schemaVersion:1,mode:"auto",depth:"auto",quality:"premium",manualReview:false},"task-state.json":{schemaVersion:1,status:"pending",nextAction:"Discover design entities",ownedPaths:[],blockers:[]}};
 for(const [name,v] of Object.entries(values)){const f=path.join(dir,name);if(!fs.existsSync(f))write(f,v)}
 const ig=path.join(dir,".gitignore");if(!fs.existsSync(ig))fs.writeFileSync(ig,"evidence/\nbaselines/\n.write.lock\n*.tmp\n",{flag:"wx"});
 });print({initialized:dir});
}
function mutate(fn){return lock(()=>{if(fs.lstatSync(reg).isSymbolicLink())throw Error("Refuse symlinked registry");const next=fn(read(reg));write(reg,next);print(summarize(next))})}
function scan(){
 const excluded=new Set(["node_modules",".git",".uiux",".motion","dist","build","coverage",".next","vendor",".venv"]);
 const patterns={visual:/\b(grid|flex|font-size|color|border-radius|box-shadow|gradient|backdrop-filter|viewBox|className|TextStyle)\b/i,information:/\b(chart|graph|progress|meter|table|svg|dataset|legend)\b/i,motion:/\b(animation|transition|keyframes|animate|requestAnimationFrame|useSpring|withAnimation|AnimationController)\b/i,interaction:/\b(onClick|onPointer\w+|onMouse\w+|onKey\w+|onTouch\w+|onDrag\w+|onFocus|onBlur|onChange|onSubmit|addEventListener|tabIndex|GestureDetector)\b|@click|:hover|:focus-visible/i};
 const candidates=[];let scanned=0,truncated=false;
 function walk(folder){for(const entry of fs.readdirSync(folder,{withFileTypes:true})){
 if(excluded.has(entry.name)||entry.name.startsWith("."))continue;const f=path.join(folder,entry.name);
 if(entry.isDirectory()){walk(f);continue}
 if(!entry.isFile()||!/\.(tsx?|jsx?|mjs|cjs|vue|svelte|css|scss|html|svg|swift|kt|dart|xaml|cs)$/i.test(entry.name)||fs.statSync(f).size>1024*1024)continue;
 scanned++;const lines=fs.readFileSync(f,"utf8").split(/\r?\n/);
 for(let i=0;i<lines.length;i++){const dimensions=Object.entries(patterns).filter(([,rx])=>rx.test(lines[i])).map(([k])=>k);if(dimensions.length){if(candidates.length>=5000){truncated=true;break}candidates.push({file:path.relative(root,f).split(path.sep).join("/"),line:i+1,dimensions})}}
 }}
 walk(root);print({scanned,candidates,truncated,limitations:"Static candidate signals only; inspect routes, actual renders, states, skipped files and missing opportunities."});
}
function templates(query){
 const catalog=read(asset("assets/templates/catalog.json"));const q=query.toLowerCase().trim();
 print({templates:catalog.templates.filter(t=>!q||[t.id,t.framework,...t.tags].join(" ").toLowerCase().includes(q)).map(t=>({...t,path:asset("assets/templates/"+t.file)}))});
}
try{
 const [cmd,...a]=process.argv.slice(2);
 switch(cmd){
 case "init":init();break;
 case "scan":scan();break;
 case "list":print(read(reg));break;
 case "report":print(summarize(read(reg)));break;
 case "add":mutate(r=>addEntity(r,Number(a[0]),read(a[1])));break;
 case "append-check":mutate(r=>appendCheck(r,Number(a[0]),a[1],read(a[2])));break;
 case "patch":mutate(r=>patchCheck(r,Number(a[0]),a[1],a[2],read(a[3])));break;
 case "scope":mutate(r=>setScope(r,Number(a[0]),read(a[1])));break;
 case "invalidate":mutate(r=>invalidate(r,Number(a[0]),read(a[1])));break;
 case "migrate":mutate(r=>migrate(r,Number(a[0]),read(path.join(root,".motion","registry.json"))));break;
 case "templates":templates(a.join(" "));break;
 default:throw Error("Usage: uiux.mjs init|scan|list|report|templates [query]|add REV FILE|append-check REV ENTITY FILE|patch REV ENTITY CHECK FILE|scope REV FILE|invalidate REV FILE|migrate REV");
 }
}catch(e){console.error(e.message);process.exitCode=1}
