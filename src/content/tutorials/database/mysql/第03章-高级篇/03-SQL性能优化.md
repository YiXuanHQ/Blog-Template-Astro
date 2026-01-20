---
title: SQL性能优化
prevChapter: "java-backend/mysql/第03章-高级篇/02-索引原理与优化"
nextChapter: "java-backend/mysql/第03章-高级篇/04-视图"
parentChapter: "java-backend/mysql/README"
---
# SQL性能优化

> SQL性能优化是数据库优化的核心内容。本章介绍常见的SQL优化技巧和最佳实践，掌握SQL优化是提升数据库性能的关键。

## ⚡ 快速参考

- **插入优化**：批量插入、手动控制事务、有序插入、关闭唯一性检查
- **主键优化**：自增主键、避免UUID、顺序插入、避免页分裂
- **ORDER BY优化**：使用索引排序、避免filesort、合理使用覆盖索引
- **GROUP BY优化**：使用索引分组、避免临时表、合理使用索引
- **LIMIT优化**：避免大偏移量、使用覆盖索引、延迟关联
- **COUNT优化**：COUNT(*) ≈ COUNT(1) > COUNT(字段)、使用近似值
- **UPDATE优化**：避免无WHERE更新、使用索引条件、批量更新

## 📚 学习目标

1. 掌握SQL插入操作的优化技巧，提高批量插入效率
2. 理解主键设计对性能的影响，掌握主键优化策略
3. 掌握ORDER BY和GROUP BY的优化方法
4. 理解LIMIT分页查询的性能问题及优化方案
5. 掌握COUNT查询的优化技巧
6. 理解UPDATE和DELETE操作的优化要点
7. 能够使用EXPLAIN分析SQL性能，识别性能瓶颈
8. 掌握SQL优化的最佳实践和常见陷阱

## 一、插入优化

### 1.1 insert插入优化

如果我们需要一次性往数据库表中插入多条记录，可以从以下三个方面进行优化。

#### 1.1.1 优化方案一：批量插入数据

```sql
-- ❌ 效率低（逐条插入）
insert into tb_test values(1,'tom');
insert into tb_test values(2,'cat');
insert into tb_test values(3,'jerry');
```

```sql
-- ✅ 效率高（批量插入）
Insert into tb_test values(1,'Tom'),(2,'Cat'),(3,'Jerry');
```

**建议：每批500-1000条**

#### 1.1.2 优化方案二：手动控制事务

```sql
-- ❌ 自动提交（每条都提交，效率低）
INSERT INTO users VALUES (1, '张三');
INSERT INTO users VALUES (2, '李四');

-- ✅ 手动提交（批量提交，效率高）
start transaction;
insert into tb_test values(1,'Tom'),(2,'Cat'),(3,'Jerry');
insert into tb_test values(4,'Tom'),(5,'Cat'),(6,'Jerry');
insert into tb_test values(7,'Tom'),(8,'Cat'),(9,'Jerry');
commit;
```

#### 1.1.3 优化方案三：主键顺序插入

**主键顺序插入，性能要高于乱序插入。**

**示例演示：**

- **主键乱序插入**：8 1 9 21 88 2 4 15 89 5 7 3
- **主键顺序插入**：1 2 3 4 5 7 8 9 15 21 88 89

```sql
-- ✅ 顺序插入（推荐）
INSERT INTO users VALUES (1, '张三');
INSERT INTO users VALUES (2, '李四');
INSERT INTO users VALUES (3, '王五');

-- ❌ 乱序插入（会导致页分裂）
INSERT INTO users VALUES (3, '王五');
INSERT INTO users VALUES (1, '张三');
INSERT INTO users VALUES (2, '李四');
```

### 1.2 大批量插入数据

如果一次性需要插入大批量数据(比如: 几百万的记录)，使用insert语句插入性能较低，此时可以使用MySQL数据库提供的load指令进行插入。

![image-20260112094724664](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112094724664.png)

