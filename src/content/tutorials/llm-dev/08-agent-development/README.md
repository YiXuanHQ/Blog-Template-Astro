---
title: 第八部分：Agent 开发
---

# 第八部分：Agent 开发 ⭐⭐⭐⭐⭐

> 构建能够自主思考和行动的智能体

## 📖 本部分概述

**Agent（智能体）** 是 AI 应用的高级形态，它不仅能回答问题，还能：
- 🤔 **自主规划** - 分解复杂任务
- 🔧 **使用工具** - 调用各种 API 和服务
- 🔄 **迭代执行** - 根据结果调整策略
- 🤝 **协作** - 多个 Agent 协同工作

**学习时长：** 4-6 周  
**难度：** ⭐⭐⭐⭐⭐  
**重要程度：** ⭐⭐⭐⭐⭐

---

## 🎯 学习目标

- ✅ 理解 Agent 的核心概念和架构
- ✅ 掌握 ReAct 模式
- ✅ 实现工具调用（Tool Calling）
- ✅ 构建多 Agent 协作系统
- ✅ 使用 Spring AI 和 LangChain4j 开发 Agent

---

## 💡 什么是 Agent？

### Agent vs 简单对话

| 特性 | 简单对话 | Agent |
|------|---------|-------|
| **能力** | 回答问题 | 执行任务 |
| **工具** | 无 | 可使用多种工具 |
| **规划** | 无 | 自主规划步骤 |
| **迭代** | 单轮 | 多轮迭代 |
| **示例** | "什么是 Java？" | "帮我查询销售数据并生成报告" |

### Agent 工作流程

```
用户：帮我查北京天气，如果温度低于10度推荐穿衣建议

Agent 思考：
1. 我需要先查询北京天气 → 使用天气工具
2. 根据温度判断 → 逻辑推理
3. 如果低于10度 → 调用穿衣建议工具
4. 整合信息回复用户

执行：
→ 调用天气API → 获取温度8度
→ 判断需要穿衣建议
→ 调用穿衣API → 获取建议
→ 返回综合答案
```

---

## 📚 课程内容

### 1. [Agent 概念](agent-concepts/)

#### 1.1 Agent 的核心组件

**大脑（LLM）**
- 推理和决策
- 理解任务
- 生成执行计划

**记忆（Memory）**
- 短期记忆：当前对话
- 长期记忆：历史经验
- 工作记忆：任务状态

**工具（Tools）**
- 搜索引擎
- 数据库查询
- API 调用
- 代码执行

**规划器（Planner）**
- 任务分解
- 步骤规划
- 策略调整

#### 1.2 Agent 类型

**ReAct Agent** - 推理+行动
```
Thought → Action → Observation → Thought → ...
```

**Plan-and-Execute Agent** - 先规划后执行
```
Plan → Execute Step 1 → Execute Step 2 → ...
```

**Reflexion Agent** - 自我反思
```
Try → Reflect → Improve → Retry
```

---

### 2. [ReAct Agent](react-agent/)

#### 2.1 ReAct 模式

**ReAct = Reasoning (推理) + Acting (行动)**

```
Thought: 我需要查询用户信息
Action: 调用 getUserInfo(userId=123)
Observation: 用户名：张三，年龄：28
Thought: 现在我知道用户信息了，可以回答问题
Final Answer: 张三今年28岁
```

#### 2.2 Spring AI 实现

```java
@Service
public class ReactAgentService {
    
    @Autowired
    private ChatClient chatClient;
    
    @Bean
    @Description("查询用户信息")
    public Function<UserQuery, User> getUserInfo() {
        return query -> userRepository.findById(query.userId());
    }
    
    @Bean
    @Description("查询订单信息")
    public Function<OrderQuery, List<Order>> getOrders() {
        return query -> orderRepository.findByUserId(query.userId());
    }
    
    public String executeTask(String task) {
        return chatClient.prompt()
            .system("""
                你是一个智能助手。
                使用提供的工具完成任务。
                思考 → 行动 → 观察 → 继续思考...
                """)
            .user(task)
            .functions("getUserInfo", "getOrders")
            .call()
            .content();
    }
}
```

**示例对话：**

```
用户：查询用户123的订单总额

Agent Thought: 我需要先获取用户123的订单列表
Action: getOrders(userId=123)
Observation: [Order(id=1, amount=100), Order(id=2, amount=200)]

Agent Thought: 现在我可以计算总额了
Action: 计算 100 + 200
Observation: 300

Final Answer: 用户123的订单总额是300元
```

---

### 3. [工具集成](tool-integration/)

#### 3.1 内置工具

