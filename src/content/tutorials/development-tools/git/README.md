---
title: ---
---

---
title: Git 版本控制教程
autoGroup: false
autoSort: false
sidebarDepth: 0
---

# Git 版本控制教程

> 从零开始掌握 Git 版本控制系统，成为团队协作高手

## 📚 教程简介

本教程将带你系统学习 Git 版本控制系统，从基础概念到实战应用，涵盖日常开发中的所有常用场景。

## 🎯 学习目标

- ✅ 理解版本控制的核心概念
- ✅ 熟练掌握 Git 基本命令
- ✅ 掌握分支管理和合并策略
- ✅ 能够处理冲突和回滚操作
- ✅ 掌握团队协作工作流
- ✅ 学会使用 GitHub/GitLab 进行代码托管

## 📖 教程目录

### [第一章：Git 基础入门](1.Git基础入门.md)
- Git 是什么？
- Git 的安装与配置
- 工作区、暂存区、版本库概念
- 基本命令：add、commit、status、log
- 远程仓库：push、pull、clone
- 忽略文件配置 (.gitignore)

### [第二章：Git 进阶技巧](2.Git进阶技巧.md)
- 高级分支操作
- 变基（Rebase）详解
- 标签管理
- 子模块使用
- Git Hooks 自动化
- 性能优化与最佳实践

### [第三章：Git 实战场景](3.Git实战场景.md)
- 日常开发场景处理
- 多人协作工作流
- 冲突解决方案
- 代码回滚技巧
- 问题排查方法
- GitHub/GitLab 使用技巧

## 🚀 快速开始

### 安装 Git

**Windows：**
```bash
# 下载安装包
https://git-scm.com/download/win

# 或使用 Chocolatey
choco install git
```

**macOS：**
```bash
# 使用 Homebrew
brew install git
```

**Linux：**
```bash
# Ubuntu/Debian
sudo apt-get install git

# CentOS/RHEL
sudo yum install git
```

### 配置 Git

```bash
# 设置用户名和邮箱
git config --global user.name "你的名字"
git config --global user.email "your.email@example.com"

# 查看配置
git config --list
```

### 创建第一个仓库

```bash
# 创建新目录
mkdir my-project
cd my-project

# 初始化 Git 仓库
git init

# 创建文件
echo "# My Project" > README.md

# 添加到暂存区
git add README.md

# 提交到版本库
git commit -m "Initial commit"
```

## 💡 学习建议

1. **动手实践** - 每学完一个命令，立即在自己的项目中尝试
2. **理解原理** - 不要死记硬背命令，要理解背后的工作原理
3. **模拟场景** - 自己创建不同的场景来练习各种操作
4. **学会查阅** - 使用 `git help <command>` 查看详细文档
5. **循序渐进** - 先掌握基础命令，再学习高级技巧

## 🌟 常用命令速查

### 基础操作
```bash
git init              # 初始化仓库
git add .             # 添加所有文件
git commit -m "msg"   # 提交更改
git status            # 查看状态
git log               # 查看提交历史
```

### 分支操作
```bash
git branch            # 查看分支
git checkout -b dev   # 创建并切换分支
git merge dev         # 合并分支
git branch -d dev     # 删除分支
```

### 远程操作
```bash
git remote add origin <url>  # 添加远程仓库
git push origin master       # 推送到远程
git pull origin master       # 拉取远程更新
git clone <url>              # 克隆仓库
```

### 撤销操作
```bash
git reset HEAD <file>        # 取消暂存
git checkout -- <file>       # 撤销修改
git reset --hard HEAD^       # 回退版本
git revert <commit>          # 反做提交
```

## 📚 推荐资源

### 官方文档
- [Git 官方文档](https://git-scm.com/doc)
- [Pro Git 中文版](https://git-scm.com/book/zh/v2)

### 在线练习
- [Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN) - 可视化交互式学习
- [Git 练习场](https://gitexercises.fracz.com/)

### 推荐工具
- **Git GUI 工具**
  - SourceTree（免费）
  - GitKraken（免费版）
  - GitHub Desktop（免费）
- **VS Code 插件**
  - GitLens
  - Git History
  - Git Graph

## ⚠️ 注意事项

1. **提交前检查** - 使用 `git status` 和 `git diff` 检查修改
2. **提交信息规范** - 写清晰、有意义的提交信息
3. **频繁提交** - 小步提交，便于回滚和追踪
4. **保护主分支** - 不要直接在 master/main 分支开发
5. **定期同步** - 及时 pull 远程更新，避免冲突堆积

## 🤝 Git 工作流推荐

### Git Flow
适合有明确发布周期的项目：
- `master` - 生产环境分支
- `develop` - 开发分支
- `feature/*` - 功能分支
- `release/*` - 发布分支
- `hotfix/*` - 紧急修复分支

### GitHub Flow
适合持续交付的项目：
- `main` - 主分支（随时可发布）
- `feature/*` - 功能分支
- 通过 Pull Request 合并

## 📄 版权说明

本教程仅供学习使用，欢迎分享传播。

---

**准备好了吗？让我们开始 Git 学习之旅！🚀**

**建议从 [第一章：Git 基础入门](1.Git基础入门.md) 开始学习**
