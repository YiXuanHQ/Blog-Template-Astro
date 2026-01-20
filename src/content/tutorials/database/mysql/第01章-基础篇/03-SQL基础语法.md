---
title: SQL基础语法
prevChapter: "java-backend/mysql/第01章-基础篇/02-数据库概念"
parentChapter: "java-backend/mysql/README"
---
# SQL基础语法

> 本章将系统学习SQL的四大语言：DDL（数据定义）、DML（数据操作）、DQL（数据查询）、DCL（数据控制），掌握SQL是操作数据库的核心技能。

## ⚡ 快速参考

- **SQL四大语言**：DDL（数据定义）、DML（数据操作）、DQL（数据查询）、DCL（数据控制）
- **DDL语句**：CREATE、ALTER、DROP（数据库、表、字段操作）
- **DML语句**：INSERT、UPDATE、DELETE（数据增删改）
- **DQL语句**：SELECT（数据查询，支持WHERE、GROUP BY、ORDER BY、LIMIT）
- **DCL语句**：GRANT、REVOKE（用户和权限管理）
- **数据类型**：数值类型（INT、DECIMAL）、字符串类型（VARCHAR、CHAR）、日期时间类型
- **聚合函数**：COUNT、SUM、AVG、MAX、MIN
- **执行顺序**：FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT

## 📚 学习目标

1. 掌握SQL的四大语言分类及其主要语句
2. 熟练使用DDL语句创建和管理数据库、表结构
3. 掌握DML语句进行数据的增删改操作
4. 深入理解DQL查询语句，包括条件查询、聚合函数、分组查询、排序和分页
5. 了解MySQL常用数据类型的选择和使用
6. 掌握DCL语句进行用户和权限管理
7. 理解SQL语句的执行顺序，避免常见错误

## 一、SQL语言概述

### 1.1 SQL的分类

SQL语言按照功能可以分为四大类：

| 分类 | 全称 | 主要语句 | 功能说明 |
|------|------|----------|----------|
| **DDL** | Data Definition Language（数据定义语言） | CREATE、ALTER、DROP | 用来定义数据库对象（数据库，表，字段） |
| **DML** | Data Manipulation Language（数据操作语言） | INSERT、UPDATE、DELETE | 用来对数据库表中的数据进行增删改 |
| **DQL** | Data Query Language（数据查询语言） | SELECT | 用来查询数据库中表的记录 |
| **DCL** | Data Control Language（数据控制语言） | GRANT、REVOKE | 用来创建数据库用户、控制数据库的访问权限 |

### 1.2 SQL语法规范

**注释方式：**

```sql
-- 单行注释（标准SQL注释）
# 这也是单行注释（MySQL特有）
/* 
   多行注释
   可以写多行内容
*/
```

**语法特点：**
- SQL语句可以单行或多行书写，以分号 `;` 结尾
- SQL语句不区分大小写，但关键字建议使用大写
- 字符串和日期时间使用单引号 `'` 包裹

---

### 1.3 连接数据库

在开始学习之前，需要先连接到MySQL数据库：

```bash
mysql -u root -p
```

**参数说明：**
- `-u`：指定用户名（root）
- `-p`：提示输入密码

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111163330667.png" alt="image-20260111163330667" style="zoom: 40%;" />

## 二、DDL数据定义语言

Data Definition Language，数据定义语言，用来定义数据库对象（数据库，表，字段）。

### 2.1 数据库操作

#### 查询数据库

```sql
-- 查询所有数据库
SHOW DATABASES;
```

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111162817906.png" alt="image-20260111162817906" style="zoom:50%;" />

```sql
-- 查询当前使用的数据库
SELECT DATABASE();
```

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111162853574.png" alt="image-20260111162853574" style="zoom:50%;" />

#### 创建数据库

```sql
-- 创建数据库（基本语法）
CREATE DATABASE test;
```

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111164335036.png" alt="image-20260111164335036" style="zoom:50%;" />

**注意**：在同一个数据库服务器中，不能创建两个名称相同的数据库，否则将会报错。

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111164350401.png" alt="image-20260111164350401" style="zoom:50%;" />

**推荐写法**：使用 `IF NOT EXISTS` 参数，数据库不存在则创建，存在则不创建。

