@echo off
chcp 65001 >nul
echo ================================
echo 费用Dashboard - 快速启动
echo ================================
echo.
echo 正在启动开发服务器...
echo 启动后请在浏览器访问: http://localhost:3000
echo 按 Ctrl+C 可以停止服务器
echo.

cd /d "%~dp0"
npm run dev

pause