**网络搜索**
```java
@Bean
@Description("搜索网页")
public Function<SearchRequest, SearchResult> webSearch() {
    return request -> {
        // 使用 Google Search API
        return googleSearchClient.search(request.query());
    };
}
```

**数据库查询**
```java
@Bean
@Description("执行SQL查询")
public Function<SqlQuery, QueryResult> sqlTool() {
    return query -> {
        // 安全检查
        if (!isSafeQuery(query.sql())) {
            throw new SecurityException("Unsafe SQL");
        }
        
        List<Map<String, Object>> results = 
            jdbcTemplate.queryForList(query.sql());
        
        return new QueryResult(results);
    };
}
```

**文件操作**
```java
@Bean
@Description("读取文件内容")
public Function<FileReadRequest, String> readFile() {
    return request -> {
        return Files.readString(Path.of(request.path()));
    };
}

@Bean
@Description("写入文件")
public Function<FileWriteRequest, Boolean> writeFile() {
    return request -> {
        Files.writeString(
            Path.of(request.path()), 
            request.content()
        );
        return true;
    };
}
```

#### 3.2 自定义工具

```java
@Component
public class CustomTools {
    
    @Bean
    @Description("发送邮件")
    public Function<EmailRequest, Boolean> sendEmail() {
        return request -> {
            mailSender.send(
                request.to(),
                request.subject(),
                request.body()
            );
            return true;
        };
    }
    
    @Bean
    @Description("创建工单")
    public Function<TicketRequest, Ticket> createTicket() {
        return request -> {
            Ticket ticket = new Ticket();
            ticket.setTitle(request.title());
            ticket.setDescription(request.description());
            ticket.setPriority(request.priority());
            return ticketRepository.save(ticket);
        };
    }
    
    @Bean
    @Description("调用第三方API")
    public Function<ApiRequest, ApiResponse> callExternalApi() {
        return request -> {
            return restTemplate.postForObject(
                request.url(),
                request.body(),
                ApiResponse.class
            );
        };
    }
}
```

#### 3.3 工具组合使用

```java
public String complexTask(String task) {
    return chatClient.prompt()
        .system("你可以使用多个工具完成复杂任务")
        .user(task)
        .functions(
            "webSearch",      // 搜索信息
            "sqlTool",        // 查询数据库
            "sendEmail",      // 发送邮件
            "createTicket"    // 创建工单
        )
        .call()
        .content();
}

// 示例：
// 用户："查询销售数据，生成报告，并发送给老板"
// Agent 会：
// 1. 调用 sqlTool 查询数据
// 2. 分析数据生成报告
// 3. 调用 sendEmail 发送邮件
```

---

### 4. [多 Agent 系统](multi-agent/)

#### 4.1 Agent 协作模式

**主从模式（Master-Worker）**
```
Manager Agent
├── Worker Agent 1 (数据收集)
├── Worker Agent 2 (数据分析)
└── Worker Agent 3 (报告生成)
```

**流水线模式（Pipeline）**
```
Agent 1 → Agent 2 → Agent 3 → Final Result
```

**讨论模式（Debate）**
```
Agent A: 观点1
Agent B: 反驳
Agent A: 反驳
...
Moderator: 总结
```

#### 4.2 实现示例

```java
@Service
public class MultiAgentSystem {
    
    // Coordinator Agent
    private final ChatClient coordinatorAgent;
    
    // Worker Agents
    private final ChatClient researcherAgent;
    private final ChatClient coderAgent;
    private final ChatClient reviewerAgent;
    
    public String executeComplexTask(String task) {
        // 1. Coordinator 分解任务
        TaskPlan plan = coordinatorAgent.prompt()
            .system("你是任务协调者，将复杂任务分解为子任务")
            .user(task)
            .call()
            .entity(TaskPlan.class);
        
        // 2. 分配给不同 Agent
        String research = researcherAgent.prompt()
            .user(plan.getSubTask1())
            .call()
            .content();
        
        String code = coderAgent.prompt()
            .user(plan.getSubTask2() + "\n背景：" + research)
            .call()
            .content();
        
        String review = reviewerAgent.prompt()
            .user("审查代码：\n" + code)
            .call()
            .content();
        
        // 3. Coordinator 整合结果
        return coordinatorAgent.prompt()
            .user(String.format("""
                任务：%s
                研究结果：%s
                代码：%s
                审查意见：%s
                请整合以上信息给出最终答案
                """, task, research, code, review))
            .call()
            .content();
    }
}
```

#### 4.3 Agent 通信

