# 咖啡豆图鉴 · 智能冲煮云端 API

这是不含蓝牙、不控制咖啡机的 Node.js/Express API 起始项目。

## 接口
- `GET /health`：健康检查
- `POST /api/recipe`：规则版起始配方生成
- `GET /api/sources`：数据来源配置状态
- `GET /api/recipes/search?q=关键词`：本地示例配方搜索

## 当前尚未实现
- 未接入真实 AI 模型
- 未连接外部公开配方网站/API
- 未配置数据库或冲煮历史持久化
- 示例配方不是经外部来源核实的推荐配方

## 运行
需要 Node.js 18.17+。
```bash
npm install
npm test
npm start
```
测试地址：`http://localhost:10000/health`

## 配方请求示例
向 `/api/recipe` 发送 JSON：
```json
{
  "beanName": "危地马拉拉米尼塔斯花神",
  "origin": "危地马拉",
  "process": "水洗",
  "roastLevel": "浅烘焙",
  "brewer": "蛋糕杯平底滤杯",
  "doseGrams": 15,
  "ratio": 16,
  "targetFlavor": ["花香", "甜感"],
  "waterHardness": 50,
  "waterAlkalinity": 30
}
```

## Render 部署
1. 将这些文件放入 GitHub 仓库根目录。
2. 在 Render 选择 New → Web Service，连接仓库。
3. Build Command：`npm install`；Start Command：`npm start`。
4. Health Check Path：`/health`。
5. 部署后访问服务域名加 `/health`。

## 安全与数据许可
不要把 AI API Key、密码或 `.env` 上传到 GitHub。AI 密钥应放在 Render 的 Environment 中。生产环境应将 `ALLOWED_ORIGINS` 改为图鉴实际域名。接入外部数据前，先确认来源许可、署名要求和网站规则。
