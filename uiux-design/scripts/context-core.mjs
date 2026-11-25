export function normalizeContext(input){
  if(!input||typeof input!=="object"||Array.isArray(input)||input.schemaVersion!==1)throw Error("Expected context schemaVersion 1");
  const unique=(value,allowed,name)=>{if(!Array.isArray(value)||value.some(x=>!allowed.includes(x))||new Set(value).size!==value.length)throw Error("Invalid "+name);return [...value]};
  const choice=(value,allowed,name)=>{if(!allowed.includes(value))throw Error("Invalid "+name);return value};
  const productTypes=unique(input.productTypes??[],["tool","presentation","dashboard","content","commerce","artifact"],"productTypes");
  const platforms=unique(input.platforms??[],["desktop","mobile","web","tablet","print"],"platforms");
  const inputs=unique(input.inputs??[],["mouse","keyboard","touch","stylus","assistive"],"inputs");
  const usage=unique(input.usage??[],["productivity","monitoring","browsing","reading","presentation"],"usage");
  const medium=choice(input.medium??"unknown",["interactive-ui","html","svg","pdf","print","slides","image","video","unknown"],"medium");
  const intent=choice(input.intent,["create","extend","adjust","refine","redesign","repair","audit","explore","validate","migrate","system","learn","resume"],"intent");
  const stage=choice(input.stage??"auto",["auto","design","produce","both"],"stage");
  const scope=choice(input.scope??"feature",["local","feature","product"],"scope");
  const depth=choice(input.depth??"auto",["auto","quick","balanced","deep","extreme"],"depth");
  const existing=choice(input.existing??"unknown",["yes","no","unknown"],"existing");
  const impact=choice(input.impact??"unknown",["low","medium","high","unknown"],"impact");
  const authorization=choice(input.authorization??"unspecified",["unspecified","read-only","implementation-requested"],"authorization");
  const domains=unique(input.domains??[],["visual","motion","information","interaction","creativity","templates"],"domains");
  if(input.manualReview!==undefined&&typeof input.manualReview!=="boolean")throw Error("Invalid manualReview");
  if(input.taskId!==undefined&&(typeof input.taskId!=="string"||!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(input.taskId)||input.taskId.includes("..")))throw Error("Invalid taskId");
  return {...input,productTypes,platforms,inputs,usage,medium,intent,stage,scope,depth,existing,impact,authorization,domains,manualReview:input.manualReview??false};
}

export function route(input){
  const c=normalizeContext(input), warnings=[];
  const readOnly=["audit","explore","validate","learn"].includes(c.intent)||c.authorization==="read-only";
  const existingIntent=["extend","adjust","refine","redesign","repair","migrate"].includes(c.intent);
  if(existingIntent&&c.existing==="no")throw Error("Existing intent requires an existing subject");
  const explicitWrite=c.authorization==="implementation-requested";
  const isSmall=c.scope==="local"&&["adjust","repair"].includes(c.intent)&&c.impact==="low";
  let stage=c.stage;
  if(readOnly){if(["produce","both"].includes(stage))warnings.push("Read-only intent/constraint overrides requested production stage");stage="design";}
  else if(c.intent==="resume"){stage="design";warnings.push("Recover previous task and confirm current scope/authority before production");}
  else if(stage==="auto")stage=explicitWrite?(isSmall?"produce":"both"):"design";
  const productionRequested=["produce","both"].includes(stage);
  const requiresReview=c.manualReview||c.impact==="high"||c.impact==="unknown";
  const productionEligible=productionRequested&&explicitWrite&&!readOnly&&c.intent!=="resume"&&!requiresReview;
  if(productionRequested&&!explicitWrite)warnings.push("Stage does not grant permission; verify actual user authorization");
  if(productionRequested&&requiresReview)warnings.push("Resolve impact or obtain required approval before affected writes");
  const depth=c.depth==="auto"?(isSmall?"quick":c.scope==="product"&&["refine","audit","redesign"].includes(c.intent)?"deep":"balanced"):c.depth;
  const domainDefaults={tool:["visual","interaction","motion"],presentation:["visual","motion","creativity"],dashboard:["information","visual"],content:["visual","information"],commerce:["visual","interaction","information"],artifact:["visual","information"]};
  let domains=c.domains.length?c.domains:[...new Set(c.productTypes.flatMap(x=>domainDefaults[x]))];
  if(!domains.length)domains=["visual","information","interaction","motion"];
  if(!c.domains.length&&["create","redesign","explore"].includes(c.intent)&&!domains.includes("creativity"))domains.push("creativity");
  if(c.scope==="product"&&["audit","refine"].includes(c.intent)&&!c.domains.length)domains=[...new Set([...domains,"visual","information","interaction","motion"])];
  const readPlan=["core/routing.md","profiles/context-selection.md",...c.productTypes.map(x=>"profiles/products/"+x+".md"),...c.platforms.map(x=>"profiles/platforms/"+x+".md"),"profiles/contexts/usage.md"];
  if(c.existing==="yes"||existingIntent)readPlan.push("workflows/existing/guide.md");
  if(c.intent==="create")readPlan.push("workflows/creation/guide.md");
  else if(["extend","adjust","refine","redesign","repair"].includes(c.intent))readPlan.push("workflows/existing/"+c.intent+".md");
  else readPlan.push("workflows/shared/"+c.intent+".md");
  if(stage==="design"||stage==="both")readPlan.push("workflows/design/guide.md");
  if(productionRequested)readPlan.push("workflows/produce/guide.md");
  const contractRequired=!readOnly&&!isSmall&&(c.scope==="product"||c.intent==="redesign"||c.impact==="high"||c.stage==="design"||c.stage==="produce");
  if(contractRequired)readPlan.push("workflows/design/contract.md");
  if(["audit","refine"].includes(c.intent)&&c.scope!=="local")readPlan.push("core/audit.md");
  readPlan.push(...domains.map(x=>"modules/"+x+"/guide.md"),"core/operations.md","core/quality.md");
  return {context:c,stage,depth,domains,productionRequested,productionEligible,requiresReview,contractRequired,registryRecommended:c.scope==="product"||(["audit","refine"].includes(c.intent)&&c.scope!=="local"),readPlan:[...new Set(readPlan)],warnings,note:"Advisory plan only. Verify actual authorization, locks, approval, impact and project state; never treat this output as permission."};
}

