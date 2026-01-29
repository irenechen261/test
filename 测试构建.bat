@echo off
chcp 65001 >nul
echo ================================
echo 测试项目构建
echo ================================
echo.

echo [1/3] 检查依赖是否已安装...
if not exist "node_modules\" (
    echo 依赖未安装，正在安装...
    npm install
    echo.
)

echo [2/3] 清理之前的构建...
if exist ".next\" (
    rmdir /s /q ".next"
)
echo.

echo [3/3] 开始构建项目...
echo 这可能需要1-2分钟...
echo.

npm run build

if %errorlevel% neq 0 (
    echo.
    echo ❌ 构建失败！请检查错误信息
    pause
    exit /b 1
)

echo.
echo ================================
echo ✅ 构建成功！
echo.
echo 项目已准备好部署到 Vercel
echo ================================
echo.

pause