```sql
-- 创建数据库（推荐语法）
CREATE DATABASE IF NOT EXISTS test DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**参数说明：**
- `IF NOT EXISTS`：如果数据库不存在则创建
- `DEFAULT CHARSET utf8mb4`：指定字符集为utf8mb4（支持中文和emoji）
- `COLLATE utf8mb4_unicode_ci`：指定排序规则

#### 删除数据库

```sql
-- 删除数据库（如果存在）
DROP DATABASE IF EXISTS test;
```

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111164442724.png" alt="image-20260111164442724" style="zoom:50%;" />

⚠️ **警告**：删除数据库会删除该数据库中的所有表和数据，操作不可恢复，请谨慎使用！

#### 使用数据库

```sql
-- 切换/使用数据库
USE test;
```

执行该语句后，后续的SQL操作将在指定的数据库中执行。



### 2.2 表操作

#### 创建表

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111165043183.png" alt="image-20260111165043183" style="zoom:50%;" />

**基本语法：**

```sql
CREATE TABLE [IF NOT EXISTS] 表名 (
    字段1 数据类型 [约束条件] [COMMENT '注释'],
    字段2 数据类型 [约束条件] [COMMENT '注释'],
    ...
    [表约束条件]
) [COMMENT '表注释'];
```

**示例：创建员工表**

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '员工ID',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    age INT COMMENT '年龄',
    department VARCHAR(50) COMMENT '部门',
    salary DECIMAL(10, 2) COMMENT '薪资',
    hire_date DATE COMMENT '入职日期'
) COMMENT '员工表';
```

**字段说明：**
- `id`：主键，自动递增
- `name`：姓名，非空字段
- `age`：年龄
- `department`：部门
- `salary`：薪资，精确到小数点后2位
- `hire_date`：入职日期



#### 查看表

**查看所有表：**

```sql
-- 查看当前数据库中的所有表
SHOW TABLES;
```

例如，我们可以切换到 `test01` 这个系统数据库，并查看系统数据库中的所有表结构。

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111164936344.png" alt="image-20260111164936344" style="zoom:50%;" />

**查看表结构：**

```sql
-- 查看表的字段结构
DESC employees;
-- 或者
DESCRIBE employees;
```

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111165058187.png" alt="image-20260111165058187" style="zoom:50%;" />

**查看建表语句：**

```sql
-- 查看创建表的完整SQL语句
SHOW CREATE TABLE employees;
```

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111165130309.png" alt="image-20260111165130309" style="zoom:50%;" />

#### 修改表

**基本语法：**

```sql
-- 修改表结构的基本语法
ALTER TABLE 表名 [操作类型] [操作内容];
```

**操作类型包括：**
- `ADD` - 添加字段或约束
- `MODIFY` - 修改字段类型
- `CHANGE` - 修改字段名和类型
- `DROP` - 删除字段或约束
- `RENAME` - 重命名表或字段



**添加字段：**

**语法：**
```sql
ALTER TABLE 表名 ADD 字段名 数据类型 [约束条件] [COMMENT '注释'] [位置];
```

**示例：**

```sql
-- 在表末尾添加新字段
ALTER TABLE employees ADD email VARCHAR(100) COMMENT '邮箱';

-- 在指定字段后添加新字段（在name字段后添加phone字段）
ALTER TABLE employees ADD phone VARCHAR(20) COMMENT '电话' AFTER name;

-- 在表开头添加新字段（FIRST：添加在第一个位置）
ALTER TABLE employees ADD code VARCHAR(20) COMMENT '工号' FIRST;
```



**修改字段：**

**语法：**
```sql
-- MODIFY：只修改字段类型（字段名不变）
ALTER TABLE 表名 MODIFY 字段名 新数据类型 [约束条件] [COMMENT '注释'];

-- CHANGE：修改字段名和类型
ALTER TABLE 表名 CHANGE 旧字段名 新字段名 数据类型 [约束条件] [COMMENT '注释'];
```

**示例：**

```sql
-- 修改字段类型（保持字段名不变）：将age字段改为TINYINT类型
ALTER TABLE employees MODIFY age TINYINT COMMENT '年龄';

-- 修改字段名和类型：将age字段改名为emp_age，并改为INT类型
ALTER TABLE employees CHANGE age emp_age INT COMMENT '员工年龄';
```



**删除字段：**