```sql
-- 客户端连接服务端时，加上参数 -–local-infile
mysql –-local-infile -u root -p

-- 设置全局参数local_infile为1，开启从本地加载文件导入数据的开关
set global local_infile = 1;

-- 执行load指令将准备好的数据，加载到表结构中
load data local infile '/root/sql1.log' into table tb_user fields
terminated by ',' lines terminated by '\n';
```

**操作步骤：**

**A. 创建表结构**

```sql
CREATE TABLE `tb_user` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `birthday` DATE DEFAULT NULL,
    `sex` CHAR(1) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `unique_user_username` (`username`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 ;
```

**B. 设置参数**

```sql
-- 客户端连接服务端时，加上参数 --local-infile
mysql --local-infile -u root -p

-- 设置全局参数local_infile为1，开启从本地加载文件导入数据的开关
set global local_infile = 1;
```

**C. load加载数据**

可以执行如下指令，将数据脚本文件中的数据加载到表结构中：

```sql
load data local infile '/root/sql1.log' into table tb_user 
fields terminated by ',' 
lines terminated by '\n' ;
```

![image-20260112094529521](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112094529521.png)

我们看到，插入100w的记录，17s就完成了，性能很好。

**在load时，主键顺序插入性能高于乱序插入**

---

## 二、主键优化

在上一小节，我们提到，主键顺序插入的性能是要高于乱序插入的。这一小节，就来介绍一下具体的原因，然后再分析一下主键又该如何设计。

### 2.1 数据组织方式

在InnoDB存储引擎中，表数据都是根据主键顺序组织存放的，这种存储方式的表称为索引组织表(index organized table IOT)。

![image-20260112094859986](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112094859986.png)

行数据，都是存储在聚集索引的叶子节点上的。而我们之前也讲解过InnoDB的逻辑结构图：

![image-20260112094904272](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112094904272.png)

在InnoDB引擎中，数据行是记录在逻辑结构 page 页中的，而每一个页的大小是固定的，默认16K。那也就意味着，一个页中所存储的行也是有限的，如果插入的数据行row在该页存储不小，将会存储到下一个页中，页与页之间会通过指针连接。

### 2.2 页分裂

页可以为空，也可以填充一半，也可以填充100%。每个页包含了2-N行数据(如果一行数据过大，会行溢出)，根据主键排列。

**A. 主键顺序插入效果**

- 从磁盘中申请页，主键顺序插入

![image-20260112094919434](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112094919434.png)

- 第一个页没有满，继续往第一页插入

![image-20260112094945910](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112094945910.png)

- 当第一个也写满之后，再写入第二个页，页与页之间会通过指针连接

![image-20260112094950988](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112094950988.png)

- 当第二页写满了，再往第三页写入

![image-20260112094958583](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112094958583.png)

**B. 主键乱序插入效果**

- 加入1#,2#页都已经写满了，存放了如图所示的数据

![image-20260112095018361](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095018361.png)

- 此时再插入id为50的记录，我们来看看会发生什么现象

![image-20260112095022080](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095022080.png)

会再次开启一个页，写入新的页中吗？

不会。因为，索引结构的叶子节点是有顺序的。按照顺序，应该存储在47之后。

![image-20260112095031929](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095031929.png)

但是47所在的1#页，已经写满了，存储不了50对应的数据了。那么此时会开辟一个新的页 3#。

![image-20260112095045630](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095045630.png)

但是并不会直接将50存入3#页，而是会将1#页后一半的数据，移动到3#页，然后在3#页，插入50。

![image-20260112095051369](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095051369.png)

![image-20260112095112398](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095112398.png)

移动数据，并插入id为50的数据之后，那么此时，这三个页之间的数据顺序是有问题的。1#的下一个页，应该是3#，3#的下一个页是2#。所以，此时，需要重新设置链表指针。

![image-20260112095121035](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095121035.png)

上述的这种现象，称之为 **"页分裂"**，是比较耗费性能的操作。

### 2.3 页合并

目前表中已有数据的索引结构(叶子节点)如下：

![image-20260112095201358](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095201358.png)

当我们对已有数据进行删除时，具体的效果如下:

![image-20260112095210214](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095210214.png)

