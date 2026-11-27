export function searchResources(catalogs,query="",options={}){
 const norm=x=>String(x??"").normalize("NFKC").replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase().replace(/[-_]+/g," ");
 const aliases={"進度":"progress","載入":"loading loader","動畫":"motion animation","圖表":"chart data visualization","開關":"switch toggle","滑桿":"slider","手勢":"gesture drag","選單":"menu","表單":"input form","資料表":"table data grid","旋鈕":"dial","骨架":"skeleton","回饋":"feedback","搜尋":"search"};
 let q=norm(query);for(const [a,b] of Object.entries(aliases))q=q.replaceAll(a,b);
 const terms=q.trim().split(/\s+/).filter(Boolean);
 const limit=options.limit??12;if(!Number.isInteger(limit)||limit<1||limit>100)throw Error("Invalid limit");
 const results=[];
 for(const c of catalogs){if(options.group&&c.group!==options.group)continue;
 for(const x of c.items){
 const name=norm(x.name+" "+x.id+" "+(x.alias??"")),type=norm(x.type+" "+(x.family??"")+" "+c.group+" "+x.path);
 const score=terms.reduce((a,t)=>a+(name.includes(t)?6:type.includes(t)?2:0),0);
 if(terms.length&&score===0)continue;
 if(options.framework==="native"&&["fluent","astryx"].includes(c.group))continue;
 results.push({...x,provider:c.provider,group:c.group,revision:x.revision??c.revision,score});
 }}
 return results.sort((a,b)=>b.score-a.score||Number(a.experimental??false)-Number(b.experimental??false)||a.id.localeCompare(b.id)).slice(0,limit);
}

export function resourceLocation(provider,group,row){
 const repo=row.repository??provider.repository,revision=row.revision??provider.revision;
 const allowed=repo===provider.repository||(provider.id==="ui-moments"&&repo==="meta/astryx");
 if(!allowed||!/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repo)||! /^[0-9a-f]{40}$/.test(revision))throw Error("Unapproved repository or revision");
 if(typeof row.path!=="string"||!row.path.split("/").every(s=>/^[a-zA-Z0-9_.-]+$/.test(s)&&s!=="."&&s!==".."))throw Error("Invalid path");
 const root="https://github.com/"+repo+"/blob/"+revision+"/";
 const raw="https://raw.githubusercontent.com/"+repo+"/"+revision+"/"+row.path;
 const licenseRoot="https://github.com/"+provider.repository+"/blob/"+provider.revision+"/";
 const licensePaths=group==="fluent"?["LICENSE","CREDITS.md","gallery/fluent-ui/vendor/LICENSE","gallery/fluent-ui/vendor/UPSTREAM-LICENSE"]:group==="astryx"?["LICENSE","CREDITS.md",row.experimental?"gallery/astryx/experimental/vendor/astryx/LICENSE":"gallery/astryx/vendor/astryx/LICENSE"]:["LICENSE","CREDITS.md"];
 return {id:row.id,group,source:root+row.path,raw,entry:row.entry??row.id,licenses:licensePaths.map(p=>licenseRoot+p),reviewRequired:true,note:"Source may be a shared page, entry point or upstream template. Verify exact dependencies, notices, permissions and source before use. Never execute fetched code automatically."};
}
