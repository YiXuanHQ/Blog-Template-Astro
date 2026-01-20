---
title: 第一部分：前置准备
---

# 第一部分：前置准备

> 为 Java 开发者量身定制的快速入门

## 📖 本部分概述

在开始大模型应用开发之前，你需要掌握一些基础工具和知识。别担心，作为 Java 开发者，你已经有了很好的编程基础，我们会通过**对比学习**的方式，帮你快速掌握这些知识。

**学习时长：** 3-4 周  
**难度：** ⭐⭐☆☆☆

---

## 🎯 学习目标

完成本部分学习后，你将能够：

- ✅ 使用 Python 编写基础程序
- ✅ 理解 Python 与 Java 的异同
- ✅ 掌握 NumPy 数组操作
- ✅ 理解机器学习所需的数学基础

---

## 📚 课程内容

### 1. [Python 基础速成](python-basics/)

#### 为什么 Java 开发者需要学 Python？

- **生态优势：** Python 拥有最丰富的 AI/ML 库（PyTorch、TensorFlow、HuggingFace）
- **快速原型：** Python 语法简洁，适合快速验证 AI 想法
- **社区资源：** 大部分 AI 教程和示例代码都是 Python 写的
- **配合使用：** Python 训练模型 → Java 部署服务（最佳实践）

#### 学习内容

- **环境搭建** - Python、pip、虚拟环境
- **语法对比** - Java vs Python 语法对比表
- **数据结构** - list、dict、tuple vs Java 集合
- **面向对象** - Python 的 OOP 特性
- **包管理** - pip、conda、requirements.txt

#### 对比学习示例

```java
// Java
public class HelloWorld {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob");
        for (String name : names) {
            System.out.println("Hello, " + name);
        }
    }
}
```

```python
# Python
names = ["Alice", "Bob"]
for name in names:
    print(f"Hello, {name}")
```

---

### 2. [NumPy 快速入门](numpy-basics/)

#### 为什么需要 NumPy？

- **高性能计算：** NumPy 是 Python 科学计算的基础库
- **AI 模型基础：** 所有深度学习框架都基于 NumPy 数组
- **向量化操作：** 高效处理大规模数据

#### 学习内容

- **NumPy 数组** - 创建、索引、切片
- **数组运算** - 广播机制、矩阵运算
- **与 Java 对比** - NumPy vs Java 数组

#### 示例

```python
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])

# 向量化操作（无需循环）
result = arr * 2  # [2, 4, 6, 8, 10]

# 矩阵运算
matrix = np.array([[1, 2], [3, 4]])
result = np.dot(matrix, matrix)
```

---

### 3. [机器学习数学基础](ml-math-basics/)

#### 为什么需要数学基础？

虽然使用 Spring AI 不需要深厚的数学功底，但理解基本概念能帮你：
- 更好地理解模型行为
- 优化 Prompt 效果
- 调试 AI 应用问题

#### 学习内容

- **线性代数基础** - 向量、矩阵、点积
- **概率论基础** - 概率分布、贝叶斯定理
- **微积分基础** - 导数、梯度（了解即可）

#### 数学与实践的对应

| 数学概念 | AI 应用中的体现 |
|---------|----------------|
| 向量 | 文本的 Embedding 表示 |
| 矩阵乘法 | Transformer 的注意力计算 |
| 点积 | 相似度计算 |
| 梯度 | 模型训练优化 |

---

## 🛠️ 环境搭建

### 必备工具

1. **Python 3.10+**
   ```bash
   # Windows
   winget install Python.Python.3.12
   
   # 验证安装
   python --version
   ```

2. **IDE 选择**
   - IntelliJ IDEA + Python Plugin（推荐，Java 开发者熟悉）
   - PyCharm（专业 Python IDE）
   - VS Code + Python Extension

3. **包管理工具**
   ```bash
   # pip（Python 包管理器）
   pip install numpy pandas jupyter
   
   # 创建虚拟环境（推荐）
   python -m venv venv
   venv\Scripts\activate  # Windows
   ```

4. **Jupyter Notebook**（可选但推荐）
   ```bash
   pip install jupyter
   jupyter notebook
   ```

---

## 📝 学习计划

### 第 1 周：Python 基础

- **Day 1-2：** 环境搭建 + 基础语法
- **Day 3-4：** 数据结构与控制流
- **Day 5-6：** 函数与面向对象
- **Day 7：** 实战练习

### 第 2 周：NumPy

- **Day 1-2：** NumPy 数组基础
- **Day 3-4：** 数组运算与索引
- **Day 5-7：** 实战练习

### 第 3 周：数学基础

- **Day 1-3：** 线性代数基础
- **Day 4-5：** 概率论基础
- **Day 6-7：** 综合练习

### 第 4 周：巩固与实战

- 完成综合练习项目
- 准备进入下一阶段

---

## ✅ 学习检查清单

完成以下任务后，即可进入下一阶段：

### Python 基础
- [ ] 能够编写基础 Python 程序
- [ ] 理解 list、dict、tuple 的使用
- [ ] 掌握函数定义和调用
- [ ] 理解 Python 的面向对象

### NumPy
- [ ] 能够创建和操作 NumPy 数组
- [ ] 理解向量化操作的优势
- [ ] 掌握基础的矩阵运算

### 数学基础
- [ ] 理解向量和矩阵的概念
- [ ] 知道什么是点积和相似度
- [ ] 了解概率的基本概念

---

## 💡 学习建议

### 给 Java 开发者的建议

1. **不要追求完美** - 不需要成为 Python 专家，够用就好
2. **类比学习** - 把 Python 概念映射到 Java 中理解
3. **注重实践** - 多写代码，少看理论
4. **工具优先** - 优先掌握工具使用，原理可以后学
5. **保持耐心** - Python 的语法风格需要适应

### 常见问题

**Q: 我必须精通 Python 才能继续吗？**  
A: 不需要。掌握基础语法和 NumPy 基本操作即可。

**Q: 数学不好可以学 AI 吗？**  
A: 可以。应用开发不需要很深的数学，理解概念即可。

**Q: 要花多长时间？**  
A: 每天 2-3 小时，3-4 周可以完成。

---

## 📖 推荐资源

### 在线教程
- [Python官方教程（中文）](https://docs.python.org/zh-cn/3/tutorial/)
- [NumPy官方教程](https://numpy.org/doc/stable/user/quickstart.html)
- [Khan Academy - 线性代数](https://www.khanacademy.org/math/linear-algebra)

### 书籍推荐
- 《Python编程：从入门到实践》
- 《利用Python进行数据分析》
- 《程序员的数学》

---

## 🚀 开始学习

准备好了吗？让我们从 Python 基础开始：

**下一步** → [Python 基础速成](python-basics/)

---

**Remember:** 作为 Java 开发者，你已经有了扎实的编程基础。Python 只是一个新工具，重要的是理解 AI 的概念和实践。保持信心，循序渐进！ 💪
