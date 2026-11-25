export function normalize(item) {
  if(!item || typeof item!=="object" || !/^[A-Za-z0-9._:-]+$/.test(item.id||"")) throw Error("Invalid interaction id");
  for(const k of ["component","interaction","context"]) if(typeof item[k]!=="string"||!item[k].trim()) throw Error("Missing "+k);
  const paths=item.sourceFiles||[], dependencies=item.dependencies||[];
  if(!Array.isArray(paths)||!Array.isArray(dependencies)||[...paths,...dependencies].some(x=>typeof x!=="string"||!x||x.startsWith("/")||x.includes("\\")||x.split("/").includes(".."))) throw Error("Invalid paths");
  const status=item.status||"pending", decision=item.decision||null;
  if(!["pending","reviewed","implemented","verified","failed","blocked","stale","skipped"].includes(status)) throw Error("Invalid status");
  if(decision!==null&&!["keep","refine","add","replace","simplify","repair","remove"].includes(decision)) throw Error("Invalid decision");
  const protection=item.protection||"open";
  if(!["open","preferred","approved","locked","protected"].includes(protection)) throw Error("Invalid protection");
  const gates=item.gates||{}, evidence=item.evidence||[];
  if(!Array.isArray(evidence)||evidence.some(e=>!e||typeof e.path!=="string"||!e.path||typeof e.description!=="string"||!e.description)) throw Error("Invalid evidence");
  if(status==="verified"){
    if(!decision||!evidence.length) throw Error("Verified item requires decision and evidence");
    for(const key of ["functional","visual","performance","accessibility","regression","interruption"]){
      const g=gates[key];
      if(!g||!["pass","na"].includes(g.status)||typeof g.reason!=="string"||!g.reason.trim()) throw Error("Gate not passed or justified: "+key);
      if(g.status==="pass"&&(!Array.isArray(g.evidence)||!g.evidence.length||g.evidence.some(path=>!evidence.some(e=>e.path===path)))) throw Error("Gate evidence missing: "+key);
    }
  }
  return {...item,sourceFiles:paths,dependencies,status,decision,protection,gates,evidence};
}

export function addItem(registry,item) {
  const x=normalize(item);
  if(registry.items.some(i=>i.id===x.id)) throw Error("Duplicate ID");
  return {...registry,revision:registry.revision+1,items:[...registry.items,x]};
}

export function patchItem(registry,id,expected,patch) {
  if(registry.revision!==expected) throw Error("Revision conflict");
  if(patch.id&&patch.id!==id) throw Error("Immutable ID");
  const old=registry.items.find(i=>i.id===id);
  if(!old) throw Error("Unknown ID");
  const updated=normalize({...old,...patch,id});
  return {...registry,revision:registry.revision+1,items:registry.items.map(i=>i.id===id?updated:i)};
}

export function invalidate(registry,paths) {
  if(!Array.isArray(paths)||paths.some(x=>typeof x!=="string"||!x)) throw Error("Expected array of changed paths");
  const global=paths.some(x=>x==="*"||/motion-tokens|design-system|package\.json|lock\.json|lock\.yaml|lock\.yml|yarn\.lock|routes?\//i.test(x));
  return {...registry,revision:registry.revision+1,items:registry.items.map(i=>global||!i.sourceFiles.length||paths.some(x=>[...i.sourceFiles,...i.dependencies].some(y=>x===y||x.startsWith(y+"/")||y.startsWith(x+"/")))?{...i,status:"stale",previousEvidence:i.evidence,evidence:[],gates:{}}:i)};
}

export function summarize(registry) {
  const counts={};for(const i of registry.items) counts[i.status]=(counts[i.status]||0)+1;
  return {revision:registry.revision,discovered:registry.items.length,counts,recordedAllVerified:registry.items.length>0&&registry.items.every(i=>i.status==="verified"),unknownScope:registry.unknownScope||[],coverageNote:"Recorded status is not proof of complete discovery or actual quality."};
}
