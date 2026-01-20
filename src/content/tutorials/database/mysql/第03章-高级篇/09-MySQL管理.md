---
title: MySQL管理
prevChapter: "java-backend/mysql/第03章-高级篇/08-InnoDB引擎"
parentChapter: "java-backend/mysql/README"
---
# MySQL管理

> MySQL管理包括系统数据库的了解、常用工具的使用、数据库备份与恢复等。本章学习MySQL的管理工具和常用操作，掌握MySQL管理是运维数据库的基础技能。

## ⚡ 快速参考

- **系统数据库**：mysql（用户权限）、information_schema（元数据）、performance_schema（性能监控）、sys（性能调优视图）
- **常用工具**：mysql（命令行客户端）、mysqladmin（管理工具）、mysqldump（备份工具）、mysqlimport（导入工具）
- **数据库备份**：mysqldump（逻辑备份）、物理备份（文件复制）、binlog（二进制日志备份）
- **数据库恢复**：source命令、mysql命令、物理恢复
- **用户管理**：CREATE USER、ALTER USER、DROP USER、GRANT、REVOKE
- **权限管理**：全局权限、数据库权限、表权限、列权限
- **性能监控**：SHOW PROCESSLIST、SHOW STATUS、SHOW VARIABLES、EXPLAIN

## 📚 学习目标

1. 理解MySQL系统数据库的作用和用途
2. 掌握MySQL常用管理工具的使用方法
3. 掌握数据库备份的方法和策略（逻辑备份、物理备份）
4. 掌握数据库恢复的操作步骤
5. 理解用户和权限管理的概念，掌握用户创建和权限授予
6. 掌握性能监控工具的使用，能够分析数据库性能
7. 理解日志文件的作用和管理方法
8. 掌握MySQL日常管理的最佳实践

## 一、系统数据库

MySQL数据库安装完成后，自带了以下四个数据库，具体作用如下：

| 数据库 | 含义 |
|--------|------|
| **mysql** | 存储MySQL服务器正常运行所需要的各种信息（时区、主从、用户、权限等） |
| **information_schema** | 提供了访问数据库元数据的各种表和视图，包含数据库、表、字段类型及访问权限等 |
| **performance_schema** | 为MySQL服务器运行时状态提供了一个底层监控功能，主要用于收集数据库服务器性能参数 |
| **sys** | 包含了一系列方便 DBA 和开发人员利用 performance_schema 性能数据库进行性能调优和诊断的视图 |

### 1.1 mysql 系统库

存储MySQL服务器正常运行所需的各种信息：
- 用户权限信息
- 时区信息
- 主从复制信息
- 系统变量配置

```sql
-- 查看系统库中的表
USE mysql;
SHOW TABLES;

-- 查看用户信息
SELECT * FROM user;

-- 查看权限信息
SELECT * FROM db;
```

### 1.2 information_schema 系统库

提供了访问数据库元数据的各种表和视图：

```sql
-- 查看所有数据库
SELECT * FROM information_schema.SCHEMATA;

-- 查看所有表
SELECT * FROM information_schema.TABLES;

-- 查看表结构
SELECT * FROM information_schema.COLUMNS WHERE TABLE_NAME = 'users';

-- 查看索引信息
SELECT * FROM information_schema.STATISTICS;
```

### 1.3 performance_schema 系统库

提供底层监控功能，收集数据库服务器性能参数：

```sql
-- 查看性能相关的表
SELECT * FROM performance_schema.events_statements_summary_by_digest;

-- 查看锁信息
SELECT * FROM performance_schema.data_locks;
```

### 1.4 sys 系统库

包含性能调优和诊断的视图：

```sql
-- 查看慢查询
SELECT * FROM sys.statements_with_full_table_scans;

-- 查看未使用的索引
SELECT * FROM sys.schema_unused_indexes;
```

---

## 二、常用工具

### 2.1 mysql

该mysql不是指mysql服务，而是指mysql的客户端工具。

**语法：**
```bash
mysql [options] [database]
```

**选项：**
- `-u, --user=name` # 指定用户名
- `-p, --password[=name]` # 指定密码
- `-h, --host=name` # 指定服务器IP或域名
- `-P, --port=port` # 指定连接端口
- `-e, --execute=name` # 执行SQL语句并退出

**示例：**

```bash
# 连接MySQL数据库
mysql -uroot -p123456

# 连接到指定数据库
mysql -uroot -p123456 db01

# 执行SQL语句并退出（不需要进入MySQL命令行）
mysql -uroot -p123456 db01 -e "select * from stu"

# 执行SQL脚本
mysql -uroot -p123456 db01 < script.sql

# 指定主机和端口连接
mysql -h192.168.1.100 -P3306 -uroot -p123456
```

