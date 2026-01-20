---
title: 环境搭建
parentChapter: "llm-dev/01-prerequisites/README"
---
# Python 环境搭建

> 为 Java 开发者准备的 Python 开发环境配置指南

## 📖 本文概述

作为 Java 开发者，你已经熟悉了 JDK、Maven/Gradle、IDEA 等工具。Python 的开发环境设置同样简单，本文将帮你快速搭建 Python 开发环境。

---

## 🎯 学习目标

- ✅ 安装 Python 解释器
- ✅ 配置环境变量
- ✅ 安装包管理工具（pip）
- ✅ 配置 IDE（IntelliJ IDEA / PyCharm）
- ✅ 创建和管理虚拟环境
- ✅ 运行第一个 Python 程序

---

## 🛠️ Python vs Java 环境对比

| 环境组件 | Java | Python |
|---------|------|--------|
| **运行时** | JDK (Java Development Kit) | Python 解释器 |
| **包管理** | Maven / Gradle | pip / conda |
| **项目依赖** | pom.xml / build.gradle | requirements.txt / pyproject.toml |
| **虚拟环境** | 不需要（JDK 全局） | venv / virtualenv (推荐) |
| **IDE** | IntelliJ IDEA / Eclipse | PyCharm / IntelliJ + Plugin |

---

## 📦 安装 Python

### Windows 系统

#### 方法 1：使用 winget (推荐)

```powershell
# 安装 Python 3.12
winget install Python.Python.3.12

# 验证安装
python --version
# 输出: Python 3.12.x

pip --version
# 输出: pip 24.x.x
```

#### 方法 2：从官网下载

