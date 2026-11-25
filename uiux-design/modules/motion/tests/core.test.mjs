import test from "node:test";
import assert from "node:assert/strict";
import {addItem,patchItem,invalidate,summarize} from "../scripts/core.mjs";
const empty={schemaVersion:1,revision:0,items:[],unknownScope:[]};
const item={id:"drawer",component:"Drawer",interaction:"toggle",context:"home",sourceFiles:["src/drawer.tsx"],dependencies:["src/tokens.ts"]};
test("add and duplicate rejection",()=>{const r=addItem(empty,item);assert.equal(r.revision,1);assert.equal(r.items[0].status,"pending");assert.throws(()=>addItem(r,item))});
test("revision lease and verification evidence",()=>{const r=addItem(empty,item);assert.throws(()=>patchItem(r,"drawer",0,{}));assert.throws(()=>patchItem(r,"drawer",1,{status:"verified"}))});
test("incremental dependency invalidation",()=>{const r=addItem(empty,item);assert.equal(invalidate(r,["src/tokens.ts"]).items[0].status,"stale");assert.equal(invalidate(r,["other.ts"]).items[0].status,"pending")});
test("verified evidence and global invalidation",()=>{const r=addItem(empty,item);const evidence=[{path:"evidence/test.json",description:"fixture"}];const gates=Object.fromEntries(["functional","visual","performance","accessibility","regression","interruption"].map(k=>[k,{status:"pass",reason:"fixture",evidence:[evidence[0].path]}]));const verified=patchItem(r,"drawer",1,{status:"verified",decision:"keep",evidence,gates});assert.equal(summarize(verified).recordedAllVerified,true);assert.equal(summarize(invalidate(verified,["*"])).recordedAllVerified,false);assert.equal(summarize(empty).recordedAllVerified,false)});
