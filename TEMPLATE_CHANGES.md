# 🔄 模板化改动说明

本文档记录了将个人博客转换为开源模板的所有修改。

## 📝 修改的文件

### 配置文件

#### ✅ `package.json`
- 项目名称：`yixuan-blog-astro` → `astro-blog-template`
- 版本号：`0.0.1` → `1.0.0`

#### ✅ `astro.config.mjs`
- 站点地址：`https://www.yixuan.cyou` → `https://example.com`

#### ✅ `src/consts.ts`
- 网站标题：`你的名字的博客` → `我的博客`
- Waline 服务器：个人服务器地址 → `https://your-waline-server.com`
- Algolia 配置：个人配置 → 占位符配置

### 页面文件

#### ✅ `src/pages/index.astro` (首页)
修改内容：
- 博客标题：`你的名字的博客` → `我的博客`
- 所有 GitHub 链接：已根据模板占位符改写，当前项目已替换为 `YiXuanHQ/Blog-Template-Astro`
- 个人信息：`` → `您的名字`
- 邮箱地址：个人邮箱 → `your-email@example.com`
- GitHub 用户名：`YiXuanHQ` → `your-username`
- API 调用地址更新为模板链接

#### ✅ `src/pages/about.astro` (关于页面)
修改内容：
- 个人姓名和介绍
- 个性签名数组
- 联系方式
- GitHub 链接
- 邮箱地址
- 社交平台链接

#### ✅ `src/content/diary/README.md` (日记页面)
- 将个人日记内容改为通用示例
- 作者署名：`你的名字` → `博客作者`

### 新增文件

#### ✅ `README.md` (项目说明)
全新编写的模板项目说明文档，包含：
- 项目特性介绍
- 技术栈说明
- 快速开始指南
- 配置说明
- 部署指南
- 项目结构说明

#### ✅ `USAGE.md` (详细使用指南)
完整的使用文档，包含：
- 快速开始步骤
- 个性化配置详解
- 内容管理指南
- 主题定制方法
- 功能配置（评论、搜索等）
- 部署教程（Vercel、Netlify、GitHub Pages）
- 常见问题解答

#### ✅ `QUICKSTART.md` (快速开始)
5 分钟快速上手指南

#### ✅ `SETUP_CHECKLIST.md` (配置清单)
详细的配置检查清单，帮助用户确保所有配置都已完成

#### ✅ `CONTRIBUTING.md` (贡献指南)
开源项目贡献指南，包含：
- 如何报告 Bug
- 如何提出新功能
- 代码提交流程
- PR 规范
- 行为准则

#### ✅ `LICENSE` (开源许可)
MIT 许可证文件

#### ✅ `CHANGELOG.md` (更新日志)
版本更新记录

#### ✅ `TEMPLATE_CHANGES.md` (本文件)
模板化改动说明

## 🔍 需要用户自行修改的占位符

使用此模板时，需要全局搜索并替换以下占位符：

### GitHub 相关
- `your-username` → 您的 GitHub 用户名
- `your-repo` → 您的仓库名称

### 个人信息
- `您的名字` → 您的真实姓名或昵称
- `your-email@example.com` → 您的邮箱地址
- `我的博客` → 您的博客名称

### 域名
- `https://example.com` → 您的实际域名
- `https://your-domain.com` → 您的实际域名

### 服务配置
- `https://your-waline-server.com` → 您的 Waline 服务器地址
- `YOUR_APP_ID` → 您的 Algolia App ID
- `YOUR_SEARCH_API_KEY` → 您的 Algolia API Key
- `your_index_name` → 您的 Algolia 索引名称

## 📁 需要替换的文件

用户需要替换以下文件为自己的内容：

### 图片文件
```
public/
├── avatar.png          # 头像
├── favicon.svg         # 网站图标
├── logo.png            # Logo
├── xiaohongshu.jpg     # 社交平台二维码（可选）
└── zhifubao.jpg        # 赞赏码（可选）
```

### 音乐文件（可选）
```
public/music/
├── lianren.mp3
├── queyue.mp3
└── wohuainiande.mp3
```

### 内容文件
- `src/content/articles/` - 示例文章（建议删除或替换）
- `src/content/tutorials/` - 示例教程（根据需要保留或删除）
- `src/content/diary/` - 日记内容（建议替换）

## ✨ 保留的功能特性

以下功能已完整保留，无需修改即可使用：

- ✅ 响应式布局
- ✅ 亮色/暗色主题切换
- ✅ Markdown/MDX 支持
- ✅ 代码高亮
- ✅ 文章目录
- ✅ 面包屑导航
- ✅ SEO 优化
- ✅ RSS 订阅
- ✅ Sitemap
- ✅ 评论系统框架
- ✅ 搜索功能框架
- ✅ 音乐播放器
- ✅ 个人信息浮窗
- ✅ Magic Card 效果
- ✅ 几何背景装饰

## 🎯 建议的配置顺序

1. **基础配置**（必须）
   - 修改 `src/consts.ts`
   - 修改 `astro.config.mjs`
   - 修改 `package.json`

2. **个人信息**（必须）
   - 修改 `src/pages/index.astro`
   - 修改 `src/pages/about.astro`

3. **替换资源**（必须）
   - 替换 `public/` 下的图片

4. **内容准备**（推荐）
   - 删除或修改示例文章
   - 创建自己的内容

5. **可选功能**
   - 配置评论系统
   - 配置搜索功能
   - 添加音乐文件

6. **部署上线**
   - 推送到 GitHub
   - 部署到 Vercel/Netlify

## 📚 相关文档

- [README.md](README.md) - 项目介绍
- [QUICKSTART.md](QUICKSTART.md) - 快速开始
- [USAGE.md](USAGE.md) - 详细使用指南
- [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) - 配置清单
- [CONTRIBUTING.md](CONTRIBUTING.md) - 贡献指南

## 🤝 获取帮助

如有疑问，请：
1. 查看相关文档
2. 提交 [Issue](https://github.com/YiXuanHQ/Blog-Template-Astro/issues)
3. 参与 [Discussions](https://github.com/YiXuanHQ/Blog-Template-Astro/discussions)

---

**祝您使用愉快！** 🎉

