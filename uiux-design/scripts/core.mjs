export function nonempty(x){return typeof x==="string"&&!!x.trim()}

export function validId(x){return typeof x==="string"&&/^[A-Za-z0-9._:%-]+$/.test(x)&&x.length<=512}

export function paths(x){if(!Array.isArray(x)||x.some(v=>!nonempty(v)||v.startsWith("/")||v.includes("\\")||v.includes(":")||v.split("/").includes("..")))throw Error("Invalid project-relative paths");return [...new Set(x)]}

export function normalizeCheck(c) {
  if(!c||typeof c!=="object"||!validId(c.id)||!["visual","information","motion","interaction"].includes(c.dimension)||!nonempty(c.subject))throw Error("Invalid check");
  const status=c.status??"pending",decision=c.decision??null,gates=c.gates??{},evidence=c.evidence??[];
  if(!["pending","reviewed","implemented","verified","failed","blocked","stale","skipped"].includes(status))throw Error("Invalid status");
  if(decision!==null&&!["keep","refine","add","replace","simplify","repair","remove"].includes(decision))throw Error("Invalid decision");
  if(!gates||typeof gates!=="object"||Array.isArray(gates)||!Array.isArray(evidence)||evidence.some(e=>!e||!nonempty(e.path)||!nonempty(e.description)))throw Error("Invalid evidence or gates");
  for(const g of Object.values(gates)){
    if(!g||!["pass","fail","unknown","na"].includes(g.status)||!nonempty(g.reason))throw Error("Invalid gate");
    if(g.status==="pass"&&(!Array.isArray(g.evidence)||!g.evidence.length||g.evidence.some(x=>!evidence.some(e=>e.path===x))))throw Error("Missing gate evidence");
  }
  if(status==="verified"){
    if(!decision||!evidence.length)throw Error("Verification requires decision and evidence");
    const required=["functional","visual","accessibility","regression",...(c.dimension==="information"?["accuracy"]:[]),...(c.dimension==="motion"?["interruption","performance"]:[]),...(c.dimension==="interaction"?["interruption"]:[])];
    for(const key of required)if(!["pass","na"].includes(gates[key]?.status))throw Error("Unresolved gate: "+key);
    if(gates.visual.status!=="pass")throw Error("Verified design needs visual evidence");
    if(Object.values(gates).some(g=>!["pass","na"].includes(g.status)))throw Error("Unresolved additional gate");
  }
  return {...c,status,decision,gates,evidence};
}

export function normalizeEntity(e){
  if(!e||!validId(e.id)||!nonempty(e.component)||!nonempty(e.context)||!Array.isArray(e.checks)||!e.checks.length)throw Error("Invalid entity");
  const protection=e.protection??"open";
  if(!["open","preferred","approved","locked","protected"].includes(protection))throw Error("Invalid protection");
  const checks=e.checks.map(normalizeCheck);
  if(new Set(checks.map(c=>c.id)).size!==checks.length)throw Error("Duplicate check ID");
  return {...e,protection,sourceFiles:paths(e.sourceFiles??[]),dependencies:paths(e.dependencies??[]),checks};
}

export function emptyRegistry(){return {schemaVersion:1,revision:0,entities:[],unknownScope:["Discovery not yet completed"],migrations:[]}}

export function requireRevision(r,expected){if(r.schemaVersion!==1||!Number.isSafeInteger(r.revision)||r.revision!==expected)throw Error("Registry version/revision conflict")}

export function addEntity(r,expected,entity){
  requireRevision(r,expected);
  const e=normalizeEntity(entity);
  if(r.entities.some(x=>x.id===e.id))throw Error("Duplicate entity ID");
  return {...r,revision:r.revision+1,entities:[...r.entities,e]};
}

export function patchCheck(r,expected,entityId,checkId,patch){
  requireRevision(r,expected);
  const e=r.entities.find(x=>x.id===entityId);
  if(!e)throw Error("Unknown entity");
  const old=e.checks.find(x=>x.id===checkId);
  if(!old)throw Error("Unknown check");
  if(!patch||typeof patch!=="object"||Array.isArray(patch)||(patch.id!==undefined&&patch.id!==checkId)||(patch.dimension!==undefined&&patch.dimension!==old.dimension))throw Error("Invalid patch or immutable identity");
  const c=normalizeCheck({...old,...patch,id:checkId,dimension:old.dimension});
  if(["locked","protected"].includes(e.protection)&&c.decision!==old.decision&&c.decision!==null&&c.decision!=="keep")throw Error("Protected entity: record review, do not change decision");
  return {...r,revision:r.revision+1,entities:r.entities.map(x=>x.id===entityId?{...e,checks:e.checks.map(y=>y.id===checkId?c:y)}:x)};
}

