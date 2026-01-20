---
title: Pandas 入门
nextChapter: "python-ai/pandas/02-数据读取与写入"
parentChapter: "python-ai/pandas/README"
---
# Pandas 入门

> 了解Pandas，掌握Series和DataFrame数据结构

## 📚 学习目标

- 理解什么是Pandas
- 掌握Series数据结构
- 掌握DataFrame数据结构
- 理解索引对象
- 掌握基本操作

## 1. Pandas 简介

### 1.1 什么是Pandas

Pandas是Python中用于数据分析的核心库：
- 提供高效的数据结构（Series、DataFrame）
- 提供数据清洗、转换、分析工具
- 基于NumPy构建，性能优秀
- 广泛应用于数据科学领域

### 1.2 安装Pandas

```bash
# 使用pip安装
pip install pandas

# 使用conda安装
conda install pandas

# 安装特定版本
pip install pandas==2.0.0

# 验证安装
python -c "import pandas as pd; print(pd.__version__)"
```

### 1.3 导入Pandas

```python
import pandas as pd
import numpy as np

# 查看版本
print(pd.__version__)

# 设置显示选项
pd.set_option('display.max_rows', 100)
pd.set_option('display.max_columns', 20)
```

## 2. Series 数据结构

### 2.1 创建Series

```python
# 从列表创建
s = pd.Series([1, 2, 3, 4, 5])
print(s)
# 0    1
# 1    2
# 2    3
# 3    4
# 4    5
# dtype: int64

# 指定索引
s = pd.Series([1, 2, 3, 4, 5], index=['a', 'b', 'c', 'd', 'e'])
print(s)

# 从字典创建
data = {'a': 1, 'b': 2, 'c': 3}
s = pd.Series(data)
print(s)

# 从标量创建
s = pd.Series(5, index=['a', 'b', 'c'])
print(s)
```

### 2.2 Series 属性

```python
s = pd.Series([1, 2, 3, 4, 5], index=['a', 'b', 'c', 'd', 'e'])

print('值:', s.values)      # array([1, 2, 3, 4, 5])
print('索引:', s.index)     # Index(['a', 'b', 'c', 'd', 'e'])
print('数据类型:', s.dtype) # int64
print('形状:', s.shape)     # (5,)
print('大小:', s.size)      # 5
print('名称:', s.name)      # None

# 设置名称
s.name = 'my_series'
s.index.name = 'letters'
print(s)
```

### 2.3 Series 索引

```python
s = pd.Series([10, 20, 30, 40, 50], index=['a', 'b', 'c', 'd', 'e'])

# 标签索引
print(s['a'])        # 10
print(s[['a', 'c']]) # 多个元素

# 位置索引
print(s[0])          # 10
print(s[0:3])        # 切片

# 布尔索引
print(s[s > 25])     # 大于25的元素

# 修改值
s['a'] = 100
print(s)
```

### 2.4 Series 运算

```python
s1 = pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])
s2 = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])

# 算术运算
print(s1 + s2)
print(s1 * 2)
print(s1 ** 2)

# 统计函数
print(s1.sum())      # 求和
print(s1.mean())     # 均值
print(s1.std())      # 标准差
print(s1.min())      # 最小值
print(s1.max())      # 最大值

# 索引对齐
s3 = pd.Series([1, 2, 3], index=['a', 'b', 'c'])
s4 = pd.Series([10, 20, 30], index=['b', 'c', 'd'])
print(s3 + s4)  # 自动对齐，缺失值为NaN
```

## 3. DataFrame 数据结构

### 3.1 创建DataFrame

```python
# 从字典创建
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 40],
    'city': ['New York', 'Paris', 'London', 'Tokyo']
}
df = pd.DataFrame(data)
print(df)

# 从列表字典创建
data = [
    {'name': 'Alice', 'age': 25, 'city': 'New York'},
    {'name': 'Bob', 'age': 30, 'city': 'Paris'},
    {'name': 'Charlie', 'age': 35, 'city': 'London'}
]
df = pd.DataFrame(data)
print(df)

# 从NumPy数组创建
data = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
df = pd.DataFrame(data, columns=['A', 'B', 'C'])
print(df)

# 指定索引和列名
df = pd.DataFrame(
    [[1, 2], [3, 4], [5, 6]],
    index=['row1', 'row2', 'row3'],
    columns=['col1', 'col2']
)
print(df)
```

### 3.2 DataFrame 属性

```python
df = pd.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6],
    'C': [7, 8, 9]
})

print('值:\n', df.values)
print('索引:', df.index)
print('列名:', df.columns)
print('数据类型:\n', df.dtypes)
print('形状:', df.shape)
print('大小:', df.size)
print('维度:', df.ndim)

# 查看数据信息
df.info()

# 统计摘要
print(df.describe())
```

### 3.3 查看数据

```python
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'age': [25, 30, 35, 40, 45],
    'salary': [50000, 60000, 70000, 80000, 90000]
})

# 查看前几行
print(df.head())      # 默认5行
print(df.head(3))     # 前3行

# 查看后几行
print(df.tail())
print(df.tail(2))

# 查看指定行
print(df.iloc[0])     # 第一行
print(df.iloc[[0, 2]]) # 第1和第3行
```

### 3.4 选择列

