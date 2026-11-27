export function buildIndex(s,revision){
 const groups={original:[],loader:[],fluent:[],astryx:[]};
 const add=(group,id,name,type,path,extra={})=>groups[group].push({id,name,type,path,...extra});
 const w=s["gallery/works.js"];
 const core=w.slice(w.indexOf("const originalCore"),w.indexOf("const originalInputs"));
 for(const m of core.matchAll(/id: '([^']+)'[\s\S]*?title: '([^']+)'[\s\S]*?en: '([^']+)'[\s\S]*?type: '([^']+)'/g))add("original",m[1],m[3],m[4],"gallery/originals/index.html",{alias:m[2]});
 for(const [section,page] of [["Inputs","inputs"],["Actions","actions"],["Visuals","visual"],["Gestures","gestures"]]){
 const block=w.split("const original"+section+" = [")[1].split("].map(")[0];
 for(const m of block.matchAll(/^\s*\['([^']+)', '([^']+)', '([^']+)', '([^']+)'[^\n]*$/gm)){
 const actual=["hue-orbit","pull-cord","flip-coin"].includes(m[1])?"color":page;
 add("original",m[1],m[3],m[4],"gallery/originals/"+actual+".html",{alias:m[2]});
 }}
 for(const path of ["gallery/loaders/originals.mjs","gallery/loaders/motifs.mjs"])for(const m of s[path].matchAll(/key: '([^']+)',\s*name: '([^']+)',\s*nameZh: '([^']+)',\s*group: '([^']+)'/g))add("loader",m[1],m[2],"Loader",path,{alias:m[3],family:m[4]});
 const f=s["gallery/fluent-ui/catalog.mjs"];
 for(const group of ["controls","forms","navigation","feedback"]){
 const block=f.split("const "+group+" = [")[1].split("\n];")[0];
 for(const m of block.matchAll(/^\s*\['([^']+)', '([^']+)', '([^']+)'[^\n]*$/gm)){
 const entry={drawer:"DrawerDemo","teaching-popover":"TeachingPopoverDemo",toast:"ToastDemo"}[m[1]];
 add("fluent","fluent-"+m[1],m[2],m[3],"gallery/fluent-ui/"+(entry?"main":group)+".jsx",{entry:entry??"default export key "+m[1]});
 }}
 for(const path of ["gallery/astryx/showcases.mjs","gallery/astryx/variants.mjs"]){
 for(const line of s[path].split("\n")){
 const t=line.trim().replace(/,$/,"");if(!t.startsWith('["'))continue;
 const row=JSON.parse(t);if(row.length!==4)throw Error("Unexpected Astryx row");
 const [key,name,template]=row;add("astryx","astryx-"+key,name,key.startsWith("variant-")?"Component variant":"Component","packages/cli/assets/templates/blocks/components/"+template,{family:template.split("/")[0],entry:"default export",repository:"meta/astryx",revision:"0b48882df9c0bf8e49c8f7306737b6972c8dcd15"});
 }}
 for(const m of s["gallery/astryx/catalog.mjs"].split("const adapted = [")[1].split("].map(")[0].matchAll(/^\s*\['([^']+)', '([^']+)', '([^']+)', '([^']+)', '([^']+)'[^\n]*'([^']+)'\],?$/gm))add("astryx","astryx-"+m[1],m[2],m[4],"gallery/astryx/src/demo.jsx",{family:m[5],entry:m[6]});
 for(const m of s["gallery/astryx/experimental/stories.mjs"].matchAll(/^\s*\['([^']+)', '([^']+)', '([^']+)', '([^']+)', '([^']+)'\],?$/gm))add("astryx","astryx-"+m[1],m[2],m[5]==="chart"?"Data visualization":"Experimental component","gallery/astryx/experimental/vendor/astryx/apps/storybook/stories/"+m[3]+".stories.tsx",{entry:m[4],family:m[3].split("/").at(-1),experimental:true});
 const ids=new Set();for(const [group,rows] of Object.entries(groups))for(const row of rows){if(ids.has(row.id))throw Error("Duplicate "+row.id);ids.add(row.id);}
 return {schemaVersion:1,provider:"ui-moments",revision,groups};
}