**语法：**
```sql
ALTER TABLE 表名 DROP 字段名;
```

**示例：**

```sql
-- 删除指定字段：删除email字段
ALTER TABLE employees DROP email;
```



**修改表名：**

**语法：**
```sql
-- 方式1：使用ALTER TABLE
ALTER TABLE 旧表名 RENAME TO 新表名;

-- 方式2：使用RENAME TABLE（可以同时重命名多个表）
RENAME TABLE 旧表名 TO 新表名;
```

**示例：**

```sql
-- 重命名表：将employees表改名为emp
ALTER TABLE employees RENAME TO emp;

-- 或者使用RENAME TABLE
RENAME TABLE employees TO emp;
```



**删除表：**

```sql
-- 删除表（如果存在）
DROP TABLE IF EXISTS employees;
```

⚠️ **警告**：删除表会永久删除表结构和所有数据，操作不可恢复！

**清空表数据：**

```sql
-- 清空表数据（保留表结构）
TRUNCATE TABLE employees;
```

**TRUNCATE vs DELETE：**
- `TRUNCATE`：快速清空表，重置自增ID，不能回滚
- `DELETE`：逐行删除，不重置自增ID，可以回滚（需要事务）

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111165243088.png" alt="image-20260111165243088" style="zoom:50%;" />

---

## 三、MySQL数据类型

选择合适的数据类型对于数据库设计和性能优化非常重要。

### 3.1 数值类型

| 类型 | 字节 | 有符号范围 | 无符号范围 | 用途 |
|------|------|-----------|-----------|------|
| TINYINT | 1 | -128~127 | 0~255 | 年龄、状态、布尔值 |
| SMALLINT | 2 | -32768~32767 | 0~65535 | 小范围整数 |
| MEDIUMINT | 3 | -8388608~8388607 | 0~16777215 | 中等范围整数 |
| INT | 4 | -2^31~2^31-1 | 0~2^32-1 | 主键、数量、常用整数 |
| BIGINT | 8 | -2^63~2^63-1 | 0~2^64-1 | 大数值、自增主键 |
| DECIMAL(M,D) | 变长 | 精确小数 | 精确小数 | 金额、价格（推荐） |
| FLOAT | 4 | 单精度浮点数 | 单精度浮点数 | 科学计算 |
| DOUBLE | 8 | 双精度浮点数 | 双精度浮点数 | 科学计算 |

**使用建议：**
- 金额使用 `DECIMAL`，避免精度丢失
- 主键通常使用 `INT` 或 `BIGINT`
- 状态、布尔值使用 `TINYINT`
- 科学计算使用 `FLOAT` 或 `DOUBLE`

### 3.2 字符串类型

| 类型 | 最大长度 | 存储方式 | 说明 |
|------|---------|---------|------|
| CHAR(n) | 255字符 | 固定长度 | 定长字符串，适合固定长度数据 |
| VARCHAR(n) | 65535字符 | 可变长度 | 变长字符串，适合长度变化的数据 |
| TINYTEXT | 255字符 | 可变长度 | 短文本 |
| TEXT | 65535字符 | 可变长度 | 长文本 |
| MEDIUMTEXT | 16777215字符 | 可变长度 | 中等长度文本 |
| LONGTEXT | 4294967295字符 | 可变长度 | 超长文本 |

**CHAR vs VARCHAR：**

| 对比项 | CHAR | VARCHAR |
|--------|------|---------|
| **存储方式** | 固定长度，不足补空格 | 可变长度，只存储实际内容 |
| **存储空间** | 总是占用n个字节 | 实际长度+1或+2字节 |
| **性能** | 查询速度快 | 查询速度相对较慢 |
| **适用场景** | 固定长度数据（如：性别、省份代码、手机号） | 长度变化的数据（如：姓名、地址、描述） |

**使用建议：**
- 固定长度用 `CHAR`（如性别：M/F、省份代码、邮编）
- 可变长度用 `VARCHAR`（如姓名、地址、描述）
- 超过255字符的长文本使用 `TEXT` 系列

### 3.3 日期时间类型