当删除一行记录时，实际上记录并没有被物理删除，只是记录被标记（flaged）为删除并且它的空间变得允许被其他记录声明使用。

当我们继续删除2#的数据记录

![image-20260112095232987](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095232987.png)

当页中删除的记录达到 MERGE_THRESHOLD（默认为页的50%），InnoDB会开始寻找最靠近的页（前或后）看看是否可以将两个页合并以优化空间使用。

![image-20260112095239925](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095239925.png)

![image-20260112095247872](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095247872.png)

删除数据，并将页合并之后，再次插入新的数据21，则直接插入3#页

![image-20260112095256506](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095256506.png)

这个里面所发生的合并页的这个现象，就称之为 **"页合并"**。

> **知识小贴士：**
> MERGE_THRESHOLD：合并页的阈值，可以自己设置，在创建表或者创建索引时指定。

### 2.4 索引设计原则

1. 满足业务需求的情况下，尽量降低主键的长度。
2. 插入数据时，尽量选择顺序插入，选择使用AUTO_INCREMENT自增主键。
3. 尽量不要使用UUID做主键或者是其他自然主键，如身份证号。
4. 业务操作时，避免对主键的修改。

![image-20260112095310788](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095310788.png)

![image-20260112095318059](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095318059.png)



**主键设计原则总结：**

**1. 使用自增主键**
```sql
-- ✅ 推荐：自增主键
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);

-- ❌ 不推荐：UUID（长度大、无序）
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,  -- UUID
    name VARCHAR(50)
);
```

**2. 主键长度尽量短**
- 主键越短，二级索引占用空间越小
- 推荐使用INT或BIGINT

**3. 顺序插入，避免页分裂**
- 自增主键保证顺序插入
- UUID等无序主键会导致频繁的页分裂

**优化建议：**
- 使用自增主键避免页分裂
- 批量删除后考虑OPTIMIZE TABLE

---

## 三、ORDER BY优化

MySQL的排序，有两种方式：

- **Using filesort**：通过表的索引或全表扫描，读取满足条件的数据行，然后在排序缓冲区sort buffer中完成排序操作，所有不是通过索引直接返回排序结果的排序都叫 FileSort 排序。
- **Using index**：通过有序索引顺序扫描直接返回有序数据，这种情况即为 using index，不需要额外排序，操作效率高。

对于以上的两种排序方式，Using index的性能高，而Using filesort的性能低，我们在优化排序操作时，尽量要优化为 Using index。

接下来，我们来做一个测试：

**A. 数据准备**

把之前测试时，为tb_user表所建立的部分索引直接删除掉

```sql
drop index idx_user_phone on tb_user;
drop index idx_user_phone_name on tb_user;
drop index idx_user_name on tb_user;
```

![image-20260112095334118](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095334118.png)

**B. 执行排序SQL**

由于 age, phone 都没有索引，所以此时再排序时，出现Using filesort，排序性能较低。

```sql
explain select id,age,phone from tb_user order by age ;
explain select id,age,phone from tb_user order by age, phone ;
```

![image-20260112095345302](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095345302.png)

![image-20260112095351057](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095351057.png)

**C. 创建索引**

```sql
-- 创建索引
create index idx_user_age_phone_aa on tb_user(age,phone);
```

**D. 创建索引后，根据age, phone进行升序排序**

```sql
explain select id,age,phone from tb_user order by age;
```

![image-20260112095406858](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095406858.png)

建立索引之后，再次进行排序查询，就由原来的Using filesort，变为了 Using index，性能就是比较高的了。

```sql
explain select id,age,phone from tb_user order by age, phone ;
```

![image-20260112095427632](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095427632.png)

**E. 创建索引后，根据age, phone进行降序排序**

```sql
explain select id,age,phone from tb_user order by age desc , phone desc ;
```

![image-20260112095533577](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095533577.png)

也出现 Using index，但是此时Extra中出现了 Backward index scan，这个代表反向扫描索引，因为在MySQL中我们创建的索引，默认索引的叶子节点是从小到大排序的，而此时我们查询排序时，是从大到小，所以，在扫描时，就是反向扫描，就会出现 Backward index scan。在MySQL8版本中，支持降序索引，我们也可以创建降序索引。

