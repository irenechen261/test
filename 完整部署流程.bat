@echo off
chcp 65001 >nul
echo ================================
echo 完整部署流程
echo 1. 安装依赖
echo 2. 测试构建
echo 3. 推送到 GitHub
echo ================================
echo.

echo [步骤 1/3] 安装依赖...
echo.
if not exist "node_modules\" (
    echo 正在安装依赖包...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
) else (
    echo ✅ 依赖已存在
)
echo.

echo [步骤 2/3] 测试构建...
echo.
npm run build
if %errorlevel% neq 0 (
    echo ❌ 构建失败！请检查错误
    pause
    exit /b 1
)
echo ✅ 构建成功！
echo.

echo [步骤 3/3] 推送到 GitHub...
echo.

echo 初始化 Git 仓库...
git init

echo 添加所有文件...
git add .

echo 创建提交...
git commit -m "Initial commit: 费用Dashboard项目"

echo 添加远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/irenechen261/expense.git

echo 推送到 GitHub...
git branch -M main
git push -u origin main --force

if %errorlevel% neq 0 (
    echo.
    echo ⚠️ 推送可能需要身份验证
    echo 请在弹出的窗口中输入 GitHub 用户名和密码
    echo.
    pause
    exit /b 1
)

echo.
echo ================================
echo ✅ 全部完成！
echo.
echo ✓ 依赖已安装
echo ✓ 构建测试通过
echo ✓ 代码已推送到 GitHub
echo.
echo GitHub 仓库: https://github.com/irenechen261/expense
echo.
echo 下一步：部署到 Vercel
echo 1. 访问 https://vercel.com
echo 2. 使用 GitHub 登录
echo 3. 导入 expense 仓库
echo 4. 点击 Deploy
echo.
echo ================================
pause
