---
title: NumPy 入门
nextChapter: "python-ai/numpy/02-数组创建"
parentChapter: "python-ai/numpy/README"
---
# NumPy 入门

> 了解NumPy，开启科学计算之旅

## 📚 学习目标

- 理解什么是 NumPy
- 掌握 NumPy 的安装和导入
- 理解 ndarray 数组对象
- 掌握数组的基本属性
- 了解数据类型（dtype）

## 1. NumPy 简介

### 1.1 什么是 NumPy

NumPy（Numerical Python）是Python中用于科学计算的基础库：
- 提供高性能的多维数组对象
- 包含大量的数学函数
- 是数据分析和机器学习的基础
- 底层用C语言实现，运行速度快

### 1.2 为什么使用 NumPy

```python
# Python 列表的问题
import time

# 使用 Python 列表
python_list = list(range(1000000))
start = time.time()
result = [x * 2 for x in python_list]
print(f'Python列表耗时: {time.time() - start:.4f}秒')

# 使用 NumPy 数组
import numpy as np
numpy_array = np.arange(1000000)
start = time.time()
result = numpy_array * 2
print(f'NumPy数组耗时: {time.time() - start:.4f}秒')

# NumPy 比 Python 列表快 10-100 倍！
```

## 2. 安装 NumPy

### 2.1 使用 pip 安装

```bash
# 安装最新版本
pip install numpy

# 安装指定版本
pip install numpy==1.24.0

# 升级 NumPy
pip install --upgrade numpy
```

### 2.2 使用 conda 安装

```bash
# 安装 NumPy
conda install numpy

# 更新 NumPy
conda update numpy
```

### 2.3 验证安装

```python
import numpy as np

# 查看版本
print(np.__version__)  # 1.24.3

# 查看配置信息
print(np.show_config())
```

## 3. NumPy 数组（ndarray）

### 3.1 创建第一个数组

```python
import numpy as np

# 从列表创建一维数组
arr = np.array([1, 2, 3, 4, 5])
print(arr)
print(type(arr))  # <class 'numpy.ndarray'>

# 创建二维数组
arr_2d = np.array([[1, 2, 3], [4, 5, 6]])
print(arr_2d)

# 创建三维数组
arr_3d = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(arr_3d)
```

### 3.2 数组 vs 列表

```python
# Python 列表
python_list = [1, 2, 3, 4, 5]
print(python_list * 2)  # [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]

# NumPy 数组
numpy_array = np.array([1, 2, 3, 4, 5])
print(numpy_array * 2)  # [2 4 6 8 10]

# NumPy 支持向量化运算
print(numpy_array + 10)  # [11 12 13 14 15]
print(numpy_array ** 2)  # [1 4 9 16 25]
```

## 4. 数组属性

### 4.1 基本属性

```python
import numpy as np

arr = np.array([[1, 2, 3, 4], 
                [5, 6, 7, 8], 
                [9, 10, 11, 12]])

# ndim - 数组维度
print(arr.ndim)  # 2

# shape - 数组形状
print(arr.shape)  # (3, 4)

# size - 元素总数
print(arr.size)  # 12

# dtype - 数据类型
print(arr.dtype)  # int64 或 int32

# itemsize - 每个元素的字节数
print(arr.itemsize)  # 8

# nbytes - 数组占用的总字节数
print(arr.nbytes)  # 96 (12 * 8)
```

### 4.2 查看数组信息

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])

print(f'维度: {arr.ndim}')
print(f'形状: {arr.shape}')
print(f'大小: {arr.size}')
print(f'类型: {arr.dtype}')
print(f'每个元素字节: {arr.itemsize}')
print(f'总字节数: {arr.nbytes}')

# 输出:
# 维度: 2
# 形状: (2, 3)
# 大小: 6
# 类型: int64
# 每个元素字节: 8
# 总字节数: 48
```

## 5. 数据类型（dtype）

### 5.1 常见数据类型

```python
# 整数类型
int8_arr = np.array([1, 2, 3], dtype=np.int8)    # -128 到 127
int32_arr = np.array([1, 2, 3], dtype=np.int32)  # -2^31 到 2^31-1
int64_arr = np.array([1, 2, 3], dtype=np.int64)  # -2^63 到 2^63-1

# 无符号整数
uint8_arr = np.array([1, 2, 3], dtype=np.uint8)  # 0 到 255

# 浮点数
float32_arr = np.array([1.0, 2.0, 3.0], dtype=np.float32)
float64_arr = np.array([1.0, 2.0, 3.0], dtype=np.float64)

# 布尔类型
bool_arr = np.array([True, False, True], dtype=np.bool_)