**`-e`选项的应用场景：**
- 在批处理脚本中执行SQL语句
- 不需要交互式连接的场景
- 自动化脚本中的数据库操作

```bash
#!/bin/bash
# 批量执行SQL语句
mysql -uroot -p123456 db01 -e "SELECT COUNT(*) FROM users"
mysql -uroot -p123456 db01 -e "SELECT * FROM products WHERE stock < 10"
```

![image-20260112201021551](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201021551.png)

### 2.2 mysqladmin

mysqladmin 是一个执行管理操作的客户端程序。可以用它来检查服务器的配置和当前状态、创建并删除数据库等。

**语法：**
```bash
mysqladmin [options] command ...
```

**选项：**
- `-u, --user=name` # 指定用户名
- `-p, --password[=name]` # 指定密码
- `-h, --host=name` # 指定服务器IP或域名
- `-P, --port=port` # 指定连接端口

**常用命令：**
```bash
# 查看帮助文档
mysqladmin --help

# 创建数据库
mysqladmin -uroot -p1234 create test01

# 删除数据库
mysqladmin -uroot -p1234 drop test01

# 查看MySQL版本
mysqladmin -uroot -p1234 version

# 查看服务器状态
mysqladmin -uroot -p1234 status

# 刷新日志
mysqladmin -uroot -p1234 flush-logs

# 刷新权限
mysqladmin -uroot -p1234 flush-privileges

# 关闭MySQL服务
mysqladmin -uroot -p1234 shutdown

# 查看所有变量
mysqladmin -uroot -p1234 variables
```

![image-20260112201210530](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201210530.png)

**示例：**

```bash
# 删除数据库（需要确认）
mysqladmin -uroot -p1234 drop 'test01'

# 查看版本信息
mysqladmin -uroot -p1234 version
```

![image-20260112201220595](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201220595.png)

### 2.3 mysqlbinlog

由于服务器生成的二进制日志文件以二进制格式保存，所以如果想要检查这些文本的文本格式，就会使用到mysqlbinlog 日志管理工具。

**语法：**
```bash
mysqlbinlog [options] log-files1 log-files2 ...
```

**选项：**
- `-d, --database=name` 指定数据库名称，只列出指定的数据库相关操作。
- `-o, --offset=#` 忽略掉日志中的前n行命令。
- `-r, --result-file=name` 将输出的文本格式日志输出到指定文件。
- `-s, --short-form` 显示简单格式，省略掉一些信息。
- `--start-datetime=date1 --stop-datetime=date2` 指定日期间隔内的所有日志。
- `--start-position=pos1 --stop-position=pos2` 指定位置间隔内的所有日志。

**示例：**

**A. 查看二进制日志文件**

```bash
# 查看二进制日志文件内容
mysqlbinlog /var/lib/mysql/binlog.000008

# 显示简单格式（省略详细信息）
mysqlbinlog -s /var/lib/mysql/binlog.000008
```

![image-20260112201230000](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201230000.png)

上述查看到的二进制日志文件数据信息量太多了，不方便查询。我们可以加上一个参数-s 来显示简单格式。

![image-20260112201255072](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201255072.png)

**B. 指定数据库**

```bash
# 只查看指定数据库的操作
mysqlbinlog -d db01 /var/lib/mysql/binlog.000008
```

**C. 指定时间范围**

```bash
# 查看指定时间范围内的日志
mysqlbinlog --start-datetime="2023-01-01 00:00:00" \
            --stop-datetime="2023-01-02 00:00:00" \
            /var/lib/mysql/binlog.000008
```

**D. 指定位置范围**
```bash
# 查看指定位置范围内的日志
mysqlbinlog --start-position=100 \
            --stop-position=200 \
            /var/lib/mysql/binlog.000008
```

**E. 输出到文件**
```bash
# 将日志内容输出到指定文件
mysqlbinlog -r /tmp/binlog.txt /var/lib/mysql/binlog.000008
```

**实际应用场景：**
- 数据恢复：根据binlog恢复误删除的数据
- 主从复制：查看主库的binlog确认同步情况
- 审计：查看数据库的历史操作记录

### 2.4 mysqlshow

mysqlshow 客户端对象查找工具，用来很快地查找存在哪些数据库、数据库中的表、表中的列或者索引。

**语法：**
```bash
mysqlshow [options] [db_name [table_name [col_name]]]
```

**选项：**
- `--count` 显示数据库及表的统计信息（数据库，表 均可以不指定）
- `-i` 显示指定数据库或者指定表的状态信息