```java
@Service
public class AgentCommunicationService {
    
    @Autowired
    private RedisTemplate<String, Message> redis;
    
    // Agent 发送消息
    public void sendMessage(String fromAgent, String toAgent, String content) {
        Message msg = new Message(fromAgent, toAgent, content, Instant.now());
        redis.opsForList().rightPush("agent:" + toAgent, msg);
    }
    
    // Agent 接收消息
    public List<Message> receiveMessages(String agentId) {
        List<Message> messages = redis.opsForList()
            .range("agent:" + agentId, 0, -1);
        redis.delete("agent:" + agentId);
        return messages;
    }
    
    // Agent 广播
    public void broadcast(String fromAgent, String content) {
        List<String> allAgents = List.of(
            "researcher", "coder", "reviewer"
        );
        
        for (String agent : allAgents) {
            if (!agent.equals(fromAgent)) {
                sendMessage(fromAgent, agent, content);
            }
        }
    }
}
```

---

### 5. [LangChain4j 框架](langchain4j/)

#### 5.1 LangChain4j 简介

**LangChain4j** 是 Java 版的 LangChain，提供更丰富的 Agent 功能。

```xml
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j</artifactId>
    <version>0.27.0</version>
</dependency>
```

#### 5.2 LangChain4j Agent

```java
import dev.langchain4j.agent.tool.Tool;
import dev.langchain4j.service.AiServices;

public class LangChain4jAgent {
    
    // 定义工具
    static class DatabaseTools {
        @Tool("查询用户信息")
        public String getUserInfo(String userId) {
            return userService.findById(userId).toString();
        }
        
        @Tool("查询订单")
        public String getOrders(String userId) {
            return orderService.findByUserId(userId).toString();
        }
    }
    
    // 定义 Agent 接口
    interface Assistant {
        String chat(String message);
    }
    
    public static void main(String[] args) {
        // 创建 Agent
        Assistant agent = AiServices.builder(Assistant.class)
            .chatLanguageModel(openAiModel)
            .tools(new DatabaseTools())
            .build();
        
        // 使用 Agent
        String answer = agent.chat("查询用户123的订单信息");
        System.out.println(answer);
    }
}
```

---

## 🎯 Agent 设计最佳实践

### 1. 工具设计原则

✅ **单一职责** - 每个工具只做一件事  
✅ **清晰描述** - @Description 要准确描述功能  
✅ **错误处理** - 工具要有良好的错误处理  
✅ **幂等性** - 同样的输入产生同样的输出  
✅ **安全性** - 验证输入，防止注入攻击

### 2. Agent 提示词模板

```java
String agentSystemPrompt = """
你是一个智能助手，可以使用工具完成任务。

工作流程：
1. Thought: 思考需要做什么
2. Action: 选择并调用合适的工具
3. Observation: 观察工具返回的结果
4. 重复 1-3 直到任务完成
5. Final Answer: 给出最终答案

注意事项：
- 只调用真正需要的工具
- 仔细观察工具返回结果
- 如果工具失败，尝试其他方法
- 最后给出清晰的答案
""";
```

### 3. 错误处理

```java
@Service
public class RobustAgentService {
    
    public String executeWithRetry(String task, int maxRetries) {
        int attempts = 0;
        Exception lastError = null;
        
        while (attempts < maxRetries) {
            try {
                return chatClient.prompt()
                    .user(task)
                    .functions("tool1", "tool2")
                    .call()
                    .content();
            } catch (Exception e) {
                lastError = e;
                attempts++;
                log.warn("Attempt {} failed: {}", attempts, e.getMessage());
                
                // 等待后重试
                Thread.sleep(1000 * attempts);
            }
        }
        
        throw new AgentExecutionException(
            "Failed after " + maxRetries + " attempts", 
            lastError
        );
    }
}
```

---

## 🚀 实战项目

### 项目 1：个人助理 Agent
- 日程管理
- 邮件处理
- 任务提醒

### 项目 2：数据分析 Agent
- 自动查询数据
- 生成可视化图表
- 编写分析报告

### 项目 3：DevOps Agent
- 监控系统状态
- 自动部署
- 故障诊断

---

## 📖 推荐资源

- [Spring AI Tools 文档](https://docs.spring.io/spring-ai/reference/api/tools.html)
- [LangChain4j 文档](https://docs.langchain4j.dev/)
- [ReAct 论文](https://arxiv.org/abs/2210.03629)

---

## 🚀 下一步

**下一步** → [第九部分：模型微调](../09-fine-tuning/)（可选）  
**或跳到** → [第十部分：企业级实践](../10-enterprise-practices/)

---

**Agent 是 AI 应用的未来！** 从简单的工具调用到复杂的多 Agent 协作，Agent 能够完成越来越复杂的任务。🤖
