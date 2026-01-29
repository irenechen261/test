# 费用Dashboard - 一键推送到GitHub脚本
# 使用方法：在此目录下右键 -> "用PowerShell运行"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "推送费用Dashboard到GitHub" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# 设置编码
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# 检查Git是否安装
Write-Host "[1/6] 检查Git版本..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git未安装或未找到" -ForegroundColor Red
    Write-Host "请先安装Git: https://git-scm.com/download/win" -ForegroundColor Red
    pause
    exit 1
}
Write-Host ""

# 切换到脚本所在目录
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# 初始化Git仓库
Write-Host "[2/6] 初始化Git仓库..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✓ Git仓库已存在" -ForegroundColor Green
} else {
    git init
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Git仓库初始化成功" -ForegroundColor Green
    } else {
        Write-Host "✗ Git初始化失败" -ForegroundColor Red
        pause
        exit 1
    }
}
Write-Host ""

# 添加所有文件
Write-Host "[3/6] 添加所有文件到Git..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ 文件添加成功" -ForegroundColor Green
} else {
    Write-Host "✗ 文件添加失败" -ForegroundColor Red
    pause
    exit 1
}
Write-Host ""

# 创建提交
Write-Host "[4/6] 创建Git提交..." -ForegroundColor Yellow
git commit -m "Initial commit: 费用Dashboard项目"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ 提交创建成功" -ForegroundColor Green
} else {
    Write-Host "⚠ 提交失败（可能没有新变化）" -ForegroundColor Yellow
}
Write-Host ""

# 添加远程仓库
Write-Host "[5/6] 配置远程仓库..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/irenechen261/expense.git"

# 检查是否已存在origin
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "远程仓库已存在，正在更新..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
} else {
    git remote add origin $remoteUrl
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ 远程仓库配置成功" -ForegroundColor Green
    Write-Host "  URL: $remoteUrl" -ForegroundColor Gray
} else {
    Write-Host "✗ 远程仓库配置失败" -ForegroundColor Red
    pause
    exit 1
}
Write-Host ""

# 推送到GitHub
Write-Host "[6/6] 推送到GitHub..." -ForegroundColor Yellow
Write-Host "正在推送到 main 分支..." -ForegroundColor Gray

git branch -M main
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    Write-Host "✓ 推送成功！" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "GitHub仓库: https://github.com/irenechen261/expense" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "下一步：部署到Vercel" -ForegroundColor Yellow
    Write-Host "1. 访问 https://vercel.com" -ForegroundColor Gray
    Write-Host "2. 使用GitHub登录" -ForegroundColor Gray
    Write-Host "3. 导入 expense 仓库" -ForegroundColor Gray
    Write-Host "4. 点击Deploy部署" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Red
    Write-Host "✗ 推送失败" -ForegroundColor Red
    Write-Host "================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "可能的原因：" -ForegroundColor Yellow
    Write-Host "1. 需要GitHub身份验证" -ForegroundColor Gray
    Write-Host "2. 网络连接问题" -ForegroundColor Gray
    Write-Host "3. 权限不足" -ForegroundColor Gray
    Write-Host ""
    Write-Host "解决方案：" -ForegroundColor Yellow
    Write-Host "1. 确保已登录GitHub账号" -ForegroundColor Gray
    Write-Host "2. 配置Git凭据：" -ForegroundColor Gray
    Write-Host "   git config --global user.name '您的姓名'" -ForegroundColor Gray
    Write-Host "   git config --global user.email '您的邮箱'" -ForegroundColor Gray
    Write-Host ""
}

Write-Host "按任意键退出..." -ForegroundColor Gray
pause
