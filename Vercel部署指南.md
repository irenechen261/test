# Vercel 部署指南

## 前提条件
✅ 代码已推送到 GitHub: https://github.com/irenechen261/expense

---

## 部署步骤

### 第1步：访问 Vercel

打开浏览器，访问：
```
https://vercel.com
```

### 第2步：注册/登录

点击右上角 **"Sign Up"** 或 **"Login"**

推荐使用 **GitHub 账号登录**（这样可以直接访问您的仓库）

### 第3步：导入项目

1. 登录后，点击 **"Add New..."** 按钮
2. 选择 **"Project"**
3. 在 "Import Git Repository" 页面，找到 **irenechen261/expense** 仓库
4. 点击 **"Import"**

### 第4步：配置项目（使用默认设置即可）

Vercel 会自动检测到这是一个 Next.js 项目：

- **Framework Preset**: Next.js ✅（自动检测）
- **Root Directory**: ./ ✅（保持默认）
- **Build Command**: `npm run build` ✅（自动）
- **Output Directory**: .next ✅（自动）
- **Install Command**: `npm install` ✅（自动）

**不需要修改任何配置**，直接点击底部的 **"Deploy"** 按钮！

### 第5步：等待部署

部署过程大约需要 2-3 分钟：

1. 📦 Installing dependencies...
2. 🔨 Building...
3. 🚀 Deploying...
4. ✅ Success!

### 第6步：获取URL

部署完成后，您会看到：

```
🎉 Congratulations!

Your project has been successfully deployed.

https://expense-xxxx.vercel.app
```

点击这个链接，就能访问您的费用Dashboard了！

---

## 🎯 部署后的URL

Vercel 会为您提供：
- **生产环境**: `https://expense-xxxx.vercel.app`
- **预览环境**: 每次推送新代码都会生成预览URL

---

## 🔄 后续更新

以后如果要更新Dashboard：

1. 修改本地代码
2. 推送到GitHub：
   ```bash
   git add .
   git commit -m "更新说明"
   git push
   ```
3. Vercel 会**自动部署**新版本！

---

## ⚙️ 自定义域名（可选）

如果您有自己的域名：

1. 在 Vercel 项目设置中
2. 点击 **"Domains"**
3. 添加您的域名
4. 按照提示配置 DNS

---

## 📊 Vercel 提供的功能

- ✅ 自动部署（每次 push 自动更新）
- ✅ 预览链接（每个 PR 都有独立预览）
- ✅ 性能分析
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS
- ✅ 零配置

---

## 🐛 常见问题

### Q: 部署失败？
A: 检查 GitHub 仓库是否包含所有文件，特别是：
   - package.json
   - next.config.js
   - public/data/21051109.csv

### Q: 页面显示 404？
A: 确保 CSV 数据文件在 `public/data/` 目录下

### Q: 构建超时？
A: 检查依赖是否正确，可以在本地先运行 `npm run build` 测试

### Q: 如何查看部署日志？
A: 在 Vercel 项目页面，点击对应的部署记录查看详细日志

---

## 📞 需要帮助？

- Vercel 文档: https://vercel.com/docs
- Next.js 文档: https://nextjs.org/docs

---

祝您部署顺利！🎉
