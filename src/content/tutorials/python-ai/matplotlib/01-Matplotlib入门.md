---
title: Matplotlib 入门
nextChapter: "python-ai/matplotlib/02-基本图表"
parentChapter: "python-ai/matplotlib/README"
---
# Matplotlib 入门

> 了解Matplotlib，开启数据可视化之旅

## 📚 学习目标

- 理解什么是Matplotlib
- 掌握安装和导入
- 理解Figure和Axes
- 掌握基本绘图流程
- 学会保存图表

## 1. Matplotlib 简介

### 1.1 什么是Matplotlib

Matplotlib 是Python中最流行的绘图库：
- 功能强大，支持各种图表类型
- 高度可定制，可以精细控制图表元素
- 支持多种输出格式（PNG、PDF、SVG等）
- 与NumPy、Pandas无缝集成
- 类似MATLAB的绘图接口

### 1.2 安装Matplotlib

```bash
# 使用pip安装
pip install matplotlib

# 使用conda安装
conda install matplotlib

# 安装特定版本
pip install matplotlib==3.7.0

# 验证安装
python -c "import matplotlib; print(matplotlib.__version__)"
```

### 1.3 导入Matplotlib

```python
import matplotlib.pyplot as plt
import numpy as np

# 查看版本
print(plt.matplotlib.__version__)

# Jupyter Notebook中内联显示
%matplotlib inline

# 高分辨率显示
%config InlineBackend.figure_format = 'retina'
```

## 2. 第一个图表

### 2.1 最简单的例子

```python
import matplotlib.pyplot as plt

# 数据
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

# 绘制
plt.plot(x, y)
plt.show()
```

### 2.2 添加标题和标签

```python
plt.plot(x, y)
plt.title('My First Plot')
plt.xlabel('X Axis')
plt.ylabel('Y Axis')
plt.show()
```

### 2.3 使用NumPy数据

```python
import numpy as np

x = np.linspace(0, 2*np.pi, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title('Sine Wave')
plt.xlabel('X')
plt.ylabel('sin(x)')
plt.grid(True)
plt.show()
```

## 3. Figure 和 Axes

### 3.1 理解层次结构

```python
# Figure - 整个图形窗口
# Axes - 绘图区域（子图）
# Axis - 坐标轴

# 创建Figure和Axes
fig = plt.figure(figsize=(10, 6))
ax = fig.add_subplot(111)

ax.plot([1, 2, 3], [1, 4, 9])
ax.set_title('Title')
ax.set_xlabel('X')
ax.set_ylabel('Y')
plt.show()
```

### 3.2 两种接口

```python
# 1. pyplot接口（状态机风格）
plt.plot([1, 2, 3], [1, 4, 9])
plt.title('pyplot interface')
plt.show()

# 2. 面向对象接口（推荐）
fig, ax = plt.subplots()
ax.plot([1, 2, 3], [1, 4, 9])
ax.set_title('Object-oriented interface')
plt.show()
```

### 3.3 创建多个子图

```python
# 创建2x2的子图
fig, axes = plt.subplots(2, 2, figsize=(10, 8))

# 访问子图
axes[0, 0].plot([1, 2, 3], [1, 4, 9])
axes[0, 0].set_title('Subplot 1')

axes[0, 1].plot([1, 2, 3], [9, 4, 1])
axes[0, 1].set_title('Subplot 2')

axes[1, 0].plot([1, 2, 3], [1, 2, 3])
axes[1, 0].set_title('Subplot 3')

axes[1, 1].plot([1, 2, 3], [3, 2, 1])
axes[1, 1].set_title('Subplot 4')

plt.tight_layout()
plt.show()
```

## 4. 基本绘图流程

### 4.1 标准流程

```python
# 1. 准备数据
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# 2. 创建图形和坐标轴
fig, ax = plt.subplots(figsize=(10, 6))

# 3. 绘制数据
ax.plot(x, y1, label='sin(x)')
ax.plot(x, y2, label='cos(x)')

# 4. 设置标题和标签
ax.set_title('Sine and Cosine Waves', fontsize=16)
ax.set_xlabel('X', fontsize=12)
ax.set_ylabel('Y', fontsize=12)

# 5. 添加图例
ax.legend()

# 6. 添加网格
ax.grid(True, alpha=0.3)

# 7. 显示图表
plt.show()
```

### 4.2 常用设置

```python
fig, ax = plt.subplots(figsize=(10, 6))

# 绘制数据
ax.plot(x, y, color='blue', linewidth=2, 
        linestyle='--', marker='o', markersize=5)

# 设置坐标轴范围
ax.set_xlim(0, 10)
ax.set_ylim(-1.5, 1.5)

# 设置刻度
ax.set_xticks([0, 2, 4, 6, 8, 10])
ax.set_yticks([-1, 0, 1])

# 添加标题
ax.set_title('Custom Plot', pad=20)

plt.show()
```

## 5. 保存图表

### 5.1 基本保存

```python
plt.plot([1, 2, 3], [1, 4, 9])
plt.title('Save Example')

# 保存为PNG
plt.savefig('plot.png')

# 保存为PDF
plt.savefig('plot.pdf')

# 保存为SVG
plt.savefig('plot.svg')

plt.show()
```