1. 访问 [https://www.python.org/downloads/](https://www.python.org/downloads/)
2. 下载 Python 3.10+ 版本
3. **重要：** 勾选 "Add Python to PATH"
4. 选择 "Install Now"

### macOS 系统

```bash
# 使用 Homebrew
brew install python@3.12

# 验证
python3 --version
pip3 --version
```

### Linux 系统

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3.12 python3-pip

# Fedora/RHEL
sudo dnf install python3.12 python3-pip

# 验证
python3 --version
pip3 --version
```

---

## 🔧 配置 IDE

### 选项 1：IntelliJ IDEA (推荐给 Java 开发者)

**优点：** 熟悉的界面，Java + Python 都能用

#### 安装 Python 插件

1. 打开 IntelliJ IDEA
2. `File` → `Settings` → `Plugins`
3. 搜索 "Python"
4. 安装 "Python" 插件
5. 重启 IDEA

#### 配置 Python 解释器

1. `File` → `Project Structure` → `SDKs`
2. 点击 `+` → `Add Python SDK`
3. 选择系统安装的 Python 路径
4. 应用配置

#### 创建 Python 项目

1. `File` → `New` → `Project`
2. 选择 "Python"
3. 配置项目名称和位置
4. 选择 Python 解释器
5. 创建项目

### 选项 2：PyCharm (Python 专业 IDE)

**优点：** 功能最强大的 Python IDE

#### 下载安装

- [PyCharm Community (免费)](https://www.jetbrains.com/pycharm/download/)
- 或使用 PyCharm Professional (付费，更多功能)

#### 配置类似 IntelliJ IDEA

---

## 📦 包管理：pip

### pip 是什么？

> pip 相当于 Java 的 Maven/Gradle，用于管理 Python 第三方库

### 常用命令

#### 对比学习

| 操作 | Maven | pip |
|------|-------|-----|
| **安装依赖** | `mvn install` | `pip install package_name` |
| **列出依赖** | `mvn dependency:tree` | `pip list` |
| **导出依赖** | pom.xml | `pip freeze > requirements.txt` |
| **安装项目依赖** | `mvn install` | `pip install -r requirements.txt` |
| **卸载依赖** | 修改 pom.xml | `pip uninstall package_name` |

### 实战示例

```bash
# 安装单个包
pip install requests

# 安装特定版本
pip install numpy==1.24.0

# 安装多个包
pip install pandas matplotlib seaborn

# 查看已安装的包
pip list

# 查看包信息
pip show requests

# 导出依赖到文件 (相当于 pom.xml)
pip freeze > requirements.txt

# 从文件安装依赖
pip install -r requirements.txt

# 卸载包
pip uninstall requests

# 升级包
pip install --upgrade requests

# 升级 pip 本身
python -m pip install --upgrade pip
```

---

## 🌍 虚拟环境

### 为什么需要虚拟环境？

**Java 开发者的理解：**
- Java 项目依赖 JDK，全局共享
- Python 项目可以有独立的 Python 环境和依赖
- 类似于 Docker 容器，但更轻量

**好处：**
- 不同项目使用不同版本的库
- 避免依赖冲突
- 项目环境隔离

### 使用 venv (推荐)

#### 创建虚拟环境

```bash
# 进入项目目录
cd my-python-project

# 创建虚拟环境 (相当于创建一个独立的 Python 环境)
python -m venv venv

# 目录结构：
# my-python-project/
#   venv/          # 虚拟环境目录（类似 node_modules）
#     Scripts/     # Windows
#     bin/         # Linux/macOS
#     Lib/
```

#### 激活虚拟环境

```bash
# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

# 激活后，命令行前面会显示 (venv)
(venv) PS E:\my-python-project>
```

#### 使用虚拟环境

```bash
# 激活后，pip 安装的包只在这个环境中
(venv) $ pip install requests

# 查看虚拟环境中的包
(venv) $ pip list

# 退出虚拟环境
(venv) $ deactivate
```

#### 在 IDE 中使用虚拟环境

**IntelliJ IDEA：**
1. `File` → `Project Structure` → `SDKs`
2. 添加虚拟环境中的 Python： `项目路径/venv/Scripts/python.exe` (Windows)
3. 设置为项目解释器

### 依赖管理最佳实践

```bash
# 1. 创建项目
mkdir my-ai-project
cd my-ai-project

# 2. 创建虚拟环境
python -m venv venv

# 3. 激活虚拟环境
venv\Scripts\activate  # Windows

# 4. 安装依赖
pip install openai numpy pandas

# 5. 导出依赖（提交到 Git）
pip freeze > requirements.txt

# 6. 其他人克隆项目后
git clone xxx
cd my-ai-project
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt  # 安装所有依赖
```

---

## ✅ 环境验证

### 创建测试文件

创建 `hello.py`：

```python
# hello.py
print("Hello from Python!")

# 显示 Python 版本
import sys
print(f"Python version: {sys.version}")

# 测试包导入
try:
    import numpy as np
    print(f"NumPy version: {np.__version__}")
except ImportError:
    print("NumPy not installed")
```

### 运行程序

```bash
# 命令行运行
python hello.py

# 输出：
# Hello from Python!
# Python version: 3.12.x
# NumPy version: 1.26.x (如果已安装)
```

### 在 IDEA 中运行

1. 右键 `hello.py`
2. 点击 "Run 'hello'"
3. 查看输出

---

## 🎯 Java vs Python 对比示例

### Hello World

**Java:**
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

**Python:**
```python
print("Hello World")
```

### 包导入

**Java:**
```java
import java.util.ArrayList;
import java.util.List;
```

**Python:**
```python
import numpy as np
from typing import List
```

### 项目结构

**Java 项目：**
```
my-java-project/
├── pom.xml
├── src/
│   └── main/
│       └── java/
│           └── com/example/App.java
└── target/
```

**Python 项目：**
```
my-python-project/
├── requirements.txt
├── venv/              # 虚拟环境（不提交到 Git）
├── src/
│   └── main.py
└── tests/
```

---

## 🐛 常见问题

### Q1: pip 安装很慢怎么办？

**A:** 使用国内镜像源

```bash
# 临时使用
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple numpy

# 永久配置
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

### Q2: 虚拟环境应该提交到 Git 吗？

**A:** 不应该！类似 Java 的 `target/` 目录

`.gitignore` 文件：
```gitignore
venv/
__pycache__/
*.pyc
.env
```

### Q3: 多个 Python 版本如何管理？

**A:** 使用 `pyenv` (类似 Java 的 SDKMAN)

```bash
# 安装 pyenv
curl https://pyenv.run | bash

# 安装不同版本的 Python
pyenv install 3.10.0
pyenv install 3.12.0

# 切换版本
pyenv global 3.12.0
pyenv local 3.10.0  # 项目级别
```

---

## 📋 环境配置检查清单

完成以下检查，确保环境搭建成功：

- [ ] Python 3.10+ 已安装
- [ ] `python --version` 显示正确版本
- [ ] `pip --version` 正常工作
- [ ] IDE 配置完成（IntelliJ IDEA / PyCharm）
- [ ] 能够创建和激活虚拟环境
- [ ] `pip install` 能够成功安装包
- [ ] 能够运行 Python 程序
- [ ] 理解 `requirements.txt` 的作用

---

## 🚀 下一步

环境搭建完成！现在你可以开始学习 Python 语法了：

**下一步** → [Java vs Python 语法对比](02-syntax-comparison.md)

---

## 📖 参考资源

- [Python 官方文档](https://docs.python.org/zh-cn/3/)
- [pip 用户指南](https://pip.pypa.io/en/stable/user_guide/)
- [venv 文档](https://docs.python.org/zh-cn/3/library/venv.html)
- [IntelliJ IDEA Python 插件](https://plugins.jetbrains.com/plugin/631-python)

---

**恭喜！** 你已经成功搭建了 Python 开发环境。作为 Java 开发者，你会发现 Python 的环境管理其实很简单。让我们继续学习 Python 语法！💪
