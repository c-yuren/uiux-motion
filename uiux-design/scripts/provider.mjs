import fs from "node:fs/promises";
import {searchResources,resourceLocation} from "./provider-core.mjs";
const dir=new URL("../integrations/providers/ui-moments/",import.meta.url);
const read=async f=>JSON.parse(await fs.readFile(new URL(f,dir),"utf8"));
try{
 const provider=await read("provider.json");
 const catalogs=await Promise.all(provider.groups.map(g=>read("catalog-"+g+".json")));
 const [cmd,arg,...args]=process.argv.slice(2);
 if(cmd==="search"){
  const options={};for(let i=0;i<args.length;i+=2){if(!args[i+1])throw Error("Missing value");if(args[i]==="--group"){if(!provider.groups.includes(args[i+1]))throw Error("Unknown group");options.group=args[i+1]}else if(args[i]==="--limit")options.limit=Number(args[i+1]);else if(args[i]==="--framework"){if(!["native","web","react"].includes(args[i+1]))throw Error("Unknown framework");options.framework=args[i+1]}else throw Error("Unknown option "+args[i])}
  console.log(JSON.stringify(searchResources(catalogs,arg??"",options),null,2));
 }else if(cmd==="locate"||cmd==="fetch"){
  const catalog=catalogs.find(c=>c.items.some(x=>x.id===arg));if(!catalog)throw Error("Unknown resource ID");
  const location=resourceLocation(provider,catalog.group,catalog.items.find(x=>x.id===arg));
  if(cmd==="locate")console.log(JSON.stringify(location,null,2));
  else {
   if(args.length!==1||args[0]!=="--allow-network")throw Error("Explicit --allow-network required");
   const response=await fetch(location.raw,{redirect:"error",signal:AbortSignal.timeout(15000)});
   if(!response.ok)throw Error("Source unavailable: "+response.status);
   const reader=response.body.getReader();let size=0;const chunks=[];
   while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>1024*1024){await reader.cancel();throw Error("Source exceeds 1 MiB limit")}chunks.push(Buffer.from(value))}
   console.log(JSON.stringify({...location,content:Buffer.concat(chunks).toString("utf8")},null,2));
  }
 }else throw Error("Usage: provider.mjs search QUERY [--group GROUP] [--limit N] [--framework native|web|react] | locate ID | fetch ID --allow-network");
}catch(e){console.error(e.message);process.exitCode=1}