| 类型 | 大小 | 格式 | 范围 | 说明 |
|------|------|------|------|------|
| DATE | 3字节 | YYYY-MM-DD | 1000-01-01 ~ 9999-12-31 | 日期，只存储日期 |
| TIME | 3字节 | HH:MM:SS | -838:59:59 ~ 838:59:59 | 时间，只存储时间 |
| YEAR | 1字节 | YYYY | 1901 ~ 2155 | 年份值 |
| DATETIME | 8字节 | YYYY-MM-DD HH:MM:SS | 1000-01-01 00:00:00 ~ 9999-12-31 23:59:59 | 日期时间，不受时区影响 |
| TIMESTAMP | 4字节 | YYYY-MM-DD HH:MM:SS | 1970-01-01 00:00:01 ~ 2038-01-19 03:14:07 | 时间戳，受时区影响，自动更新 |

**DATETIME vs TIMESTAMP：**

| 对比项 | DATETIME | TIMESTAMP |
|--------|----------|-----------|
| **时区** | 不受时区影响 | 受时区影响，存储时转换为UTC |
| **范围** | 1000-9999年 | 1970-2038年 |
| **存储** | 8字节 | 4字节 |
| **自动更新** | 不支持 | 支持（可设置自动更新当前时间） |
| **推荐使用** | 业务时间（如：订单时间、生日） | 记录时间（如：创建时间、更新时间） |

---

## 四、DML数据操作语言

### 4.1 插入数据

**基本语法：**

```sql
INSERT INTO 表名 (字段1, 字段2, ...) VALUES (值1, 值2, ...);
```

**插入单条记录：**

```sql
-- 指定字段插入：插入姓名、年龄、部门三个字段的数据
INSERT INTO employees (name, age, department) VALUES ('张三', 28, '技术部');

-- 插入所有字段：需要提供表中所有字段的值（包括id主键）
INSERT INTO employees VALUES (1, '张三', 28, '技术部', 10000.00, '2023-01-01');
```

**批量插入：**

```sql
-- 批量插入多条记录：一次性插入三条员工记录（推荐方式，效率高）
INSERT INTO employees (name, age, department) VALUES
('张三', 28, '技术部'),
('李四', 32, '销售部'),
('王五', 25, '技术部');
```

**注意事项：**
- 字段和值的数量必须一致
- 字段顺序和值顺序必须对应
- 字符和日期时间使用单引号包裹
- 自增字段可以不指定值

<img src="https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260111165216549.png" alt="image-20260111165216549" style="zoom:50%;" />

### 4.2 修改数据

**基本语法：**

```sql
UPDATE 表名 SET 字段1 = 值1, 字段2 = 值2, ... WHERE 条件;
```

**修改单条记录：**

```sql
-- 修改指定记录的薪水：更新id为1的员工的薪水为10000
UPDATE employees SET salary = 10000 WHERE id = 1;

-- 同时修改多个字段：更新id为1的员工的薪水和部门
UPDATE employees SET salary = 10000, department = '研发部' WHERE id = 1;
```

**修改多条记录：**

```sql
-- 批量修改：将技术部所有员工的薪水提高10%（乘以1.1）
UPDATE employees SET salary = salary * 1.1 WHERE department = '技术部';

-- 批量修改：所有员工的年龄加1（不加WHERE条件会修改所有记录）
UPDATE employees SET age = age + 1;
```

⚠️ **重要警告**：UPDATE语句不加WHERE子句会修改所有记录！操作前请务必确认WHERE条件。

### 4.3 删除数据

**基本语法：**

```sql
DELETE FROM 表名 WHERE 条件;
```

**删除指定记录：**

```sql
-- 删除指定ID的记录：删除id为10的员工记录
DELETE FROM employees WHERE id = 10;

-- 删除满足条件的所有记录：删除年龄大于60的所有员工记录
DELETE FROM employees WHERE age > 60;
```

⚠️ **重要警告**：DELETE语句不加WHERE子句会删除所有记录！操作前请务必确认WHERE条件。

**删除所有记录：**

```sql
-- 方式1：DELETE删除所有记录（可以回滚，但速度较慢）
DELETE FROM employees;

-- 方式2：TRUNCATE清空表数据（不能回滚，速度更快，会重置自增ID）
TRUNCATE TABLE employees;
```

---

## 五、DQL数据查询语言

### 5.1 基础查询

```sql
-- 查询所有字段
SELECT * FROM employees;

-- 查询指定字段
SELECT name, age, department FROM employees;

-- 字段别名
SELECT name AS '姓名', age AS '年龄' FROM employees;

-- 去重
SELECT DISTINCT department FROM employees;
```

