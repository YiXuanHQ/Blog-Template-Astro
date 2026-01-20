# 📋 配置清单

使用此清单确保您已完成所有必要的配置步骤。

## ✅ 基础配置

- [ ] **克隆项目并安装依赖**
  ```bash
  npm install
  ```

- [ ] **修改项目名称**
  - 编辑 `package.json` 中的 `name` 字段

- [ ] **配置站点信息**
  - [ ] 编辑 `src/consts.ts` 中的 `SITE_TITLE`
  - [ ] 编辑 `src/consts.ts` 中的 `SITE_DESCRIPTION`
  - [ ] 编辑 `astro.config.mjs` 中的 `site` 字段

## 🎨 个性化内容

- [ ] **替换图片资源**
  - [ ] `public/avatar.png` - 头像
  - [ ] `public/favicon.svg` - 网站图标
  - [ ] `public/logo.png` - Logo
  - [ ] `public/xiaohongshu.jpg` - 社交平台二维码（可选）
  - [ ] `public/zhifubao.jpg` - 赞赏码（可选）

- [ ] **修改首页信息**
  - [ ] 编辑 `src/pages/index.astro`
  - [ ] 替换所有 `your-username` 为您的 GitHub 用户名
  - [ ] 替换所有 `your-repo` 为您的仓库名
  - [ ] 替换所有 `your-email@example.com` 为您的邮箱

- [ ] **修改关于页面**
  - [ ] 编辑 `src/pages/about.astro`
  - [ ] 更新个人简介
  - [ ] 更新技能标签
  - [ ] 更新联系方式
  - [ ] 更新项目经历
  - [ ] 更新个性签名数组

- [ ] **修改音乐播放器**（可选）
  - [ ] 替换 `public/music/` 目录下的音乐文件
  - [ ] 编辑 `src/pages/about.astro` 中的 `playlist` 数组

## 📝 内容准备

- [ ] **删除或修改示例文章**
  - [ ] 检查 `src/content/articles/` 目录
  - [ ] 删除不需要的示例文章
  - [ ] 添加您自己的文章

- [ ] **删除或修改示例教程**
  - [ ] 检查 `src/content/tutorials/` 目录
  - [ ] 删除不需要的示例教程
  - [ ] 添加您自己的教程

- [ ] **修改日记/随笔**
  - [ ] 编辑 `src/content/diary/README.md`
  - [ ] 替换为您自己的内容

## 🔧 功能配置

- [ ] **评论系统**（可选）
  - [ ] 部署 Waline 服务端
  - [ ] 在 `src/consts.ts` 中配置 `WALINE_SERVER_URL`
  - [ ] 测试评论功能是否正常

- [ ] **搜索功能**（可选）
  - [ ] 注册 Algolia 账号
  - [ ] 在 `src/consts.ts` 中配置 Algolia 信息
  - [ ] 上传内容到 Algolia 索引

- [ ] **分析统计**（可选）
  - [ ] 配置 Google Analytics
  - [ ] 在 `src/components/BaseHead.astro` 中添加 GA 代码

## 🚀 部署准备

- [ ] **本地测试**
  ```bash
  npm run dev
  npm run build
  npm run preview
  ```

- [ ] **Git 配置**
  - [ ] 初始化 Git 仓库（如果还没有）
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
  - [ ] 创建 GitHub 仓库
  - [ ] 推送到 GitHub
    ```bash
    git remote add origin https://github.com/YiXuanHQ/Blog-Template-Astro.git
    git push -u origin main
    ```

- [ ] **选择部署平台**
  - [ ] Vercel（推荐）
  - [ ] Netlify
  - [ ] GitHub Pages
  - [ ] 其他

- [ ] **配置自定义域名**（可选）
  - [ ] 购买域名
  - [ ] 在部署平台配置域名
  - [ ] 更新 DNS 设置
  - [ ] 等待 SSL 证书生效

## 📚 文档更新

- [ ] **更新 README.md**
  - [ ] 替换所有占位符链接
  - [ ] 添加项目截图（可选）
  - [ ] 更新联系方式

- [ ] **更新 LICENSE**
  - [ ] 在 LICENSE 文件中填入您的名字和年份

- [ ] **更新 CONTRIBUTING.md**
  - [ ] 替换仓库链接
  - [ ] 替换联系邮箱

## ✨ 最后检查

- [ ] 所有链接都正常工作
- [ ] 所有图片都正常显示
- [ ] 深色/浅色主题都正常
- [ ] 移动端显示正常
- [ ] 页面加载速度快
- [ ] SEO 信息完整
- [ ] 没有控制台错误

## 🎉 完成！

恭喜！您已经完成了所有配置。现在可以：

1. **开始写作** - 创建您的第一篇文章
2. **分享项目** - 告诉朋友您的新博客
3. **持续优化** - 根据需要调整主题和功能

---

**提示**: 保存此清单，在以后更新时可以再次使用。

如有问题，请查看 [USAGE.md](USAGE.md) 或提交 [Issue](https://github.com/YiXuanHQ/Blog-Template-Astro/issues)。

