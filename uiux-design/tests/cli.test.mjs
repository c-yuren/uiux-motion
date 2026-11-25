import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
const cli=fileURLToPath(new URL("../scripts/uiux.mjs",import.meta.url));
test("CLI init, scan, catalog and migration",()=>{const root=fs.mkdtempSync(path.join(os.tmpdir(),"uiux-design-"));try{
const run=(...args)=>{const x=spawnSync(process.execPath,[cli,...args],{cwd:root,encoding:"utf8"});assert.equal(x.status,0,x.stderr);return JSON.parse(x.stdout)};
run("init");fs.writeFileSync(path.join(root,"app.tsx"),"<button onClick={toggle}>Open</button>");
assert.equal(run("scan").candidates.length,1);assert.ok(run("templates","information").templates.length);
fs.mkdirSync(path.join(root,".motion"));const legacy=JSON.stringify({schemaVersion:1,revision:2,items:[{id:"a",component:"Button",context:"home",interaction:"click"}]});fs.writeFileSync(path.join(root,".motion","registry.json"),legacy);
run("migrate","0");run("init");assert.equal(run("report").checks,1);assert.equal(fs.readFileSync(path.join(root,".motion","registry.json"),"utf8"),legacy);
}finally{fs.rmSync(root,{recursive:true,force:true})}});