### 5.2 条件查询

**比较运算符：**

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `=` | 等于 | `age = 28` |
| `!=` 或 `<>` | 不等于 | `age != 28` |
| `>` | 大于 | `age > 25` |
| `>=` | 大于等于 | `age >= 25` |
| `<` | 小于 | `age < 30` |
| `<=` | 小于等于 | `age <= 30` |
| `BETWEEN...AND...` | 在某个范围内（包含边界） | `age BETWEEN 25 AND 35` |
| `IN(...)` | 在列表中 | `department IN ('技术部', '销售部')` |

**示例：**

```sql
-- 等于查询
SELECT * FROM employees WHERE age = 28;

-- 范围查询
SELECT * FROM employees WHERE age BETWEEN 25 AND 35;
-- 等价于：WHERE age >= 25 AND age <= 35

-- IN查询
SELECT * FROM employees WHERE department IN ('技术部', '销售部');
-- 等价于：WHERE department = '技术部' OR department = '销售部'
```

**模糊查询（LIKE）：**

| 通配符 | 说明 | 示例 |
|--------|------|------|
| `%` | 匹配任意多个字符（0个或多个） | `'张%'` 匹配"张"开头 |
| `_` | 匹配单个字符（1个） | `'张_'` 匹配"张"后跟1个字符 |

**示例：**

```sql
-- 以"张"开头
SELECT * FROM employees WHERE name LIKE '张%';

-- 包含"明"
SELECT * FROM employees WHERE name LIKE '%明%';

-- "张"后跟1个字符
SELECT * FROM employees WHERE name LIKE '张_';

-- "张"后跟2个字符
SELECT * FROM employees WHERE name LIKE '张__';
```

**NULL查询：**

```sql
-- 查询NULL值
SELECT * FROM employees WHERE email IS NULL;

-- 查询非NULL值
SELECT * FROM employees WHERE email IS NOT NULL;
```

**逻辑运算符：**

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `AND` 或 `&&` | 并且（多个条件都满足） | `age > 25 AND department = '技术部'` |
| `OR` 或 `\|\|` | 或者（满足其中一个条件） | `age > 30 OR age < 20` |
| `NOT` 或 `!` | 非（取反） | `NOT age > 25` |

**示例：**

```sql
-- AND：多个条件同时满足
SELECT * FROM employees 
WHERE department = '技术部' AND age > 25;

-- OR：满足其中一个条件
SELECT * FROM employees 
WHERE department = '技术部' OR department = '销售部';

-- NOT：取反
SELECT * FROM employees 
WHERE NOT age > 30;
-- 等价于：WHERE age <= 30
```

### 5.3 聚合函数

聚合函数用于对一组值进行计算并返回单个值。

| 函数 | 说明 | 示例 |
|------|------|------|
| `COUNT()` | 统计数量 | `COUNT(*)` 统计所有记录数 |
| `AVG()` | 计算平均值 | `AVG(age)` 计算平均年龄 |
| `SUM()` | 求和 | `SUM(salary)` 计算薪资总和 |
| `MAX()` | 求最大值 | `MAX(salary)` 最高薪资 |
| `MIN()` | 求最小值 | `MIN(salary)` 最低薪资 |

**示例：**

```sql
-- 统计员工总数
SELECT COUNT(*) FROM employees;
SELECT COUNT(id) FROM employees;  -- 统计非NULL的id数量
SELECT COUNT(DISTINCT department) FROM employees;  -- 统计不重复的部门数

-- 计算平均年龄
SELECT AVG(age) FROM employees;
SELECT AVG(age) AS avg_age FROM employees;  -- 使用别名

-- 计算薪资总和
SELECT SUM(salary) FROM employees;

-- 查询最高和最低薪资
SELECT MAX(salary), MIN(salary) FROM employees;

-- 组合使用
SELECT 
    COUNT(*) AS total,
    AVG(age) AS avg_age,
    MAX(salary) AS max_salary,
    MIN(salary) AS min_salary,
    SUM(salary) AS total_salary
FROM employees;
```

### 5.4 分组查询

**基本语法：**

```sql
SELECT 字段列表 FROM 表名 [WHERE 条件] GROUP BY 分组字段 [HAVING 分组后过滤条件];
```

