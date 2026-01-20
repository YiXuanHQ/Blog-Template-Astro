---
title: 数据库技术
---

# 🗄️ 数据库技术

> 掌握数据存储与管理的核心技术

## 📖 数据库导航

### [MySQL 关系型数据库](mysql/) ⭐⭐⭐⭐⭐

教程链接：[黑马程序员 MySQL数据库入门到精通，从mysql安装到mysql高级、mysql优化全囊括_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Kr4y1i7ru/?spm_id_from=333.337.search-card.all.click&vd_source=116d48ea73600711a83d9d600e4d2b27)

**最流行的开源关系型数据库**

**学习内容：**
- SQL基础语法
- 索引优化
- 事务与锁
- 存储引擎
- 主从复制
- 分库分表

### [Redis 缓存数据库](redis/) ⭐⭐⭐⭐⭐

教程链接：[黑马程序员Redis入门到实战教程，深度透析redis底层原理+redis分布式锁+企业解决方案+黑马点评实战项目_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1cr4y1671t/?spm_id_from=333.337.search-card.all.click&vd_source=116d48ea73600711a83d9d600e4d2b27)

**高性能的内存数据库**

**学习内容：**
- Redis基础
- 五大数据类型
- 持久化机制
- 缓存策略
- 集群与高可用
- Spring Boot整合

### [MongoDB 文档数据库](mongodb/) ⭐⭐⭐
**灵活的NoSQL数据库**

**学习内容：**
- MongoDB基础
- CRUD操作
- 聚合查询
- 索引优化
- 复制集与分片

### [Elasticsearch 搜索引擎](elasticsearch/) ⭐⭐⭐⭐
**强大的全文搜索引擎**

**学习内容：**
- ES基础概念
- DSL查询语法
- 分词器配置
- 聚合分析
- Spring Boot整合

## 🎯 数据库分类

### 关系型数据库 (RDBMS)
- **MySQL** - 最流行
- **PostgreSQL** - 功能强大
- **Oracle** - 企业级
- **SQL Server** - 微软生态

### NoSQL数据库
- **Redis** - 键值存储
- **MongoDB** - 文档存储
- **Cassandra** - 列式存储
- **Neo4j** - 图数据库

### 搜索引擎
- **Elasticsearch** - 分布式搜索
- **Solr** - 企业级搜索

## 💡 技术选型建议

### MySQL 适用场景
- ✅ 事务要求高
- ✅ 数据结构稳定
- ✅ 复杂查询多
- ✅ 传统业务系统

### Redis 适用场景
- ✅ 高并发读写
- ✅ 缓存加速
- ✅ 会话存储
- ✅ 排行榜、计数器

### MongoDB 适用场景
- ✅ 数据结构灵活
- ✅ 快速迭代
- ✅ 大数据量存储
- ✅ 日志系统

### Elasticsearch 适用场景
- ✅ 全文搜索
- ✅ 日志分析
- ✅ 实时分析
- ✅ 复杂聚合查询

## 🚀 学习路线

### 初级阶段 (1-2个月)
```
MySQL基础 → SQL语法 → 基本查询 → 事务概念
```

### 中级阶段 (2-4个月)
```
MySQL进阶 → 索引优化 → Redis缓存 → 数据库设计
```

### 高级阶段 (4-6个月)
```
主从复制 → 读写分离 → 分库分表 → MongoDB → Elasticsearch
```

## 📊 性能对比

| 数据库 | 类型 | 读性能 | 写性能 | 适用场景 |
|--------|------|--------|--------|----------|
| MySQL | RDBMS | 中 | 中 | 事务业务 |
| Redis | KV存储 | 极高 | 高 | 缓存 |
| MongoDB | 文档 | 高 | 高 | 灵活存储 |
| ES | 搜索 | 高 | 中 | 全文搜索 |

## 💡 最佳实践

### MySQL优化
1. 合理使用索引
2. 避免全表扫描
3. 优化SQL语句
4. 选择合适的存储引擎
5. 定期分析慢查询

### Redis使用
1. 合理设置过期时间
2. 避免大key
3. 使用Pipeline批量操作
4. 选择合适的数据类型
5. 配置持久化策略

### 缓存策略
1. **Cache Aside** - 旁路缓存
2. **Read Through** - 读穿透
3. **Write Through** - 写穿透
4. **Write Behind** - 写回

## 📚 推荐资源

### MySQL
- 《MySQL必知必会》
- 《高性能MySQL》
- [MySQL官方文档](https://dev.mysql.com/doc/)

### Redis
- 《Redis设计与实现》
- 《Redis实战》
- [Redis官方文档](https://redis.io/documentation)

### MongoDB
- 《MongoDB权威指南》
- [MongoDB官方文档](https://docs.mongodb.com/)

### Elasticsearch
- 《Elasticsearch权威指南》
- [ES官方文档](https://www.elastic.co/guide/)

---

**开始学习** → [从MySQL基础开始](mysql/)
