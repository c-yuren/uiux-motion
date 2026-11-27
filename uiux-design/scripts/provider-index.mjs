import fs from "node:fs/promises";
import path from "node:path";
import {execFileSync} from "node:child_process";
import {buildIndex} from "./provider-index-core.mjs";
const inputs=["gallery/works.js","gallery/loaders/originals.mjs","gallery/loaders/motifs.mjs","gallery/fluent-ui/catalog.mjs","gallery/astryx/showcases.mjs","gallery/astryx/variants.mjs","gallery/astryx/experimental/stories.mjs","gallery/astryx/catalog.mjs"];
try{
 const [root,revision]=process.argv.slice(2);if(!root||!/^[0-9a-f]{40}$/.test(revision??""))throw Error("Usage: provider-index.mjs LOCAL_CHECKOUT FULL_COMMIT_SHA");
 const git=(...args)=>execFileSync("git",["-C",path.resolve(root),...args],{encoding:"utf8",maxBuffer:4*1024*1024});
 if(git("rev-parse","HEAD").trim()!==revision)throw Error("Checkout revision mismatch");
 if(git("status","--porcelain","--untracked-files=no").trim())throw Error("Tracked checkout has local modifications");
 const source=Object.fromEntries(inputs.map(p=>[p,git("show",revision+":"+p)]));
 const index=buildIndex(source,revision);console.log(JSON.stringify(index,null,2));
}catch(e){console.error(e.message);process.exitCode=1}