**按部门分组统计人数：**

```sql
-- 按部门分组，统计每个部门的人数
SELECT department, COUNT(*) AS count
FROM employees 
GROUP BY department;
```

**分组后过滤（HAVING）：**

```sql
-- 统计人数大于5的部门
SELECT department, COUNT(*) AS cnt
FROM employees 
GROUP BY department 
HAVING cnt > 5;
```

**WHERE vs HAVING：**

| 对比项 | WHERE | HAVING |
|--------|-------|--------|
| **执行时机** | 在分组之前进行过滤 | 在分组之后进行过滤 |
| **可以使用聚合函数** | 不可以 | 可以 |
| **可以使用字段别名** | 不可以 | 可以（某些数据库） |
| **作用对象** | 原始表的记录 | 分组后的结果 |

**示例：**

```sql
-- 查询年龄大于20的员工，按部门分组，统计平均年龄大于30的部门
SELECT department, AVG(age) AS avg_age
FROM employees 
WHERE age > 20                    -- 分组前过滤：筛选年龄>20的记录
GROUP BY department 
HAVING avg_age > 30;              -- 分组后过滤：筛选平均年龄>30的部门
```

**执行顺序说明：**
1. 先执行 WHERE 过滤原始数据
2. 然后执行 GROUP BY 分组
3. 再执行聚合函数计算
4. 最后执行 HAVING 过滤分组结果

### 5.5 排序查询

```sql
-- 升序（默认）
SELECT * FROM employees ORDER BY age ASC;

-- 降序
SELECT * FROM employees ORDER BY salary DESC;

-- 多字段排序
SELECT * FROM employees ORDER BY department ASC, salary DESC;
```

### 5.6 分页查询

分页查询用于限制返回的记录数量，常用于分页显示。

**基本语法：**

```sql
SELECT * FROM 表名 LIMIT 起始索引, 查询记录数;
-- 或者
SELECT * FROM 表名 LIMIT 查询记录数 OFFSET 起始索引;
```

**示例：**

```sql
-- 第1页（每页10条）
SELECT * FROM employees LIMIT 0, 10;
SELECT * FROM employees LIMIT 10;      -- 起始为0时可以省略

-- 第2页
SELECT * FROM employees LIMIT 10, 10;

-- 第3页
SELECT * FROM employees LIMIT 20, 10;
```

**分页计算公式：**

```
起始索引 = (页码 - 1) × 每页记录数
```

**示例计算：**
- 第1页，每页10条：起始索引 = (1-1) × 10 = 0，LIMIT 0, 10
- 第2页，每页10条：起始索引 = (2-1) × 10 = 10，LIMIT 10, 10
- 第3页，每页10条：起始索引 = (3-1) × 10 = 20，LIMIT 20, 10

**完整分页查询示例：**

```sql
-- 查询第2页的员工，每页5条，按薪资降序排列
SELECT * FROM employees 
ORDER BY salary DESC 
LIMIT 5, 5;
```

---

## 六、DCL数据控制语言

### 6.1 用户管理

```sql
-- 创建用户（只能本地访问）
CREATE USER 'user1'@'localhost' IDENTIFIED BY '123456';

-- 创建用户（任意主机访问）
CREATE USER 'user2'@'%' IDENTIFIED BY '123456';

-- 修改密码
ALTER USER 'user1'@'localhost' IDENTIFIED BY '新密码';

-- 删除用户
DROP USER 'user1'@'localhost';
```

### 6.2 权限管理

```sql
-- 查询权限
SHOW GRANTS FOR 'user1'@'localhost';

-- 授予权限
GRANT SELECT, INSERT ON test01.* TO 'user1'@'localhost';
GRANT ALL ON test01.* TO 'user1'@'localhost';

-- 撤销权限
REVOKE SELECT, INSERT ON test01.* FROM 'user1'@'localhost';
```

**常用权限**：SELECT、INSERT、UPDATE、DELETE、ALTER、DROP、CREATE

---

## 七、本章总结

### 7.2 核心要点

1. **DDL（数据定义语言）**：定义数据库和表结构
   - 数据库操作：CREATE、DROP、USE
   - 表操作：CREATE、ALTER、DROP、TRUNCATE

