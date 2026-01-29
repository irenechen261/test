# 在Cursor中预览Dashboard

## 方法1：使用Cursor内置浏览器（推荐）

### 步骤：

1. **先启动开发服务器**
   - 在外部PowerShell或双击运行 `安装并启动.bat`
   - 等待看到 "Ready" 提示

2. **在Cursor中打开预览**
   - 按 `Ctrl + Shift + P` 打开命令面板
   - 输入：`Simple Browser: Show`
   - 在弹出的输入框中输入：`http://localhost:3000`
   - 按回车

3. **查看效果**
   - Dashboard会在Cursor右侧显示
   - 可以直接在IDE中交互和查看

---

## 方法2：分屏查看（推荐用于开发）

1. **启动服务器**（同上）

2. **在Cursor中**：
   - 按 `Ctrl + Shift + P`
   - 输入：`View: Split Editor Right`
   - 在右侧编辑器中按 `Ctrl + Shift + P`
   - 输入：`Simple Browser: Show`
   - 输入 URL：`http://localhost:3000`

3. **优势**：
   - 左边编辑代码
   - 右边实时预览
   - 修改代码后自动刷新

---

## 方法3：使用外部浏览器但保持在IDE中工作

1. 启动服务器后，在浏览器中打开 Dashboard
2. 使用 `Alt + Tab` 在浏览器和Cursor之间切换
3. 开发模式会自动热更新，无需手动刷新

---

## 快速启动脚本

如果还没有安装依赖，请先在项目目录下运行：
- 双击 `安装并启动.bat`
- 或在外部PowerShell中：`npm install && npm run dev`

---

## 注意事项

⚠️ **重要**：Cursor的内置终端可能还没有识别Node.js，所以：
- 第一次必须在**外部PowerShell**或使用**批处理文件**启动服务器
- 服务器启动后，可以在Cursor中预览
- 或者**重启Cursor IDE**后，终端就能识别npm命令了

---

## 预览效果

Dashboard将显示：
- 📊 账龄柱状图（四个颜色区分的柱子）
- 🥧 账龄占比饼图
- 💳 五个统计卡片（渐变色背景）
- 🔍 供应商筛选下拉框
- 📋 明细数据表格（支持排序和分页）

所有图表都可以交互，鼠标悬停会显示详细数据！
