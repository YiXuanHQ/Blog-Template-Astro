# 🚀 Astro 博客模板

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5.16.9-FF5D01?logo=astro)](https://astro.build)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

[English](README.md) | 简体中文

一个功能完善、设计精美的现代化博客模板，基于 Astro 框架构建。

[在线演示](#) | [快速开始](QUICKSTART.md) | [使用文档](USAGE.md) | [配置清单](SETUP_CHECKLIST.md)

</div>

---

## 🖼️ 预览

| 首页 | 教程中心 |
| --- | --- |
| ![首页](src/assets/首页.png) | ![教程中心](src/assets/教程中心.png) |

| 技术文章 | 日常随笔 |
| --- | --- |
| ![技术文章](src/assets/技术文章.png) | ![日常随笔](src/assets/日常随笔.png) |

| 留言板 | 关于 |
| --- | --- |
| ![留言板](src/assets/留言板.png) | ![关于](src/assets/关于.png) |

---

## ✨ 特性一览

<table>
<tr>
<td width="50%">

### 🎨 精美设计
- 现代化的 UI 设计
- 亮色/暗色主题自动切换
- 完美的响应式布局
- 流畅的动画效果

### ⚡ 极速性能
- 基于 Astro 静态生成
- 优秀的 Lighthouse 评分
- 快速的页面加载
- SEO 友好

</td>
<td width="50%">

### 📝 内容管理
- Markdown/MDX 支持
- 代码语法高亮
- 自动生成目录
- 多种内容类型

### 🔧 功能完善
- 评论系统集成
- 搜索功能支持
- RSS 订阅
- 音乐播放器

</td>
</tr>
</table>

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/YiXuanHQ/Blog-Template-Astro.git

# 进入目录
cd your-repo

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:4321 查看效果！

详细步骤请查看 [快速开始指南](QUICKSTART.md)。

## 📦 技术栈

| 技术 | 说明 | 版本 |
|------|------|------|
| [Astro](https://astro.build) | 静态站点生成器 | 5.16.9 |
| [TypeScript](https://www.typescriptlang.org) | 类型安全 | - |
| [Waline](https://waline.js.org) | 评论系统 | 3.8.0 |
| CSS3 | 样式设计 | - |

## 📁 项目结构

```
├── public/              # 静态资源
│   ├── avatar.png       # 头像
│   ├── favicon.svg      # 网站图标
│   └── music/           # 音乐文件
├── src/
│   ├── components/      # 组件
│   ├── content/         # 内容文件
│   │   ├── articles/    # 文章
│   │   ├── tutorials/   # 教程
│   │   └── diary/       # 随笔
│   ├── layouts/         # 布局
│   ├── pages/           # 页面
│   ├── styles/          # 样式
│   └── consts.ts        # 配置
├── astro.config.mjs     # Astro 配置
└── package.json         # 项目配置
```

## ⚙️ 配置

### 基本配置

1. **修改站点信息**

编辑 `src/consts.ts`：
```typescript
export const SITE_TITLE = '您的博客标题';
export const SITE_DESCRIPTION = '您的博客描述';
```

2. **修改域名**

编辑 `astro.config.mjs`：
```javascript
site: 'https://your-domain.com'
```

3. **替换个人信息**

在 `src/pages/index.astro` 和 `src/pages/about.astro` 中：
- 替换 `your-username` 为您的 GitHub 用户名
- 替换 `your-email@example.com` 为您的邮箱

完整配置请查看 [配置清单](SETUP_CHECKLIST.md)。

## 📝 内容管理

### 创建文章

在 `src/content/articles/` 目录下创建 `.md` 文件：

```markdown
---
title: '文章标题'
description: '文章描述'
pubDate: 2024-01-20
heroImage: '/blog-placeholder.jpg'
---

文章内容...
```

### 创建教程

在 `src/content/tutorials/` 目录下创建多级目录结构：

```
tutorials/
└── 教程名称/
    ├── README.md
    ├── 第1章/
    └── 第2章/
```

详细说明请查看 [使用文档](USAGE.md)。

## 🎨 主题定制

### 修改颜色

编辑 `src/styles/global.css`：

```css
:root {
  --color-primary: #5d67e8;
  --color-text: #2c3e50;
  --color-bg: #ffffff;
}
```

### 暗色主题

```css
[data-theme="dark"] {
  --color-text: #ffffff;
  --color-bg: #1a1a1a;
}
```

## 🔧 功能配置

### 评论系统

1. 部署 [Waline](https://waline.js.org) 服务端
2. 在 `src/consts.ts` 中配置服务器地址

### 搜索功能

1. 注册 [Algolia](https://www.algolia.com) 账号
2. 在 `src/consts.ts` 中配置 Algolia 信息

详细配置请查看 [使用文档](USAGE.md#功能配置)。

## 🚀 部署

### Vercel（推荐）

1. 推送代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 一键部署

### 其他平台

- [Netlify 部署指南](USAGE.md#netlify-部署)
- [GitHub Pages 部署指南](USAGE.md#github-pages-部署)

## 📚 文档

| 文档 | 说明 |
|------|------|
| [快速开始](QUICKSTART.md) | 5 分钟上手指南 |
| [使用文档](USAGE.md) | 详细使用说明 |
| [配置清单](SETUP_CHECKLIST.md) | 配置检查清单 |
| [贡献指南](CONTRIBUTING.md) | 如何贡献代码 |
| [更新日志](CHANGELOG.md) | 版本更新记录 |

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

查看 [贡献指南](CONTRIBUTING.md) 了解详情。

## 📄 开源协议

本项目采用 [MIT](LICENSE) 协议开源。

## 💖 鸣谢

- [Astro](https://astro.build) - 强大的静态站点生成器
- [Waline](https://waline.js.org) - 简洁的评论系统
- 所有贡献者和使用者

## 🌟 Star History

如果这个项目对您有帮助，欢迎给一个 ⭐ Star！

## 📞 联系方式

- 提交 [Issue](https://github.com/YiXuanHQ/Blog-Template-Astro/issues)
- 参与 [Discussions](https://github.com/YiXuanHQ/Blog-Template-Astro/discussions)
- 邮件：byyi.xuan@outlook.com

---

<div align="center">

**[⬆ 回到顶部](#-astro-博客模板)**

Made with ❤️ by [YiXuan](https://github.com/YiXuanHQ)

</div>