**F. 根据phone，age进行升序排序，phone在前，age在后。**

```sql
explain select id,age,phone from tb_user order by phone , age;
```

![image-20260112095549583](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095549583.png)

排序时,也需要满足最左前缀法则,否则也会出现 filesort。因为在创建索引的时候，age是第一个字段，phone是第二个字段，所以排序时，也就该按照这个顺序来，否则就会出现 Using filesort。

**F. 根据age, phone进行降序一个升序，一个降序**

```sql
explain select id,age,phone from tb_user order by age asc , phone desc ;
```

![image-20260112095656575](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095656575.png)

因为创建索引时，如果未指定顺序，默认都是按照升序排序的，而查询时，一个升序，一个降序，此时就会出现Using filesort。

![image-20260112095705785](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095705785.png)

为了解决上述的问题，我们可以创建一个索引，这个联合索引中 age 升序排序，phone 倒序排序。

**G. 创建联合索引(age 升序排序，phone 倒序排序)**

```sql
create index idx_user_age_phone_ad on tb_user(age asc ,phone desc);
```

![image-20260112095727846](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095727846.png)

**H. 然后再次执行如下SQL**

```sql
explain select id,age,phone from tb_user order by age asc , phone desc ;
```

![image-20260112095736956](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095736956.png)

升序/降序联合索引结构图示:

![image-20260112095807658](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095807658.png)

![image-20260112095813268](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095813268.png)

由上述的测试,我们得出order by优化原则:

**A. 根据排序字段建立合适的索引，多字段排序时，也遵循最左前缀法则。**

**B. 尽量使用覆盖索引。**

**C. 多字段排序, 一个升序一个降序，此时需要注意联合索引在创建时的规则（ASC/DESC）。**

**D. 如果不可避免的出现filesort，大数据量排序时，可以适当增大排序缓冲区大小 sort_buffer_size(默认256k)。**

---

## 四、GROUP BY优化

分组操作，我们主要来看看索引对于分组操作的影响。

首先我们先将 tb_user 表的索引全部删除掉。

```sql
drop index idx_user_pro_age_sta on tb_user;
drop index idx_email_5 on tb_user;
drop index idx_user_age_phone_aa on tb_user;
drop index idx_user_age_phone_ad on tb_user;
```

![image-20260112095826686](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095826686.png)

接下来，在没有索引的情况下，执行如下SQL，查询执行计划：

```sql
explain select profession , count(*) from tb_user group by profession ;
```

![image-20260112095836556](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095836556.png)

然后，我们在针对于 profession，age，status 创建一个联合索引。

```sql
create index idx_user_pro_age_sta on tb_user(profession , age , status);
```

紧接着，再执行前面相同的SQL查看执行计划。

```sql
explain select profession , count(*) from tb_user group by profession ;
```

![image-20260112095850030](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095850030.png)

再执行如下的分组查询SQL，查看执行计划：

![image-20260112095912703](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095912703.png)

![image-20260112095916966](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095916966.png)

我们发现，如果仅仅根据age分组，就会出现 Using temporary；而如果是根据 profession,age两个字段同时分组，则不会出现 Using temporary。原因是因为对于分组操作，在联合索引中，也是符合最左前缀法则的。

所以，在分组操作中，我们需要通过以下两点进行优化，以提升性能：

**A. 在分组操作时，可以通过索引来提高效率。**

**B. 分组操作时，索引的使用也是满足最左前缀法则的。**

**优化策略示例：**

```sql
-- 为GROUP BY字段创建索引
CREATE INDEX idx_dept_id ON employees(dept_id);

SELECT dept_id, COUNT(*) 
FROM employees 
GROUP BY dept_id;
```

**避免回表：**

```sql
-- 创建覆盖索引
CREATE INDEX idx_dept_salary ON employees(dept_id, salary);

-- 不需要回表
SELECT dept_id, AVG(salary) 
FROM employees 
GROUP BY dept_id;
```

---

## 五、LIMIT优化

在数据量比较大时，如果进行limit分页查询，在查询时，越往后，分页查询效率越低。

