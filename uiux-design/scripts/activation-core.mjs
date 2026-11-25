export function normalizePreferences(input={}){
 if(!input||typeof input!=="object"||Array.isArray(input))throw Error("Invalid preferences");
 if(input.schemaVersion!==undefined&&input.schemaVersion!==1)throw Error("Unsupported preferences schema");
 const out={};
 if(input.activation!==undefined){
  const a=input.activation;
  if(!a||typeof a!=="object"||Array.isArray(a))throw Error("Invalid activation");
  out.activation={};
  if(a.mode!==undefined){if(!["auto","manual","disabled"].includes(a.mode))throw Error("Invalid activation mode");out.activation.mode=a.mode}
  if(a.maxAutoLevel!==undefined){if(!Number.isInteger(a.maxAutoLevel)||a.maxAutoLevel<0||a.maxAutoLevel>4)throw Error("Invalid maxAutoLevel");out.activation.maxAutoLevel=a.maxAutoLevel}
 }
 if(input.preferences!==undefined){
  const a=input.preferences;if(!a||typeof a!=="object"||Array.isArray(a))throw Error("Invalid design preferences");
  out.preferences={};
  if(a.style!==undefined){if(typeof a.style!=="string"||!a.style.trim()||a.style.length>200)throw Error("Invalid style");out.preferences.style=a.style}
  if(a.quality!==undefined){if(!["functional","refined","premium","signature"].includes(a.quality))throw Error("Invalid quality");out.preferences.quality=a.quality}
  if(a.depth!==undefined){if(!["auto","quick","balanced","deep","extreme"].includes(a.depth))throw Error("Invalid depth");out.preferences.depth=a.depth}
 }
 return out;
}

export function resolvePreferences(global={},project={},task={}){
 const layers=[{activation:{mode:"auto",maxAutoLevel:4},preferences:{style:"adaptive",quality:"premium",depth:"auto"}},normalizePreferences(global),normalizePreferences(project),normalizePreferences(task)];
 const result={schemaVersion:1,activation:{},preferences:{},sources:{}};
 for(let i=0;i<layers.length;i++)for(const section of ["activation","preferences"])for(const [k,v] of Object.entries(layers[i][section]??{})){
 result[section][k]=v;result.sources[section+"."+k]=["default","global","project","task"][i];
 }
 return result;
}

export function planActivation(input,settings){
 if(!input||typeof input!=="object"||Array.isArray(input))throw Error("Invalid task activation");
 const relevance=input.relevance??"unknown",scope=input.scope??"local",request=input.request??"auto";
 if(!["none","unknown","indirect","direct"].includes(relevance)||!["local","feature","product"].includes(scope)||!["auto","force","off"].includes(request))throw Error("Invalid activation context");
 const allowed=["visual","motion","information","interaction","creativity","templates"],domains=input.domains??[];
 if(!Array.isArray(domains)||domains.some(x=>!allowed.includes(x))||new Set(domains).size!==domains.length)throw Error("Invalid domains");
 if(input.level!==undefined&&(!Number.isInteger(input.level)||input.level<0||input.level>4))throw Error("Invalid requested level");
 if(input.alreadyActive!==undefined&&typeof input.alreadyActive!=="boolean")throw Error("Invalid alreadyActive");
 const {mode,maxAutoLevel}=settings.activation;
 let level=0,reason="",required=0,warnings=[];
 if(request==="off"||input.level===0){reason="Explicit task opt-out";}
 else if(request!=="force"&&mode!=="auto"){reason="Automatic activation disabled or manual only";}
 else if(relevance==="none"&&request!=="force"){reason="Unrelated task";}
 else {
  required=request==="force"&&relevance==="none"?2:relevance==="direct"?(scope==="product"?4:scope==="feature"?3:2):1;
  if(request==="force")required=Math.max(2,required);
  if(input.level!==undefined)required=input.level;
  level=request==="force"?required:Math.min(required,maxAutoLevel);
  reason=request==="force"?"Explicit invocation":"Task relevance and scope";
  if(level<required)warnings.push("Automatic cap below suggested scope; disclose reduced coverage and seek explicit override if necessary. Never waive required tests.");
 }
 const names=["inactive","awareness","targeted","integrated","comprehensive"];
 const load=level===0?[]:level===1?["SKILL.md"]:["SKILL.md","core/routing.md","profiles/context-selection.md",...domains.map(x=>"modules/"+x+"/guide.md")];
 if(level===4)load.push("core/audit.md");
 if(level>=2)load.push("core/quality.md","core/operations.md");
 return {level,label:names[level],suggestedLevel:required,reason,domains:level>=2?domains:[],readPlan:[...new Set(load)],reuseActiveSession:level>0&&input.alreadyActive===true,warnings,note:"Advisory only; host decides invocation and context, no write authorization. For L2–L4 use context routing to load relevant profiles/workflows."};
}
