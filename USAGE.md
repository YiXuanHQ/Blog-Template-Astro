# 📘 使用指南

本文档详细介绍如何使用和自定义这个博客模板。

## 🎯 目录

- [快速开始](#快速开始)
- [个性化配置](#个性化配置)
- [内容管理](#内容管理)
- [主题定制](#主题定制)
- [功能配置](#功能配置)
- [部署上线](#部署上线)
- [常见问题](#常见问题)

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/YiXuanHQ/Blog-Template-Astro.git
cd your-repo
```

### 2. 安装依赖

```bash
npm install
# 或使用 pnpm（推荐）
pnpm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:4321 查看效果。

## ⚙️ 个性化配置

### 基本信息配置

#### 1. 网站标题和描述

编辑 `src/consts.ts`：

```typescript
export const SITE_TITLE = '您的博客标题';
export const SITE_DESCRIPTION = '您的博客描述';
```

#### 2. 站点域名

编辑 `astro.config.mjs`：

```javascript
export default defineConfig({
  site: 'https://your-domain.com',  // 修改为您的域名
  // ...
});
```

#### 3. 项目名称

编辑 `package.json`：

```json
{
  "name": "your-blog-name",
  "version": "1.0.0"
}
```

### 个人信息配置

#### 1. 修改首页信息

编辑 `src/pages/index.astro`，搜索并替换以下内容：

- `我的博客` → 您的博客标题
- `your-username` → 您的 GitHub 用户名
- `your-repo` → 您的仓库名
- `your-email@example.com` → 您的邮箱

#### 2. 修改关于页面

编辑 `src/pages/about.astro`，自定义：

- 个人简介
- 技能标签
- 联系方式
- 项目经历
- 个性签名

### 图片资源替换

替换 `public/` 目录下的图片：

```
public/
├── avatar.png          # 头像（建议 200x200）
├── favicon.svg         # 网站图标
├── logo.png            # Logo
├── xiaohongshu.jpg     # 社交平台二维码
└── zhifubao.jpg        # 赞赏码
```

## 📝 内容管理

### 创建文章

在 `src/content/articles/` 目录创建 `.md` 文件：

```markdown
---
title: '文章标题'
description: '文章简介'
pubDate: 2024-01-20
heroImage: '/blog-placeholder.jpg'
---

文章正文内容...

## 章节标题

内容...
```

### 创建教程

教程支持多级目录结构，在 `src/content/tutorials/` 下创建：

```
tutorials/
└── 教程名称/
    ├── README.md              # 教程首页
    ├── 第1章/
    │   ├── 1.1 节.md
    │   └── 1.2 节.md
    └── 第2章/
        └── 2.1 节.md
```

教程首页模板（`README.md`）：

```markdown
---
title: '教程标题'
description: '教程简介'
---

# 教程标题

教程介绍...

## 目录

- 第1章
  - 1.1 节
  - 1.2 节
- 第2章
  - 2.1 节
```

### 创建随笔

在 `src/content/diary/` 目录下创建 `.md` 文件或编辑 `README.md`。

## 🎨 主题定制

### 修改主题颜色

编辑 `src/styles/global.css`：

```css
:root {
  /* 主色调 */
  --color-primary: #5d67e8;
  --color-primary-dark: #4a54d1;
  
  /* 文字颜色 */
  --color-text: #2c3e50;
  --color-muted: #6c757d;
  
  /* 背景颜色 */
  --color-surface: #ffffff;
  --color-bg: #f8f9fa;
  
  /* 其他颜色... */
}
```

### 暗色主题

暗色主题会自动根据系统设置切换。自定义暗色主题颜色：

```css
[data-theme="dark"] {
  --color-text: #ffffff;
  --color-bg: #1a1a1a;
  --color-surface: #2d2d2d;
  /* ...更多变量 */
}
```

### 自定义字体

在 `src/styles/global.css` 中修改：

```css
body {
  font-family: '您的字体', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

如需使用自定义字体文件，将字体文件放到 `public/fonts/` 并引入：

```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/yourfont.woff2') format('woff2');
}
```

## 🔧 功能配置

### 评论系统（Waline）

#### 1. 部署 Waline 服务端

参考 [Waline 官方文档](https://waline.js.org/guide/get-started.html) 部署服务端。

推荐使用 Vercel 一键部署：

1. 访问 https://vercel.com/new/clone?repository-url=https://github.com/walinejs/waline/tree/main/example
2. 绑定 GitHub 账号并导入
3. 配置环境变量（数据库等）
4. 完成部署

#### 2. 配置客户端

编辑 `src/consts.ts`：

```typescript
export const WALINE_SERVER_URL = 'https://your-waline-server.vercel.app';
```

### 搜索功能（Algolia）

#### 1. 注册 Algolia

1. 访问 https://www.algolia.com/ 注册账号
2. 创建应用和索引
3. 获取 App ID 和 API Key

#### 2. 配置搜索

编辑 `src/consts.ts`：

```typescript
export const algolia = {
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_SEARCH_API_KEY',
  indices: ['your_index_name'],
  debug: false,
  // ...其他配置
};
```

#### 3. 上传内容到 Algolia

使用 Algolia CLI 或 API 将内容上传到索引。

### 音乐播放器

替换音乐文件：

1. 将音乐文件放到 `public/music/` 目录
2. 编辑 `src/pages/about.astro`，找到 `playlist` 数组：

```javascript
const playlist = [
  { src: '/music/song1.mp3', title: '歌曲1' },
  { src: '/music/song2.mp3', title: '歌曲2' },
];
```

## 🚀 部署上线

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 访问 https://vercel.com
3. 点击 "Import Project"
4. 选择您的 GitHub 仓库
5. Vercel 会自动识别 Astro 项目并完成配置
6. 点击 "Deploy" 开始部署

部署后，Vercel 会提供一个域名，您也可以绑定自己的域名。

### Netlify 部署

1. 将代码推送到 GitHub
2. 访问 https://netlify.com
3. 点击 "Add new site" → "Import an existing project"
4. 选择您的 GitHub 仓库
5. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 点击 "Deploy site"

### GitHub Pages 部署

1. 修改 `astro.config.mjs`：

```javascript
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name',  // 如果部署到子路径
});
```

2. 创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. 推送代码到 GitHub，Actions 会自动构建和部署

### 自定义服务器部署

```bash
# 构建项目
npm run build

# dist 目录包含所有静态文件，上传到您的服务器
# 配置 Nginx 或 Apache 指向 dist 目录
```

## ❓ 常见问题

### 1. 如何修改导航菜单？

编辑 `src/components/Header.astro`，找到导航链接部分并修改。

### 2. 如何添加新的页面？

在 `src/pages/` 目录下创建新的 `.astro` 文件，文件名即为路由路径。

### 3. 如何禁用评论功能？

将 `src/consts.ts` 中的 `WALINE_SERVER_URL` 设置为空字符串：

```typescript
export const WALINE_SERVER_URL = '';
```

### 4. 图片加载慢怎么办？

建议使用图床服务（如 CDN）托管图片，或者优化图片大小。

### 5. 如何添加 Google Analytics？

在 `src/components/BaseHead.astro` 的 `<head>` 标签中添加 GA 代码。

### 6. 构建出错怎么办？

检查：
- Node.js 版本是否 >= 18
- 依赖是否正确安装
- 查看终端错误信息
- 清除缓存：`rm -rf node_modules .astro && npm install`

### 7. 如何更新模板？

```bash
# 添加原始模板为上游仓库
git remote add template https://github.com/YiXuanHQ/Blog-Template-Astro.git

# 拉取更新
git fetch template
git merge template/main

# 解决冲突后提交
```

## 📚 更多资源

- [Astro 官方文档](https://docs.astro.build)
- [Markdown 语法指南](https://www.markdownguide.org)
- [Waline 文档](https://waline.js.org)
- [Algolia 文档](https://www.algolia.com/doc/)

## 💬 获取帮助

- 提交 [Issue](https://github.com/YiXuanHQ/Blog-Template-Astro/issues)
- 查看 [Discussions](https://github.com/YiXuanHQ/Blog-Template-Astro/discussions)
- 发送邮件至：your-email@example.com

---

**祝您使用愉快！如有问题欢迎随时反馈。** 🎉

