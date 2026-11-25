import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";
const cli=fileURLToPath(new URL("../scripts/activation.mjs",import.meta.url));
test("explicit project roots isolate local preferences; no writes",()=>{const root=fs.mkdtempSync(path.join(os.tmpdir(),"uiux-activation-"));try{
 const a=path.join(root,"a"),b=path.join(root,"b"),g=path.join(root,"global.json"),task=path.join(root,"task.json");
 fs.mkdirSync(path.join(a,".uiux"),{recursive:true});fs.mkdirSync(b);fs.writeFileSync(g,JSON.stringify({preferences:{style:"minimal"}}));fs.writeFileSync(path.join(a,".uiux","preferences.json"),JSON.stringify({preferences:{style:"technical"}}));fs.writeFileSync(task,JSON.stringify({relevance:"direct"}));
 function run(r){const x=spawnSync(process.execPath,[cli,"plan",task,"--project-root",r,"--global-file",g],{encoding:"utf8"});assert.equal(x.status,0,x.stderr);return JSON.parse(x.stdout)}
 assert.equal(run(a).settings.preferences.style,"technical");assert.equal(run(b).settings.preferences.style,"minimal");assert.deepEqual(fs.readdirSync(b),[]);
}finally{fs.rmSync(root,{recursive:true,force:true})}});