### 5.2 高级保存选项

```python
plt.plot([1, 2, 3], [1, 4, 9])

plt.savefig('plot.png',
    dpi=300,              # 分辨率
    bbox_inches='tight',  # 紧凑布局
    transparent=True,     # 透明背景
    facecolor='white',    # 背景颜色
    edgecolor='none'      # 边框颜色
)

plt.show()
```

## 6. 中文显示配置

### 6.1 设置中文字体

```python
import matplotlib.pyplot as plt

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']  # Windows
# plt.rcParams['font.sans-serif'] = ['Arial Unicode MS']  # macOS
# plt.rcParams['font.sans-serif'] = ['DejaVu Sans']  # Linux

# 解决负号显示问题
plt.rcParams['axes.unicode_minus'] = False

# 测试
plt.plot([1, 2, 3], [1, 4, 9])
plt.title('中文标题')
plt.xlabel('X轴')
plt.ylabel('Y轴')
plt.show()
```

### 6.2 临时设置字体

```python
from matplotlib.font_manager import FontProperties

# 指定字体
font = FontProperties(fname='path/to/font.ttf', size=14)

plt.plot([1, 2, 3], [1, 4, 9])
plt.title('中文标题', fontproperties=font)
plt.show()
```

## 7. 常见配置

### 7.1 全局配置

```python
# 设置图表大小
plt.rcParams['figure.figsize'] = (10, 6)

# 设置字体大小
plt.rcParams['font.size'] = 12

# 设置线宽
plt.rcParams['lines.linewidth'] = 2

# 设置DPI
plt.rcParams['figure.dpi'] = 100

# 设置样式
plt.style.use('seaborn')
```

### 7.2 查看和重置配置

```python
# 查看所有配置
print(plt.rcParams.keys())

# 查看特定配置
print(plt.rcParams['figure.figsize'])

# 重置为默认
plt.rcdefaults()
```

## 8. 实战示例

### 示例1：简单的数据可视化

```python
import numpy as np
import matplotlib.pyplot as plt

# 生成数据
np.random.seed(42)
x = np.arange(1, 11)
y = np.random.randint(10, 50, 10)

# 创建图表
fig, ax = plt.subplots(figsize=(10, 6))

# 绘制柱状图
bars = ax.bar(x, y, color='skyblue', edgecolor='navy', alpha=0.7)

# 在柱子上添加数值
for bar in bars:
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height,
            f'{int(height)}',
            ha='center', va='bottom')

# 设置标题和标签
ax.set_title('Sales by Month', fontsize=16, fontweight='bold')
ax.set_xlabel('Month', fontsize=12)
ax.set_ylabel('Sales', fontsize=12)

# 设置刻度
ax.set_xticks(x)
ax.set_xticklabels([f'M{i}' for i in x])

# 添加网格
ax.grid(axis='y', alpha=0.3, linestyle='--')

plt.tight_layout()
plt.show()
```

### 示例2：多条曲线对比

```python
# 生成数据
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.sin(x + np.pi/4)
y3 = np.sin(x + np.pi/2)

# 创建图表
fig, ax = plt.subplots(figsize=(12, 6))

# 绘制多条曲线
ax.plot(x, y1, label='sin(x)', linewidth=2, color='blue')
ax.plot(x, y2, label='sin(x+π/4)', linewidth=2, color='red')
ax.plot(x, y3, label='sin(x+π/2)', linewidth=2, color='green')

# 设置标题和标签
ax.set_title('Sine Wave Comparison', fontsize=16)
ax.set_xlabel('X', fontsize=12)
ax.set_ylabel('Y', fontsize=12)

# 添加图例
ax.legend(loc='upper right', fontsize=10)

# 添加网格
ax.grid(True, alpha=0.3)

# 设置y轴范围
ax.set_ylim(-1.5, 1.5)

plt.tight_layout()
plt.show()
```

## 9. 常见问题

### Q1: 图表不显示？

```python
# 确保在最后调用show()
plt.plot([1, 2, 3])
plt.show()  # 必须调用

# 或者开启交互模式
plt.ion()  # 交互模式开启
plt.plot([1, 2, 3])
```

### Q2: 中文乱码？

```python
# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False
```

### Q3: 图表重叠？

```python
# 使用tight_layout()
plt.tight_layout()

# 或者调整子图间距
plt.subplots_adjust(hspace=0.3, wspace=0.3)
```

## 10. 练习题

1. 绘制一个简单的折线图
2. 创建一个2x2的子图网格
3. 绘制正弦和余弦曲线对比图
4. 保存图表为高分辨率PNG
5. 设置中文标题和标签

## 💡 重点总结

1. **Matplotlib** 是Python最基础的绘图库
2. **Figure** 是整个图形，**Axes** 是绘图区域
3. **pyplot** 接口简单，**面向对象** 接口更灵活
4. 使用 `plt.show()` 显示图表
5. 使用 `plt.savefig()` 保存图表
6. 需要配置中文字体才能显示中文

---

**下一节：** [基本图表](02-基本图表.md)
