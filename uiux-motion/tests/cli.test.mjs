import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
const cli=fileURLToPath(new URL("../scripts/motion.mjs",import.meta.url));
test("initialize, scan, add, report and preserve state",()=>{const root=fs.mkdtempSync(path.join(os.tmpdir(),"uiux-motion-"));try{
const run=(...args)=>{const x=spawnSync(process.execPath,[cli,...args],{cwd:root,encoding:"utf8"});assert.equal(x.status,0,x.stderr);return JSON.parse(x.stdout)};
run("init");fs.writeFileSync(path.join(root,"app.tsx"),"<button onClick={toggle}>Open</button>");
assert.equal(run("scan").candidates.length,1);
fs.writeFileSync(path.join(root,"item.json"),JSON.stringify({id:"open",component:"Button",interaction:"open",context:"home",sourceFiles:["app.tsx"]}));
run("add","item.json");run("init");assert.equal(run("report").discovered,1);
}finally{fs.rmSync(root,{recursive:true,force:true})}});