**示例：**

**A. 查询每个数据库的表的数量及表中记录的数量**
```bash
mysqlshow -uroot -p1234 --count
```

![image-20260112201437733](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201437733.png)

**B. 查看数据库db01的统计信息**

```bash
mysqlshow -uroot -p1234 db01 --count
```

![image-20260112201432220](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201432220.png)

**C. 查看数据库db01中的course表的信息**

```bash
mysqlshow -uroot -p1234 db01 course --count
```

![image-20260112201458695](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201458695.png)

**D. 查看数据库db01中的course表的id字段的信息**

```bash
mysqlshow -uroot -p1234 db01 course id --count
```

![image-20260112201504716](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201504716.png)

**更多示例：**

```bash
# 查询test库中每个表中的字段数，及行数
mysqlshow -uroot -p2143 test --count

# 查询test库中book表的详细情况
mysqlshow -uroot -p2143 test book --count

# 显示表的详细信息
mysqlshow -uroot -p2143 test book -i
```

### 2.5 mysqldump

mysqldump 客户端工具用来备份数据库或在不同数据库之间进行数据迁移。备份内容包含创建表，及插入表的SQL语句。

**语法：**
```bash
# 备份单个数据库
mysqldump [options] db_name [tables]

# 备份多个数据库
mysqldump [options] --database/-B db1 [db2 db3...]

# 备份所有数据库
mysqldump [options] --all-databases/-A
```

**连接选项：**
- `-u, --user=name` 指定用户名
- `-p, --password[=name]` 指定密码
- `-h, --host=name` 指定服务器IP或域名
- `-P, --port=#` 指定连接端口

**输出选项：**
- `--add-drop-database` 在每个数据库创建语句前加上 drop database 语句
- `--add-drop-table` 在每个表创建语句前加上 drop table 语句，默认开启；不开启 (`--skip-add-drop-table`)
- `-n, --no-create-db` 不包含数据库的创建语句
- `-t, --no-create-info` 不包含数据表的创建语句
- `-d, --no-data` 不包含数据
- `-T, --tab=name` 自动生成两个文件：一个.sql文件，创建表结构的语句；一个.txt文件，数据文件

**示例：**

**A. 备份db01数据库**

```bash
mysqldump -uroot -p1234 db01 > db01.sql
```

![image-20260112201621614](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201621614.png)

可以直接打开db01.sql，来查看备份出来的数据到底什么样。

![image-20260112201629981](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201629981.png)

备份出来的数据包含：
- 删除表的语句（`DROP TABLE IF EXISTS ...`）
- 创建表的语句（`CREATE TABLE ...`）
- 数据插入语句（`INSERT INTO ...`）

**B. 备份db01数据库中的表数据，不备份表结构(-t)**
```bash
mysqldump -uroot -p1234 -t db01 > db01_data.sql
```

![image-20260112201637673](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201637673.png)

打开db01_data.sql，来查看备份的数据，只有insert语句，没有备份表结构。

![image-20260112201809858](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201809858.png)

**C. 只备份表结构，不备份数据(-d)**

```bash
mysqldump -uroot -p1234 -d db01 > db01_structure.sql
```

**D. 将db01数据库的表的表结构与数据分开备份(-T)**

```bash
mysqldump -uroot -p1234 -T /root db01 score
```

![image-20260112201720188](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112201720188.png)

执行上述指令，会出错，数据不能完成备份，原因是因为我们所指定的数据存放目录/root，MySQL认

为是不安全的，需要存储在MySQL信任的目录下。那么，哪个目录才是MySQL信任的目录呢，可以查看

一下系统变量secure_file_priv 。执行结果如下：

查看MySQL信任的目录：
```sql
SHOW VARIABLES LIKE '%secure_file_priv%';
```

上述的两个文件：
- `score.sql` 中记录的就是表结构文件
- `score.txt` 就是表数据文件，但是需要注意表数据文件，并不是记录一条条的insert语句，而是按照一定的格式记录表结构中的数据

![image-20260112202048431](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112202048431.png)

![image-20260112202110394](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112202110394.png)

上述的两个文件score.sql 中记录的就是表结构文件，而score.txt 就是表数据文件，但是需

要注意表数据文件，并不是记录一条条的insert语句，而是按照一定的格式记录表结构中的数据。如下：

![image-20260112202132408](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112202132408.png)

**E. 备份多个数据库**

```bash
mysqldump -uroot -p1234 --databases db01 db02 > dbs_backup.sql
```

