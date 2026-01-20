# 更新日志

所有重要的项目更改都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.0.0] - 2024-01-20

### 🎉 首次发布

初始版本发布，包含以下功能：

#### ✨ 新增功能

- **博客系统**
  - 文章管理（Articles）
  - 教程系统（Tutorials）支持多级目录
  - 日常随笔（Diary）
  - 留言板功能
  - 友链页面

- **用户界面**
  - 响应式设计，完美适配移动端
  - 亮色/暗色主题自动切换
  - 精美的首页 Banner 设计
  - 几何背景装饰
  - Magic Card 交互效果
  - 个人信息浮窗组件
  - 音乐播放器组件

- **功能特性**
  - Markdown/MDX 内容支持
  - 代码高亮（支持亮色/暗色主题）
  - 文章目录（TOC）自动生成
  - 面包屑导航
  - SEO 优化（Meta 标签、Sitemap、RSS）
  - Waline 评论系统集成
  - Algolia 搜索支持（可选）
  - GitHub 统计徽章

- **开发体验**
  - 基于 Astro 5.16.9
  - TypeScript 支持
  - 热更新开发服务器
  - 快速的构建速度
  - 清晰的项目结构

#### 📦 包含组件

- BaseHead - 页面头部组件
- Header - 导航栏组件
- Footer - 页脚组件
- TableOfContents - 目录组件
- WalineComments - 评论组件
- FormattedDate - 日期格式化组件
- Breadcrumb - 面包屑导航
- BackButton - 返回按钮

#### 📚 文档

- README.md - 项目介绍
- USAGE.md - 详细使用指南
- CONTRIBUTING.md - 贡献指南
- LICENSE - MIT 许可证

#### 🎨 主题

- 支持 CSS 变量自定义
- 亮色/暗色模式
- 渐变色设计
- 流畅的过渡动画

---

## 版本说明

- **Major** (主版本号): 不兼容的 API 修改
- **Minor** (次版本号): 向下兼容的功能性新增
- **Patch** (修订号): 向下兼容的问题修正

## 如何更新

### 从旧版本升级

```bash
# 备份您的内容和配置
cp -r src/content src/content.backup
cp src/consts.ts src/consts.ts.backup

# 拉取最新代码
git pull origin main

# 安装依赖
npm install

# 恢复您的内容和配置
# 手动合并配置文件中的更改
```

### 查看变更详情

访问 [Releases](https://github.com/YiXuanHQ/Blog-Template-Astro/releases) 页面查看每个版本的详细变更。

---

**注意**: 升级前请仔细阅读变更日志，确保了解所有破坏性更改。