我们一起来看看执行limit分页查询耗时对比：

![image-20260112095944004](https://raw.gitcode.com/YiXuanHQ/YiXuan-Blog-Image/raw/main/tutorials/java-backend/mysql/image-20260112095944004.png)

通过测试我们会看到，越往后，分页查询效率越低，这就是分页查询的问题所在。

因为，当在进行分页查询时，如果执行 `limit 2000000,10`，此时需要MySQL排序前2000010 记录，仅仅返回 2000000 - 2000010 的记录，其他记录丢弃，查询排序的代价非常大。

**优化思路：** 一般分页查询时，通过创建覆盖索引能够比较好地提高性能，可以通过覆盖索引加子查询形式进行优化。

```sql
explain select * from tb_sku t , (select id from tb_sku order by id limit 2000000,10) a where t.id = a.id;
```

**深度分页优化示例：**

```sql
-- ❌ 慢：扫描前10000条，只取10条
SELECT * FROM users ORDER BY id LIMIT 10000, 10;

-- ✅ 快：使用子查询优化
SELECT * FROM users 
WHERE id >= (SELECT id FROM users ORDER BY id LIMIT 10000, 1)
LIMIT 10;

-- ✅ 或使用覆盖索引
SELECT * FROM users u
JOIN (SELECT id FROM users ORDER BY id LIMIT 10000, 10) t 
ON u.id = t.id;
```

**使用ID范围：**

```sql
-- 记录上次查询的最大ID
SELECT * FROM users WHERE id > 10000 ORDER BY id LIMIT 10;
```

---

## 六、COUNT优化

### 6.1 概述

在之前的测试中，我们发现，如果数据量很大，在执行count操作时，是非常耗时的。

- **MyISAM 引擎**把一个表的总行数存在了磁盘上，因此执行 count(*) 的时候会直接返回这个数，效率很高；但是如果是带条件的count，MyISAM也慢。
- **InnoDB 引擎**就麻烦了，它执行 count(*) 的时候，需要把数据一行一行地从引擎里面读出来，然后累积计数。

如果说要大幅度提升InnoDB表的count效率，主要的优化思路：自己计数(可以借助于redis这样的数据库进行,但是如果是带条件的count又比较麻烦了)。

### 6.2 count用法

count() 是一个聚合函数，对于返回的结果集，一行行地判断，如果 count 函数的参数不是NULL，累计值就加 1，否则不加，最后返回累计值。

**用法：** count（*）、count（主键）、count（字段）、count（数字）

```sql
select count(*) from tb_user ;
```

| count用法 | 含义 |
|-----------|------|
| **count(主键)** | InnoDB 引擎会遍历整张表，把每一行的主键id值都取出来，返回给服务层。服务层拿到主键后，直接按行进行累加(主键不可能为null) |
| **count(字段)** | 没有not null 约束：InnoDB 引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，服务层判断是否为null，不为null，计数累加。<br>有not null 约束：InnoDB 引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，直接按行进行累加。 |
| **count(数字)** | InnoDB 引擎遍历整张表，但不取值。服务层对于返回的每一行，放一个数字"1"进去，直接按行进行累加。 |
| **count(*)** | InnoDB引擎并不会把全部字段取出来，而是专门做了优化，不取值，服务层直接按行进行累加。 |

**按照效率排序的话，count(字段) < count(主键 id) < count(1) ≈ count(*)，所以尽量使用 count(*)。**

---

## 七、UPDATE优化

我们主要需要注意一下update语句执行时的注意事项。

当我们在执行删除的SQL语句时，会锁定id为1这一行的数据，然后事务提交之后，行锁释放。

```sql
update course set name = 'javaEE' where id = 1 ;
```

但是当我们在执行如下SQL时。

```sql
update course set name = 'SpringBoot' where name = 'PHP' ;
```

当我们开启多个事务，在执行上述的SQL时，我们发现行锁升级为了表锁。导致该update语句的性能大大降低。

**InnoDB的行锁是针对索引加的锁，不是针对记录加的锁，并且该索引不能失效，否则会从行锁升级为表锁。**

---

## 八、SQL优化技巧

### 6.1 避免SELECT *

```sql
-- ❌ 不推荐
SELECT * FROM users WHERE id = 1;

-- ✅ 推荐：只查询需要的字段
SELECT id, name, email FROM users WHERE id = 1;
```

### 6.2 避免在WHERE中使用函数

```sql
-- ❌ 索引失效
SELECT * FROM orders WHERE YEAR(create_time) = 2024;

-- ✅ 使用范围查询
SELECT * FROM orders 
WHERE create_time >= '2024-01-01' AND create_time < '2025-01-01';
```

### 6.3 使用UNION ALL代替UNION

```sql
-- UNION会去重，效率低
SELECT * FROM users WHERE age < 20
UNION
SELECT * FROM users WHERE salary > 10000;

-- UNION ALL不去重，效率高
SELECT * FROM users WHERE age < 20
UNION ALL
SELECT * FROM users WHERE salary > 10000;
```

### 6.4 小表驱动大表

```sql
-- ✅ 小表在前（users表小）
SELECT * FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- ❌ 大表在前（orders表大）
SELECT * FROM orders o
LEFT JOIN users u ON o.user_id = u.id;
```

### 6.5 使用EXISTS代替IN

```sql
-- 当子查询结果集大时，用EXISTS效率更高
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);
```

### 6.6 避免使用子查询

```sql
-- ❌ 子查询（可能慢）
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders WHERE status = 1);

-- ✅ JOIN（通常更快）
SELECT DISTINCT u.* 
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 1;
```

---

## 九、性能分析工具

### 7.1 EXPLAIN分析

```sql
EXPLAIN SELECT * FROM users WHERE age = 25;
```

**关键指标：**
- `type`：ALL（全表扫描）→ index → range → ref → const（最优）
- `key`：使用的索引
- `rows`：扫描行数
- `Extra`：额外信息（Using index、Using filesort等）

### 7.2 SHOW PROFILE

```sql
-- 开启profiling
SET profiling = 1;

-- 执行SQL
SELECT * FROM users WHERE age = 25;

-- 查看性能
SHOW PROFILES;
SHOW PROFILE FOR QUERY 1;
```

### 7.3 慢查询日志

```sql
-- 开启慢查询日志
SET GLOBAL slow_query_log = 1;
SET GLOBAL long_query_time = 2;  -- 超过2秒的查询

-- 查看慢查询日志位置
SHOW VARIABLES LIKE 'slow_query_log_file';
```

---

## 十、本章总结

### 优化清单

**INSERT优化：**
- ✅ 批量插入
- ✅ 手动提交事务
- ✅ 主键顺序插入
- ✅ 大批量用LOAD DATA

**索引优化：**
- ✅ 为WHERE、ORDER BY、GROUP BY字段建索引
- ✅ 使用覆盖索引
- ✅ 避免索引失效

**SQL优化：**
- ✅ 避免SELECT *
- ✅ 避免在WHERE中使用函数
- ✅ 小表驱动大表
- ✅ 优化深度分页

**分析工具：**
- ✅ EXPLAIN分析执行计划
- ✅ SHOW PROFILE性能分析
- ✅ 慢查询日志

---

## 练习题

```sql
-- 1. 优化以下SQL
-- 原SQL
SELECT * FROM orders WHERE DATE(create_time) = '2024-01-01';

-- 优化后
SELECT * FROM orders 
WHERE create_time >= '2024-01-01' AND create_time < '2024-01-02';

-- 2. 优化深度分页
-- 原SQL
SELECT * FROM users ORDER BY id LIMIT 100000, 10;

-- 优化后
SELECT * FROM users WHERE id > 100000 ORDER BY id LIMIT 10;

-- 3. 分析执行计划
EXPLAIN SELECT * FROM users WHERE age = 25 ORDER BY create_time;
```

---

**上一章：** [索引原理与优化](/tutorials/java-backend/mysql/第03章-高级篇/02-索引原理与优化/)

**下一章：** [视图](/tutorials/java-backend/mysql/第03章-高级篇/04-视图/) →
