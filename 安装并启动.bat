@echo off
chcp 65001 >nul
echo ================================
echo 费用Dashboard - 安装和启动脚本
echo ================================
echo.

echo [1/4] 检查Node.js和npm版本...
node --version
npm --version
echo.

echo [2/4] 安装项目依赖包（首次运行需要几分钟）...
npm install
if %errorlevel% neq 0 (
    echo.
    echo ❌ 安装失败！请检查网络连接
    pause
    exit /b 1
)
echo.

echo [3/4] 构建项目...
npm run build
if %errorlevel% neq 0 (
    echo.
    echo ⚠️ 构建失败，但仍可以使用开发模式
)
echo.

echo [4/4] 启动开发服务器...
echo.
echo ================================
echo ✅ 安装完成！
echo 正在启动开发服务器...
echo 启动后请在浏览器访问: http://localhost:3000
echo 按 Ctrl+C 可以停止服务器
echo ================================
echo.

npm run dev
