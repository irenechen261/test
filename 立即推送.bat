@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ================================
echo 费用Dashboard - 推送到GitHub
echo ================================
echo.

echo [检查] 验证Git安装...
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ 未找到Git命令
    echo.
    echo 请确保Git已正确安装并重启命令行窗口
    echo Git下载: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)
git --version
echo.

echo [1/5] 初始化Git仓库...
if exist ".git\" (
    echo ✓ Git仓库已存在
) else (
    git init
    if %errorlevel% neq 0 (
        echo ✗ Git初始化失败
        pause
        exit /b 1
    )
    echo ✓ Git仓库初始化成功
)
echo.

echo [2/5] 添加所有文件...
git add .
if %errorlevel% neq 0 (
    echo ✗ 添加文件失败
    pause
    exit /b 1
)
echo ✓ 文件添加成功
echo.

echo [3/5] 创建提交...
git commit -m "Initial commit: 费用Dashboard项目"
if %errorlevel% neq 0 (
    echo ⚠ 提交失败（可能没有新变化）
) else (
    echo ✓ 提交创建成功
)
echo.

echo [4/5] 配置远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/irenechen261/expense.git
if %errorlevel% neq 0 (
    echo ✗ 远程仓库配置失败
    pause
    exit /b 1
)
echo ✓ 远程仓库配置成功
echo.

echo [5/5] 推送到GitHub...
echo 正在推送到 main 分支...
git branch -M main
git push -u origin main --force

if %errorlevel% neq 0 (
    echo.
    echo ================================
    echo ⚠ 推送可能失败
    echo ================================
    echo.
    echo 可能的原因：
    echo 1. 需要GitHub身份验证
    echo 2. 网络连接问题
    echo.
    echo 解决方案：
    echo 1. 如果弹出登录窗口，请登录GitHub
    echo 2. 或配置Personal Access Token
    echo.
) else (
    echo.
    echo ================================
    echo ✓ 推送成功！
    echo ================================
    echo.
    echo GitHub仓库: https://github.com/irenechen261/expense
    echo.
    echo 请访问上述链接确认文件已上传
    echo.
    echo 下一步：部署到Vercel
    echo 1. 访问 https://vercel.com
    echo 2. 使用GitHub登录
    echo 3. 导入 expense 仓库
    echo 4. 点击Deploy
    echo.
)

pause