**F. 备份所有数据库**
```bash
mysqldump -uroot -p1234 --all-databases > all_backup.sql
```

**G. 使用--single-transaction参数（InnoDB引擎）**
```bash
# 不加锁的一致性备份（利用MVCC）
mysqldump -uroot -p1234 --single-transaction db01 > db01.sql
```

**H. 备份指定表**
```bash
# 备份db01数据库的users表
mysqldump -uroot -p1234 db01 users > users_backup.sql
```

**实际应用场景：**
- 数据库备份和恢复
- 数据迁移
- 表结构导出
- 定时备份脚本

### 2.6 mysqlimport/source

#### 2.6.1 mysqlimport

mysqlimport 是客户端数据导入工具，用来导入mysqldump 加 -T 参数后导出的文本文件。

**语法：**
```bash
mysqlimport [options] db_name textfile1 [textfile2...]
```

**示例：**
```bash
# 导入文本文件到test数据库
mysqlimport -uroot -p2143 test /tmp/city.txt

# 指定分隔符
mysqlimport -uroot -p2143 --fields-terminated-by=',' test /tmp/city.txt

# 导入多个文件
mysqlimport -uroot -p2143 test /tmp/city1.txt /tmp/city2.txt
```

![image-20260112202304749](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112202304749.png)

#### 2.6.2 source

如果需要导入sql文件，可以使用mysql中的source指令。

**语法：**
```sql
source /root/xxxxx.sql
```

**示例：**
```sql
-- 进入MySQL客户端
mysql -uroot -p123456

-- 选择数据库
USE db01;

-- 导入SQL文件
SOURCE /root/db01_backup.sql;

-- 或者使用绝对路径
SOURCE /home/user/backup/db01_backup.sql;
```

**完整示例：**
```bash
# 方式1：使用source命令（在MySQL客户端内）
mysql -uroot -p123456
USE db01;
SOURCE /root/db01.sql;

# 方式2：使用命令行直接导入
mysql -uroot -p123456 db01 < db01.sql

# 方式3：导入到指定数据库
mysql -uroot -p123456 < db01.sql
```

**对比：**

| 方式 | 适用场景 | 优点 |
|------|---------|------|
| **mysqlimport** | 导入文本文件（.txt） | 可以导入分隔符格式的数据 |
| **source** | 导入SQL文件（.sql） | 可以执行完整的SQL语句 |
| **mysql < file** | 命令行导入SQL文件 | 适合脚本自动化 |

---

## 三、本章总结

### 核心要点

1. **系统数据库**：mysql、information_schema、performance_schema、sys
2. **常用工具**：mysql、mysqladmin、mysqlbinlog、mysqlshow、mysqldump、mysqlimport
3. **备份工具**：mysqldump是最常用的备份工具
4. **导入工具**：source和mysqlimport用于数据导入

### 工具对比

| 工具 | 主要用途 | 常用场景 |
|------|---------|---------|
| **mysql** | 客户端连接工具 | 连接数据库、执行SQL |
| **mysqladmin** | 管理操作工具 | 创建/删除数据库、查看状态 |
| **mysqlbinlog** | 二进制日志查看 | 数据恢复、主从复制 |
| **mysqlshow** | 对象查找工具 | 查看数据库、表、字段信息 |
| **mysqldump** | 数据备份工具 | 数据库备份、数据迁移 |
| **mysqlimport** | 数据导入工具 | 导入文本格式数据 |

### 最佳实践

1. ✅ **定期备份**：使用mysqldump定期备份数据库
2. ✅ **备份策略**：全量备份 + 增量备份（binlog）
3. ✅ **备份测试**：定期测试备份文件的恢复能力
4. ✅ **权限管理**：使用最小权限原则
5. ✅ **监控日志**：定期查看错误日志和慢查询日志

---

## 练习题

```bash
# 1. 使用mysqlshow查看数据库信息
mysqlshow -uroot -p1234 --count

# 2. 备份数据库
mysqldump -uroot -p1234 db01 > db01_backup.sql

# 3. 只备份表结构
mysqldump -uroot -p1234 -d db01 > db01_structure.sql

# 4. 查看二进制日志
mysqlbinlog /var/lib/mysql/binlog.000008 -s

# 5. 导入备份文件
mysql -uroot -p1234 db01 < db01_backup.sql
```

---

**上一章：** [InnoDB引擎](/tutorials/java-backend/mysql/第03章-高级篇/08-InnoDB引擎/)

**下一章：** [数据库和表的管理](/tutorials/java-backend/mysql/第04章-实践篇/01-数据库和表的管理/) →

**恭喜完成MySQL管理学习！** 🎉

