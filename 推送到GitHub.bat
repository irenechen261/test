@echo off
chcp 65001 >nul
echo ================================
echo 推送到 GitHub
echo ================================
echo.

echo [1/5] 检查 Git 版本...
git --version
if %errorlevel% neq 0 (
    echo ❌ Git 未安装或未找到
    pause
    exit /b 1
)
echo.

echo [2/5] 初始化 Git 仓库...
git init
echo.

echo [3/5] 添加所有文件...
git add .
echo.

echo [4/5] 创建首次提交...
git commit -m "Initial commit: 费用Dashboard项目"
echo.

echo [5/5] 推送到 GitHub...
echo 正在连接到远程仓库...
git remote add origin https://github.com/irenechen261/expense.git
git branch -M main
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ⚠️ 推送可能失败，这可能是因为：
    echo 1. 远程仓库已有内容
    echo 2. 需要输入 GitHub 用户名和密码/token
    echo.
    echo 尝试强制推送...
    git push -u origin main --force
)

echo.
echo ================================
echo ✅ 推送完成！
echo.
echo 仓库地址: https://github.com/irenechen261/expense
echo.
echo 下一步：部署到 Vercel
echo ================================
echo.

pause
