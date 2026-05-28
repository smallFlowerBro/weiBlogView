# weiBlog - 个人博客系统前端

基于 Vue 3 + Vite 构建的现代化个人博客系统，包含前台展示和后台管理功能。

## ✨ 特性

- 🚀 **快速开发**：基于 Vite 构建，秒级热更新
- 🎨 **现代 UI**：采用 Element Plus 组件库，界面美观简洁
- 📝 **Markdown 支持**：完整的 Markdown 编辑和渲染能力
- 🔐 **权限管理**：前后端分离的 Token 认证机制
- 📱 **响应式设计**：适配多种屏幕尺寸
- 🎯 **双模式开发**：支持 API 模式和 Mock 模式切换
- 📦 **自动导入**：Element Plus 组件和 API 自动按需导入
- 🎭 **代码高亮**：内置 highlight.js 代码语法高亮
- 📊 **数据可视化**：集成 ECharts 图表展示

## 🛠️ 技术栈

### 核心框架
- **Vue 3.5** - 渐进式 JavaScript 框架
- **Vite 8.0** - 下一代前端构建工具
- **Vue Router 5.0** - 官方路由管理器
- **Pinia 3.0** - 轻量级状态管理

### UI 与组件
- **Element Plus 2.13** - Vue 3 组件库
- **Font Awesome 6.0** - 图标库
- **Vue Splide** - 轮播图组件

### Markdown 处理
- **markdown-it 14.x** - Markdown 解析器
- **marked 18.x** - Markdown 转换器
- **md-editor-v3 6.x** - Markdown 编辑器
- **highlight.js 11.x** - 代码高亮

### 工具库
- **Axios 1.15** - HTTP 客户端
- **ECharts 6.0** - 数据可视化
- **js-cookie 3.0** - Cookie 管理
- **uuid 13.0** - UUID 生成

## 📦 安装与运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖
### 开发模式
访问 http://localhost:5173 查看应用

### 生产构建
打包后的文件位于 `dist/` 目录

### 预览生产版本
## 🔧 配置说明

### 环境变量

**开发环境** (`.env.development`)
**生产环境** (`.env.production`)

### API/Mock 模式切换

在 `src/globalConfig.js` 中配置：
- `API` 模式：请求后端真实接口
- `Mock` 模式：使用本地 JSON 数据模拟

### 路径别名

已配置 `@` 指向 `src/` 目录：
## 🎯 功能模块

### 前台展示
- 🏠 首页 - 文章列表和轮播图
- 📖 文章详情 - Markdown 渲染、代码高亮、目录导航
- 📝 全部文章 - 文章检索和分类浏览
- 💭 关于页面 - 个人介绍
- 🌍 旅游历程 - 旅行记录展示
- 💡 想法 - 灵感记录

### 后台管理
- 📊 数据看板 - 统计数据可视化
- ✏️ 文章管理 - CRUD 操作、Markdown 编辑
- 💬 评论管理 - 评论审核和管理
- 🏷️ 分类管理 - 文章分类维护
- 🔖 标签管理 - 文章标签维护
- ⚙️ 系统设置 - 偏好配置
- 👤 用户中心 - 个人信息管理
- 📋 日志管理 - 系统日志查看

## 🚀 部署指南

### Nginx 部署示例