# 字符串类型
str_arr = np.array(['a', 'b', 'c'], dtype='U1')
```

### 5.2 查看和转换数据类型

```python
# 查看数据类型
arr = np.array([1, 2, 3])
print(arr.dtype)  # int64

# 指定数据类型
arr_float = np.array([1, 2, 3], dtype=float)
print(arr_float.dtype)  # float64

# 转换数据类型
arr_int = np.array([1.5, 2.7, 3.9])
arr_converted = arr_int.astype(int)
print(arr_converted)  # [1 2 3]

# 转换为字符串
arr_str = arr_int.astype(str)
print(arr_str)  # ['1.5' '2.7' '3.9']
```

### 5.3 数据类型的重要性

```python
# 内存占用差异
arr_int8 = np.array([1, 2, 3], dtype=np.int8)
arr_int64 = np.array([1, 2, 3], dtype=np.int64)

print(f'int8 内存: {arr_int8.nbytes} 字节')   # 3 字节
print(f'int64 内存: {arr_int64.nbytes} 字节')  # 24 字节

# 精度差异
arr_float32 = np.array([1/3], dtype=np.float32)
arr_float64 = np.array([1/3], dtype=np.float64)

print(arr_float32)  # [0.33333334]
print(arr_float64)  # [0.33333333]
```

## 6. 第一个完整示例

```python
import numpy as np

# 创建数组
temperatures = np.array([25.5, 26.3, 24.8, 27.1, 25.9])

print('温度数据:', temperatures)
print('数据类型:', temperatures.dtype)
print('数组形状:', temperatures.shape)
print('数组大小:', temperatures.size)

# 基本统计
print('\n温度统计:')
print(f'最高温度: {temperatures.max()}°C')
print(f'最低温度: {temperatures.min()}°C')
print(f'平均温度: {temperatures.mean():.2f}°C')
print(f'温度标准差: {temperatures.std():.2f}°C')

# 数组运算
temperatures_f = temperatures * 9/5 + 32  # 转换为华氏度
print(f'\n华氏温度: {temperatures_f}')

# 条件筛选
hot_days = temperatures[temperatures > 26]
print(f'\n高于26°C的天数: {len(hot_days)}')
print(f'这些天的温度: {hot_days}')
```

## 7. NumPy 与 Python 列表对比

```python
import numpy as np

# 特性对比
python_list = [1, 2, 3, 4, 5]
numpy_array = np.array([1, 2, 3, 4, 5])

# 1. 数据类型
print('列表可以混合类型:', [1, 'a', 3.0, True])
# 数组必须是同一类型（自动转换）
print('数组自动转换:', np.array([1, 'a', 3.0, True]))

# 2. 运算方式
print('列表乘法:', python_list * 2)  # 重复
print('数组乘法:', numpy_array * 2)  # 向量化

# 3. 内存效率
import sys
list_memory = sys.getsizeof(python_list)
array_memory = numpy_array.nbytes
print(f'列表内存: {list_memory} 字节')
print(f'数组内存: {array_memory} 字节')

# 4. 性能
def sum_python_list(n):
    data = list(range(n))
    return sum(data)

def sum_numpy_array(n):
    data = np.arange(n)
    return np.sum(data)

# NumPy 快得多！
```

## 8. 常见问题

### Q1: 何时使用 NumPy，何时使用列表？

**使用 NumPy：**
- 需要数值计算
- 需要高性能
- 数据类型统一
- 需要数学运算

**使用列表：**
- 需要混合数据类型
- 频繁增删元素
- 简单的数据存储

### Q2: NumPy 为什么这么快？

1. **底层实现** - 用C语言编写
2. **连续内存** - 数组在内存中连续存储
3. **向量化** - 避免Python循环
4. **优化算法** - 使用BLAS/LAPACK等优化库

### Q3: dtype 如何选择？

- **整数计算** - int32 或 int64
- **浮点运算** - float64（默认）
- **节省内存** - int8、float32
- **图像处理** - uint8（0-255）

## 9. 练习题

1. 创建一个包含1到10的NumPy数组
2. 创建一个3x3的二维数组，元素为1到9
3. 将浮点数组 [1.1, 2.9, 3.5] 转换为整数数组
4. 创建一个形状为 (2, 3, 4) 的三维数组，并打印其属性
5. 比较使用列表和NumPy数组计算1到1000000求和的性能差异

## 💡 重点总结

1. **NumPy** 是Python科学计算的基础库
2. **ndarray** 是NumPy的核心数据结构
3. **向量化运算** 是NumPy的核心特性
4. **dtype** 决定数组的数据类型和内存占用
5. NumPy比Python列表**快10-100倍**

---

**下一节：** [数组创建](02-数组创建.md)
