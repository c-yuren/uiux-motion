import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import {resolvePreferences,planActivation} from "./activation-core.mjs";
const read=f=>JSON.parse(fs.readFileSync(f,"utf8"));
function optional(f){
 try{
  if(fs.lstatSync(f).isSymbolicLink())throw Error("Refuse symlinked preferences: "+f);
  return read(f);
 }catch(e){if(e.code==="ENOENT")return {};throw e}
}
try{
 const [cmd,file,...args]=process.argv.slice(2);
 if(!["resolve","plan"].includes(cmd)||!file)throw Error("Usage: activation.mjs resolve|plan task.json [--project-root ROOT] [--global-file FILE]");
 let root=process.cwd(),globalFile=path.join(os.homedir(),".config","uiux-design","preferences.json");
 for(let i=0;i<args.length;i+=2){
  if(!args[i+1])throw Error("Missing option value");
  if(args[i]==="--project-root")root=path.resolve(args[i+1]);
  else if(args[i]==="--global-file")globalFile=path.resolve(args[i+1]);
  else throw Error("Unknown option: "+args[i]);
 }
 if(!fs.statSync(root).isDirectory())throw Error("Project root must be a directory");
 const local=path.join(root,".uiux");
 if(fs.existsSync(local)&&fs.lstatSync(local).isSymbolicLink())throw Error("Refuse symlinked .uiux");
 const task=read(file),settings=resolvePreferences(optional(globalFile),optional(path.join(local,"preferences.json")),task.overrides??{});
 const result=cmd==="resolve"?{settings}: {settings,plan:planActivation(task,settings)};
 console.log(JSON.stringify(result,null,2));
}catch(e){console.error(e.message);process.exitCode=1}