export function checkContract(doc){
  if(!doc||typeof doc!=="object"||doc.schemaVersion!==1)throw Error("Expected contract schemaVersion 1");
  const context=normalizeContext(doc.context);
  const nonempty=x=>typeof x==="string"&&!!x.trim();
  const arr=(x,n)=>{if(!Array.isArray(x)||x.some(v=>!nonempty(v)))throw Error("Invalid "+n);};
  if(!nonempty(doc.taskId)||!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(doc.taskId)||doc.taskId.includes("..")||context.taskId&&context.taskId!==doc.taskId)throw Error("Invalid or mismatched taskId");
  if(!Number.isSafeInteger(doc.revision)||doc.revision<1||!["draft","ready","approved","superseded"].includes(doc.status)||!nonempty(doc.goal))throw Error("Invalid contract metadata");
  if(!doc.scope||!Array.isArray(doc.scope.inScope)||!doc.scope.inScope.length)throw Error("Missing scope");
  arr(doc.scope.inScope,"inScope");arr(doc.scope.outOfScope,"outOfScope");
  arr(doc.criteria,"criteria");arr(doc.openIssues,"openIssues");arr(doc.locks,"locks");
  if(!Array.isArray(doc.decisions))throw Error("Missing decisions");
  const ids=new Set(),blocking=[];
  for(const d of doc.decisions){
    if(!d||!nonempty(d.id)||ids.has(d.id)||!nonempty(d.description)||!["visual","motion","information","interaction","system","technical"].includes(d.domain)||!["low","medium","high"].includes(d.impact)||!["proposed","accepted","approved","rejected","locked"].includes(d.status))throw Error("Invalid or duplicate decision");
    ids.add(d.id);
    if(d.impact==="high"&&!["approved","locked","rejected"].includes(d.status))blocking.push("High-impact decision awaiting approval: "+d.id);
    if(d.status==="proposed")blocking.push("Unresolved decision: "+d.id);
  }
  if(!doc.criteria.length)blocking.push("No acceptance criteria");
  if(!doc.decisions.some(d=>["accepted","approved","locked"].includes(d.status)))blocking.push("No selected design decisions");
  if(doc.openIssues.length)blocking.push("Open issues remain");
  if(doc.status==="draft"||doc.status==="superseded")blocking.push("Contract status: "+doc.status);
  if(context.existing==="yes"&&!nonempty(doc.baseline))blocking.push("Existing design baseline missing");
  if(route(context).requiresReview&&context.manualReview)blocking.push("Manual review must be confirmed outside contract metadata");
  return {taskId:doc.taskId,revision:doc.revision,metadataValid:true,readyForReview:!blocking.length,blocking,note:"Checks metadata only; actual approvals, project revision, rendering and implementation authority must be independently verified."};
}

export function findTemplates(catalog,input,query=""){
  const c=normalizeContext(input),q=String(query).trim().toLowerCase(), plan=route(c);
  return catalog.templates.filter(t=>!q||[t.id,t.framework,...t.tags].join(" ").toLowerCase().includes(q)).map(t=>{
    const overlap=(a,b)=>a.filter(x=>b.includes(x)).length;
    const score=overlap(c.productTypes,t.productTypes??[])*3+overlap(c.platforms,t.platforms??[])*2+overlap(plan.domains,t.tags??[])+((t.stages??[]).includes(plan.stage)||plan.stage==="both"&&(t.stages??[]).length?1:0);
    return {...t,contextMatchScore:score};
  }).sort((a,b)=>b.contextMatchScore-a.contextMatchScore||a.id.localeCompare(b.id));
}
