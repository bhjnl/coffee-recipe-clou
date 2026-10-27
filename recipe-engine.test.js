import test from "node:test";
import assert from "node:assert/strict";
import {generateRecipe,validateRecipeInput} from "../src/recipe-engine.js";
test("default recipe water ratio",()=>{const r=generateRecipe({doseGrams:15,ratio:16});assert.equal(r.brewing.waterGrams,240);assert.equal(r.brewing.pours.reduce((s,p)=>s+p.waterGrams,0),240);});
test("reject invalid dose",()=>assert.ok(validateRecipeInput({doseGrams:0}).length>0));
test("no grinder model/click settings",()=>{const r=generateRecipe({});assert.equal(r.brewing.grinderModel,undefined);assert.equal(r.brewing.grinderClickSetting,undefined);});
