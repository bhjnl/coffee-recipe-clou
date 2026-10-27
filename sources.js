// 外部数据源需先核对 API、许可、署名要求和站点规则。
const examples=[{id:"example-pourover-001",title:"示例：15 g / 1:16 平底滤杯起始配方",source:"本服务示例数据（非外部来源）",verifiedExternalSource:false,doseGrams:15,waterGrams:240,ratio:"1:16",temperatureC:93,note:"仅用于测试接口，不代表特定咖啡豆推荐。"}];
export function searchPublicRecipes(query=""){const q=query.toLowerCase();return examples.filter(x=>!q||`${x.title} ${x.source} ${x.note}`.toLowerCase().includes(q));}
