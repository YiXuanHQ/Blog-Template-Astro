---
title: NumPy 数值计算
---

# NumPy 数值计算

> NumPy是Python科学计算的基础库，提供高性能的多维数组对象和相关工具

## 📚 教程简介

NumPy（Numerical Python）是Python中用于科学计算的核心库。它提供了强大的N维数组对象、广播功能、线性代数、傅里叶变换等功能，是数据分析、机器学习的基础。

## 🎯 学习目标

- ✅ 掌握 NumPy 数组的创建和操作
- ✅ 理解数组的索引和切片
- ✅ 掌握数组运算和广播机制
- ✅ 学会使用线性代数和统计函数
- ✅ 能够使用 NumPy 进行数据处理

## 📖 教程目录

### 第一章：NumPy 基础

#### [1. NumPy 入门](01-NumPy入门.md)
- NumPy 简介与安装
- ndarray 数组对象
- 数组的属性
- 数据类型（dtype）
- 第一个 NumPy 程序

#### [2. 数组创建](02-数组创建.md)
- 从列表创建数组
- 使用内置函数创建数组
- zeros、ones、empty
- arange、linspace
- 随机数组生成

#### [3. 数组索引与切片](03-数组索引与切片.md)
- 一维数组索引
- 多维数组索引
- 切片操作
- 布尔索引
- 花式索引

#### [4. 数组运算](04-数组运算.md)
- 算术运算
- 比较运算
- 逻辑运算
- 通用函数（ufunc）
- 数组的聚合操作

### 第二章：NumPy 进阶

#### [5. 数组形状操作](05-数组形状操作.md)
- reshape 重塑
- ravel 和 flatten
- 转置（transpose）
- 数组连接和分割
- 数组的复制和视图

#### [6. 广播机制](06-广播机制.md)
- 广播规则
- 广播的应用
- 常见的广播场景
- 广播的注意事项

#### [7. 线性代数](07-线性代数.md)
- 矩阵乘法
- 矩阵的逆和转置
- 行列式和特征值
- 解线性方程组
- 矩阵分解

#### [8. 统计函数](08-统计函数.md)
- 求和、均值、中位数
- 方差和标准差
- 最大值和最小值
- 百分位数
- 相关系数

### 第三章：实战应用

#### [9. 数组高级操作](09-数组高级操作.md)
- 数组排序
- 去重操作
- 条件筛选
- where 函数
- 数组的集合运算

#### [10. 实战案例](10-实战案例.md)
- 图像处理基础
- 数据归一化
- 矩阵运算应用
- 数据分析案例

## 🚀 快速开始

### 安装 NumPy

```bash
# 使用 pip 安装
pip install numpy

# 使用 conda 安装
conda install numpy

# 验证安装
python -c "import numpy; print(numpy.__version__)"
```

### 第一个 NumPy 程序

```python
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print(arr)

# 数组运算
print(arr * 2)
print(arr.mean())

# 创建二维数组
matrix = np.array([[1, 2, 3], [4, 5, 6]])
print(matrix)
print(matrix.shape)
```

## 💡 学习建议

1. **动手实践** - 每个知识点都要自己编写代码测试
2. **理解概念** - 深入理解数组、广播等核心概念
3. **查阅文档** - 养成查阅官方文档的习惯
4. **对比学习** - 对比 NumPy 与 Python 列表的区别
5. **实践应用** - 在实际项目中使用 NumPy

## 🎯 NumPy 核心特性

### 1. 高性能数组对象

```python
import numpy as np

# NumPy 数组比 Python 列表快得多
arr = np.arange(1000000)
```

### 2. 向量化运算

```python
# 无需循环，直接对整个数组操作
arr = np.array([1, 2, 3, 4, 5])
result = arr * 2 + 10  # [12, 14, 16, 18, 20]
```

### 3. 广播机制

```python
# 不同形状的数组可以运算
arr = np.array([[1, 2, 3], [4, 5, 6]])
result = arr + np.array([10, 20, 30])
```

### 4. 丰富的数学函数

```python
# 三角函数、指数、对数等
angles = np.array([0, 30, 45, 60, 90])
radians = np.deg2rad(angles)
sin_values = np.sin(radians)
```

## 📊 NumPy vs Python 列表

| 特性 | NumPy 数组 | Python 列表 |
|------|-----------|------------|
| 性能 | 快（C语言实现） | 慢 |
| 内存 | 占用少 | 占用多 |
| 数据类型 | 同一类型 | 可以混合 |
| 功能 | 丰富的数学函数 | 基础操作 |
| 语法 | 向量化操作 | 需要循环 |

## 🔧 常用函数速查

### 数组创建
- `np.array()` - 从列表创建
- `np.zeros()` - 全零数组
- `np.ones()` - 全一数组
- `np.arange()` - 等差数组
- `np.linspace()` - 线性空间
- `np.random.rand()` - 随机数组

### 数组操作
- `reshape()` - 改变形状
- `flatten()` - 展平
- `transpose()` - 转置
- `concatenate()` - 连接
- `split()` - 分割

### 数学运算
- `np.sum()` - 求和
- `np.mean()` - 均值
- `np.std()` - 标准差
- `np.max()` - 最大值
- `np.min()` - 最小值
- `np.dot()` - 点积

## 📚 推荐资源

### 官方文档
- [NumPy 官方网站](https://numpy.org/)
- [NumPy 官方文档](https://numpy.org/doc/)
- [NumPy 用户指南](https://numpy.org/doc/stable/user/)

### 推荐书籍
- 《Python数据科学手册》
- 《利用Python进行数据分析》
- 《Python for Data Analysis》

### 在线教程
- [NumPy 快速入门](https://numpy.org/doc/stable/user/quickstart.html)
- [NumPy 教程 - 菜鸟教程](https://www.runoob.com/numpy/numpy-tutorial.html)

## 🎓 应用领域

1. **数据分析** - Pandas 基于 NumPy
2. **机器学习** - Scikit-learn、TensorFlow 等
3. **科学计算** - SciPy 科学计算库
4. **图像处理** - OpenCV、PIL
5. **信号处理** - 音频、视频处理
6. **金融分析** - 量化交易、风险分析

## ⚠️ 注意事项

1. **数组类型** - 创建数组时注意指定正确的 dtype
2. **内存管理** - 大数组操作要注意内存使用
3. **视图 vs 副本** - 理解数组切片返回的是视图
4. **广播规则** - 掌握广播机制避免错误
5. **性能优化** - 尽量使用向量化操作避免循环

## 🚦 学习路线

```
第 1 周：NumPy 基础
├─ 数组创建与属性
├─ 索引和切片
├─ 基本运算
└─ 常用函数

第 2 周：NumPy 进阶
├─ 形状操作
├─ 广播机制
├─ 线性代数
└─ 统计函数

第 3 周：实战应用
├─ 数据处理
├─ 性能优化
├─ 实战项目
└─ 综合练习
```

---

**准备好了吗？让我们开始 NumPy 学习之旅！🚀**

**建议从 [第1章：NumPy入门](01-NumPy入门.md) 开始学习**