```python
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['New York', 'Paris', 'London']
})

# 选择单列（返回Series）
print(df['name'])
print(df.name)  # 属性访问

# 选择多列（返回DataFrame）
print(df[['name', 'age']])

# 添加新列
df['salary'] = [50000, 60000, 70000]
print(df)

# 删除列
df_copy = df.drop('city', axis=1)
print(df_copy)
```

### 3.5 选择行

```python
df = pd.DataFrame({
    'A': [1, 2, 3, 4, 5],
    'B': [10, 20, 30, 40, 50]
})

# 切片选择
print(df[1:3])  # 第2-3行

# 布尔索引
print(df[df['A'] > 2])

# loc - 标签索引
print(df.loc[0])      # 第一行
print(df.loc[0:2])    # 第1-3行

# iloc - 位置索引
print(df.iloc[0])     # 第一行
print(df.iloc[0:2])   # 第1-2行
```

## 4. 索引对象（Index）

```python
# 创建索引
index = pd.Index(['a', 'b', 'c', 'd'])
print(index)

# 范围索引
index = pd.RangeIndex(start=0, stop=10, step=2)
print(index)

# 日期时间索引
dates = pd.date_range('2024-01-01', periods=5)
print(dates)

# 分类索引
categories = pd.CategoricalIndex(['A', 'B', 'A', 'C', 'B'])
print(categories)

# 多层索引
index = pd.MultiIndex.from_tuples([
    ('A', 1), ('A', 2), ('B', 1), ('B', 2)
])
print(index)
```

## 5. 基本操作

### 5.1 排序

```python
df = pd.DataFrame({
    'name': ['Charlie', 'Alice', 'Bob'],
    'age': [35, 25, 30],
    'salary': [70000, 50000, 60000]
})

# 按值排序
df_sorted = df.sort_values('age')
print(df_sorted)

# 降序排序
df_sorted = df.sort_values('salary', ascending=False)
print(df_sorted)

# 多列排序
df_sorted = df.sort_values(['age', 'salary'])
print(df_sorted)

# 按索引排序
df_sorted = df.sort_index()
print(df_sorted)
```

### 5.2 统计函数

```python
df = pd.DataFrame({
    'A': [1, 2, 3, 4, 5],
    'B': [10, 20, 30, 40, 50]
})

print('求和:', df.sum())
print('均值:', df.mean())
print('中位数:', df.median())
print('标准差:', df.std())
print('最大值:', df.max())
print('最小值:', df.min())

# 按行统计
print('每行求和:\n', df.sum(axis=1))

# 计数
print('非空计数:', df.count())
```

### 5.3 唯一值和计数

```python
s = pd.Series(['a', 'b', 'a', 'c', 'b', 'a'])

print('唯一值:', s.unique())
print('唯一值数量:', s.nunique())
print('计数:\n', s.value_counts())

# DataFrame
df = pd.DataFrame({
    'color': ['red', 'blue', 'red', 'green', 'blue'],
    'size': ['S', 'M', 'L', 'M', 'S']
})

print(df['color'].value_counts())
```

## 6. 第一个完整示例

```python
# 创建学生成绩数据
students = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'math': [85, 92, 78, 95, 88],
    'english': [90, 85, 88, 92, 95],
    'science': [88, 90, 85, 98, 92]
})

print('学生成绩表:')
print(students)

# 添加总分和平均分
students['total'] = students[['math', 'english', 'science']].sum(axis=1)
students['average'] = students[['math', 'english', 'science']].mean(axis=1)

print('\n添加总分和平均分后:')
print(students)

# 按总分排序
students_sorted = students.sort_values('total', ascending=False)
print('\n按总分排序:')
print(students_sorted)

# 统计分析
print('\n各科统计:')
print(students[['math', 'english', 'science']].describe())

# 找出数学成绩大于90的学生
high_math = students[students['math'] > 90]
print('\n数学成绩大于90的学生:')
print(high_math[['name', 'math']])
```

## 7. 常见问题

### Q1: Series vs DataFrame?

**Series:**
- 一维数据结构
- 类似带标签的数组
- 可以看作DataFrame的一列

**DataFrame:**
- 二维数据结构
- 类似电子表格或SQL表
- 由多个Series组成

### Q2: loc vs iloc?

- `loc` - 基于标签的索引
- `iloc` - 基于位置的索引

```python
df = pd.DataFrame({'A': [1, 2, 3]}, index=['x', 'y', 'z'])
print(df.loc['x'])   # 标签'x'
print(df.iloc[0])    # 位置0
```

### Q3: 如何处理缺失值?

```python
# 检测缺失值
df.isnull()
df.isna()

# 删除缺失值
df.dropna()

# 填充缺失值
df.fillna(0)
```

## 8. 练习题

1. 创建一个包含学生姓名、年龄、成绩的DataFrame
2. 添加一列表示成绩等级（A/B/C/D）
3. 筛选出成绩大于80的学生
4. 计算每个学生的平均成绩
5. 按成绩降序排序

## 💡 重点总结

1. **Series** - 一维数据结构，带标签的数组
2. **DataFrame** - 二维数据结构，类似表格
3. **索引** - 标签索引(loc) vs 位置索引(iloc)
4. **基本操作** - 选择、排序、统计
5. Pandas是基于NumPy构建的

---

**下一节：** [数据读取与写入](02-数据读取与写入.md)