2. **DML（数据操作语言）**：增删改数据
   - INSERT：插入数据
   - UPDATE：更新数据（注意WHERE条件）
   - DELETE：删除数据（注意WHERE条件）

3. **DQL（数据查询语言）**：查询数据（最重要）
   - 基础查询：SELECT、WHERE、ORDER BY、LIMIT
   - 聚合函数：COUNT、SUM、AVG、MAX、MIN
   - 分组查询：GROUP BY、HAVING

4. **DCL（数据控制语言）**：用户和权限管理
   - 用户管理：CREATE USER、ALTER USER、DROP USER
   - 权限管理：GRANT、REVOKE

### 7.1 DQL执行顺序

DQL（SELECT语句）的执行顺序很重要，理解执行顺序有助于编写正确的查询语句。

**执行顺序：**

```
1. FROM       -- 确定查询的表
2. WHERE      -- 过滤原始数据
3. GROUP BY   -- 分组
4. HAVING     -- 过滤分组结果
5. SELECT     -- 选择字段
6. ORDER BY   -- 排序
7. LIMIT      -- 分页
```

**示例说明：**

```sql
SELECT department, AVG(age) AS avg_age
FROM employees                    -- 1. 从employees表查询
WHERE age > 20                    -- 2. 过滤年龄>20的记录
GROUP BY department               -- 3. 按部门分组
HAVING avg_age > 30              -- 4. 过滤平均年龄>30的部门
ORDER BY avg_age DESC            -- 5. 按平均年龄降序排列
LIMIT 10;                        -- 6. 只返回前10条
```

**注意事项：**
- WHERE子句中不能使用SELECT中定义的别名
- HAVING子句中可以使用聚合函数和别名
- ORDER BY子句中可以使用别名

### 7.3 学习建议

1. ✅ **熟练掌握CRUD操作**：Create（插入）、Read（查询）、Update（更新）、Delete（删除）
2. ✅ **理解聚合函数和分组查询**：COUNT、SUM、AVG、GROUP BY、HAVING的区别和使用场景
3. ✅ **掌握条件查询和模糊匹配**：WHERE、LIKE、IN、BETWEEN等运算符
4. ✅ **理解执行顺序**：掌握SQL语句的执行顺序，避免常见错误
5. ✅ **多练习实际案例**：通过实际案例加深理解，提高SQL编写能力
6. ✅ **注意安全**：UPDATE和DELETE操作务必加上WHERE条件，避免误操作

---

## 八、练习题

### 8.1 基础练习

按照以下步骤完成练习题：

```sql
-- 1. 创建学生表
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT,
    class VARCHAR(20),
    score DECIMAL(5,2)
);

-- 2. 插入数据
INSERT INTO students (name, age, class, score) VALUES
('张三', 20, '一班', 85.5),
('李四', 21, '二班', 92.0),
('王五', 20, '一班', 78.5),
('赵六', 22, '一班', 88.0);

-- 3. 查询所有学生
SELECT * FROM students;

-- 4. 查询一班学生
SELECT * FROM students WHERE class = '一班';

-- 5. 查询年龄大于20的学生
SELECT * FROM students WHERE age > 20;

-- 6. 按班级分组统计人数
SELECT class, COUNT(*) FROM students GROUP BY class;

-- 7. 查询平均分大于80的班级
SELECT class, AVG(score) AS avg_score
FROM students 
GROUP BY class 
HAVING avg_score > 80;

-- 8. 按分数降序排列
SELECT * FROM students ORDER BY score DESC;

-- 9. 查询每个班级的最高分和最低分
SELECT class, MAX(score) AS max_score, MIN(score) AS min_score
FROM students
GROUP BY class;

-- 10. 分页查询：查询第2页学生（每页2条）
SELECT * FROM students LIMIT 2, 2;
```

### 8.2 进阶练习

1. **创建商品表**，包含字段：商品ID（主键）、商品名称、价格、库存、分类
2. **批量插入10条商品数据**
3. **查询价格在50-200之间的商品**
4. **按分类统计商品数量和平均价格**
5. **查询每个分类中价格最高的商品**

---

**上一章：** [数据库概念](/tutorials/java-backend/mysql/第01章-基础篇/02-数据库概念/)

**下一章：** [函数详解](/tutorials/java-backend/mysql/第02章-进阶篇/01-函数详解/) →
