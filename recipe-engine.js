const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const round=(n,d=1)=>Number(n.toFixed(d));
export function validateRecipeInput(x){
 const e=[];
 if(x.doseGrams!==undefined&&(!Number.isFinite(Number(x.doseGrams))||Number(x.doseGrams)<5||Number(x.doseGrams)>40))e.push("doseGrams 必须在 5–40 g 之间。");
 if(x.ratio!==undefined&&(!Number.isFinite(Number(x.ratio))||Number(x.ratio)<12||Number(x.ratio)>20))e.push("ratio 必须在 1:12–1:20 之间。");
 if(x.temperatureC!==undefined&&(!Number.isFinite(Number(x.temperatureC))||Number(x.temperatureC)<80||Number(x.temperatureC)>100))e.push("temperatureC 必须在 80–100°C 之间。");
 if(x.targetFlavor&&!Array.isArray(x.targetFlavor)&&typeof x.targetFlavor!=="string")e.push("targetFlavor 应为字符串或字符串数组。");
 return e;
}
export function generateRecipe(x={}){
 const dose=clamp(Number(x.doseGrams??15),5,40), ratio=clamp(Number(x.ratio??16),12,20);
 const roast=String(x.roastLevel||"light").toLowerCase(), process=String(x.process||"").toLowerCase();
 const flavor=Array.isArray(x.targetFlavor)?x.targetFlavor.join("、"):String(x.targetFlavor||"甜感与清晰度平衡");
 let temp=roast.includes("dark")||roast.includes("深")?88:roast.includes("medium")||roast.includes("中")?92:95;
 if(process.includes("natural")||process.includes("日晒"))temp-=1;
 temp=clamp(Number(x.temperatureC??temp),80,100);
 const total=round(dose*ratio);
 const pours=[
  {stage:"闷蒸",waterGrams:round(dose*2),startSecond:0,endSecond:35,instruction:"均匀润湿全部咖啡粉，轻柔注水。"},
  {stage:"第二段",waterGrams:round(total*.40),startSecond:35,endSecond:65,instruction:"由中心向外小圈注水，避免持续冲刷滤纸。"},
  {stage:"第三段",waterGrams:round(total*.35),startSecond:65,endSecond:95,instruction:"保持稳定水柱，按需要控制粉床水位。"},
  {stage:"收尾",waterGrams:0,startSecond:95,endSecond:125,instruction:"轻柔收尾，避免过度扰动粉床。"}
 ];
 pours[3].waterGrams=round(total-pours.slice(0,3).reduce((s,p)=>s+p.waterGrams,0));
 return {title:`${x.beanName||"自定义咖啡豆"} · ${flavor} 起始方案`,bean:{name:x.beanName||"",variety:x.variety||"",origin:x.origin||"",process:x.process||"",roastLevel:x.roastLevel||"浅烘焙"},brewing:{method:x.method||"手冲",brewer:x.brewer||"平底滤杯",filterPaper:x.filterPaper||"按滤杯匹配的滤纸",doseGrams:dose,waterGrams:total,ratio:`1:${ratio}`,temperatureC:temp,grindSize:x.grindSize||"中细至中等；以实际磨豆机刻度校准",water:{hardnessMgL_CaCO3:x.waterHardness??null,alkalinityMgL_CaCO3:x.waterAlkalinity??null,note:"未提供水质数据时，不推断具体水质。"},targetFlavor:flavor,pours,targetTotalTimeSeconds:{min:150,max:210}},reasoning:["这是基于输入条件的规则起始方案，并非该批次咖啡豆的实测最优解。","研磨度、注水方式、滤杯和滤纸共同影响流速，应观察实际排水与杯中风味。","每轮只调整一个主要变量，记录结果后再决定下一步。"],sourceStatus:"规则生成；尚未引用外部配方数据",generatedAt:new Date().toISOString()};
}
