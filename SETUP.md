# 项目设置指南

项目文件已经全部创建完成！由于系统中缺少必要的开发工具，请按照以下步骤完成设置。

## 需要安装的工具

### 1. 安装 Node.js

1. 访问 [https://nodejs.org/](https://nodejs.org/)
2. 下载并安装 LTS 版本（推荐 18.x 或更高版本）
3. 安装完成后，打开新的命令行窗口验证：
   ```bash
   node --version
   npm --version
   ```

### 2. 安装 Git

1. 访问 [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. 下载并安装 Git for Windows
3. 安装完成后，打开新的命令行窗口验证：
   ```bash
   git --version
   ```

## 项目启动步骤

安装好 Node.js 和 Git 后，在项目目录下执行：

### 1. 安装依赖

```bash
cd D:\cursor\expense-dashboard
npm install
```

这会安装所有必需的依赖包（Next.js, React, Recharts, PapaParse, Tailwind CSS等）。

### 2. 启动开发服务器

```bash
npm run dev
```

启动后访问 [http://localhost:3000](http://localhost:3000) 查看Dashboard。

### 3. 测试构建

```bash
npm run build
```

确保项目可以成功构建。

## 推送到 GitHub

### 1. 初始化 Git 仓库

```bash
git init
git add .
git commit -m "Initial commit: 费用Dashboard项目"
```

### 2. 创建 GitHub 仓库

1. 访问 [https://github.com/new](https://github.com/new)
2. 创建新仓库，名称如：`expense-dashboard`
3. **不要**勾选 "Initialize this repository with a README"

### 3. 推送代码

```bash
git remote add origin https://github.com/YOUR_USERNAME/expense-dashboard.git
git branch -M main
git push -u origin main
```

记得将 `YOUR_USERNAME` 替换为你的 GitHub 用户名。

## 部署到 Vercel

### 1. 注册 Vercel 账号

访问 [https://vercel.com/signup](https://vercel.com/signup) 注册账号（可以使用 GitHub 账号登录）。

### 2. 导入项目

1. 登录 Vercel 后，点击 "Add New Project"
2. 选择 "Import Git Repository"
3. 连接你的 GitHub 账号并选择 `expense-dashboard` 仓库
4. Vercel 会自动检测 Next.js 项目

### 3. 配置和部署

1. 项目名称：`expense-dashboard`（或自定义）
2. Framework Preset: 自动检测为 "Next.js"
3. 保持默认设置，点击 "Deploy"

### 4. 获取 URL

部署完成后，Vercel 会提供一个生产环境 URL，类似：
```
https://expense-dashboard-xxxx.vercel.app
```

## 项目文件说明

- `app/page.tsx` - Dashboard主页面
- `components/` - 所有React组件
- `lib/dataProcessor.ts` - 数据处理逻辑
- `public/data/21051109.csv` - 数据文件
- `package.json` - 项目依赖配置

## 常见问题

### Q: npm install 失败？
A: 确保 Node.js 版本 >= 18.x，并且网络连接正常。可以尝试使用国内镜像：
```bash
npm config set registry https://registry.npmmirror.com
```

### Q: 本地运行看不到数据？
A: 检查 `public/data/21051109.csv` 文件是否存在。

### Q: Vercel 部署失败？
A: 检查 GitHub 仓库是否包含所有文件，特别是 `package.json` 和数据文件。

## 下一步

1. 安装 Node.js 和 Git
2. 运行 `npm install`
3. 运行 `npm run dev` 查看效果
4. 推送到 GitHub
5. 部署到 Vercel

祝你使用愉快！
