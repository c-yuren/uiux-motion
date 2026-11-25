import fs from "node:fs";
import {fileURLToPath} from "node:url";
import {route,checkContract,findTemplates} from "./context-core.mjs";
const read=f=>JSON.parse(fs.readFileSync(f,"utf8"));
try{
 const [cmd,file,...q]=process.argv.slice(2);
 if(!file)throw Error("Usage: context.mjs plan context.json | contract-check contract.json | templates context.json [query]");
 const input=read(file);let result;
 switch(cmd){
 case "plan": result=route(input);break;
 case "contract-check": result=checkContract(input);break;
 case "templates": result={templates:findTemplates(read(fileURLToPath(new URL("../assets/templates/catalog.json",import.meta.url))),input,q.join(" "))};break;
 default:throw Error("Unknown command");
 }
 console.log(JSON.stringify(result,null,2));
 if(cmd==="contract-check"&&!result.readyForReview)process.exitCode=2;
}catch(e){console.error(e.message);process.exitCode=1}