export function appendCheck(r,expected,entityId,check){
  requireRevision(r,expected);
  const e=r.entities.find(x=>x.id===entityId);
  if(!e)throw Error("Unknown entity");
  const next=normalizeEntity({...e,checks:[...e.checks,check]});
  return {...r,revision:r.revision+1,entities:r.entities.map(x=>x.id===entityId?next:x)};
}

export function setScope(r,expected,unknownScope){
  requireRevision(r,expected);
  if(!Array.isArray(unknownScope)||unknownScope.some(x=>!nonempty(x)))throw Error("Expected array of scope limitations");
  return {...r,revision:r.revision+1,unknownScope:[...new Set(unknownScope)]};
}

export function invalidate(r,expected,changed){
  requireRevision(r,expected);
  if(!Array.isArray(changed)||changed.some(x=>!nonempty(x)))throw Error("Expected changed paths");
  const global=changed.some(x=>x==="*"||/design-system|motion-tokens|visual-tokens|package\.json|lock\.json|lock\.ya?ml|yarn\.lock|routes?\//i.test(x));
  return {...r,revision:r.revision+1,entities:r.entities.map(e=>global||!e.sourceFiles.length||changed.some(x=>[...e.sourceFiles,...e.dependencies].some(y=>x===y||x.startsWith(y+"/")||y.startsWith(x+"/")))?{...e,checks:e.checks.map(c=>({...c,status:"stale",previousEvidence:c.evidence,previousGates:c.gates,evidence:[],gates:{}}))}:e)};
}

export function migrate(r,expected,old){
  requireRevision(r,expected);
  if(old?.schemaVersion!==1||!Number.isSafeInteger(old.revision)||!Array.isArray(old.items))throw Error("Unsupported legacy registry");
  if(r.migrations.some(m=>m.source===".motion/registry.json"))throw Error("Already migrated; manually reconcile subsequent legacy edits");
  const groups=new Map(),seen=new Set();
  for(const item of old.items){
    if(!item||!validId(item.id)||seen.has(item.id)||!nonempty(item.component)||!nonempty(item.context)||!nonempty(item.interaction))throw Error("Invalid legacy item");
    seen.add(item.id);
    const key=JSON.stringify([item.component,item.context]);
    const g=groups.get(key)??{id:"legacy:"+item.id,component:item.component,context:item.context,sourceFiles:[],dependencies:[],protection:"open",checks:[]};
    const order=["open","preferred","approved","locked","protected"], protection=item.protection??"open";
    if(!order.includes(protection))throw Error("Invalid legacy protection");
    if(order.indexOf(protection)>order.indexOf(g.protection))g.protection=protection;
    g.sourceFiles.push(...paths(item.sourceFiles??[]));g.dependencies.push(...paths(item.dependencies??[]));
    g.checks.push({id:"motion:"+item.id,dimension:"motion",subject:item.interaction,decision:item.decision??null,status:"stale",gates:{},evidence:[],legacy:{id:item.id,record:item}});
    groups.set(key,g);
  }
  const entities=[...groups.values()].map(normalizeEntity);
  if(entities.some(e=>r.entities.some(x=>x.id===e.id)))throw Error("Legacy ID collision");
  return {...r,revision:r.revision+1,entities:[...r.entities,...entities],unknownScope:[...new Set([...r.unknownScope,...(Array.isArray(old.unknownScope)?old.unknownScope.filter(nonempty):[]),"Legacy records require revalidation and entity reconciliation; other legacy files retained in .motion"])],migrations:[...r.migrations,{source:".motion/registry.json",legacyRevision:old.revision,importedChecks:seen.size}]};
}

export function summarize(r){
  const counts={},dimensions={};
  for(const e of r.entities)for(const c of e.checks){counts[c.status]=(counts[c.status]??0)+1;dimensions[c.dimension]??={};dimensions[c.dimension][c.status]=(dimensions[c.dimension][c.status]??0)+1}
  const checks=Object.values(counts).reduce((a,b)=>a+b,0);
  return {revision:r.revision,entities:r.entities.length,checks,counts,dimensions,unknownScope:r.unknownScope,recordedComplete:checks>0&&(counts.verified??0)===checks&&r.unknownScope.length===0,note:"Recorded status only; not independent proof of coverage or quality."};
}
