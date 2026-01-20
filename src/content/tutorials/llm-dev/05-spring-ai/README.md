---
title: 第五部分：Spring AI 框架
---

# 第五部分：Spring AI 框架 ⭐⭐⭐⭐⭐

> Java 开发者的 AI 应用开发首选框架

## 📖 本部分概述

**Spring AI** 是 Spring 官方推出的 AI 应用开发框架，专为 Java/Spring 开发者设计。它将 Spring 生态系统的设计理念（如依赖注入、自动配置、可观测性）应用到 AI 领域，让 Java 开发者能够用熟悉的方式构建智能应用。

**学习时长：** 4-6 周  
**难度：** ⭐⭐⭐⭐☆  
**重要程度：** ⭐⭐⭐⭐⭐ **(核心部分)**

---

## 🎯 学习目标

完成本部分学习后，你将能够：

- ✅ 熟练使用 ChatClient API 进行对话开发
- ✅ 掌握结构化输出，将 AI 响应映射到 Java 对象
- ✅ 实现 Function Calling，让 AI 调用你的业务代码
- ✅ 使用 Advisors API 管理对话记忆和 RAG
- ✅ 集成可观测性，监控 AI 应用性能
- ✅ 构建生产级的 AI 应用

---

## 💡 为什么选择 Spring AI？

### vs Python (LangChain/LlamaIndex)

| 对比项 | Spring AI | Python (LangChain) |
|--------|-----------|-------------------|
| **类型安全** | ✅ 强类型，编译时检查 | ❌ 弱类型，运行时错误 |
| **企业整合** | ✅ 无缝集成 Spring 生态 | ⚠️ 需要额外工作 |
| **性能** | ✅ JVM 高性能 | ⚠️ 相对较慢 |
| **维护性** | ✅ 易于维护和重构 | ⚠️ 大型项目维护困难 |
| **团队** | ✅ Java 团队可直接上手 | ❌ 需要 Python 团队 |
| **部署** | ✅ 成熟的企业部署方案 | ⚠️ 部署相对复杂 |
| **适用场景** | 生产环境、企业应用 | 快速原型、研究 |

### Spring AI 的核心优势

1. **Spring 生态集成** - Spring Boot、Spring Cloud、Spring Data 无缝集成
2. **企业级特性** - 可观测性、监控、安全、事务管理
3. **统一抽象** - 跨多个 AI 提供商的统一 API
4. **生产就绪** - 开箱即用的生产级配置

---

## 📚 课程内容

### 1. [快速开始](getting-started/)

#### 1.1 Spring AI 简介
- Spring AI 是什么
- 核心概念与架构
- 支持的 AI 模型和向量数据库

#### 1.2 项目搭建
```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
</dependency>
```

#### 1.3 配置管理
```yaml
# application.yml
spring:
  ai:
    openai:
      api-key: ${OPENAI_API_KEY}
      chat:
        options:
          model: gpt-4o-mini
          temperature: 0.7
```

#### 1.4 第一个应用
```java
@RestController
@RequestMapping("/api/ai")
public class AIController {
    @Autowired
    private ChatClient chatClient;
    
    @GetMapping("/chat")
    public String chat(@RequestParam String message) {
        return chatClient.prompt()
            .user(message)
            .call()
            .content();
    }
}
```

---

### 2. [ChatClient API](chatclient-api/)

#### 2.1 基础用法

**简单对话**
```java
// 最简单的用法
String response = chatClient.prompt()
    .user("你好")
    .call()
    .content();
```

**System + User Message**
```java
String response = chatClient.prompt()
    .system("你是一个专业的 Java 架构师")
    .user("如何设计一个高并发系统？")
    .call()
    .content();
```

**历史对话上下文**
```java
ChatResponse response = chatClient.prompt()
    .messages(
        new SystemMessage("你是AI助手"),
        new UserMessage("我叫张三"),
        new AssistantMessage("你好张三！"),
        new UserMessage("我叫什么名字？")
    )
    .call()
    .chatResponse();
```

#### 2.2 结构化输出

**映射到 Java 对象**
```java
record Product(
    String name,
    double price,
    List<String> features,
    Category category
) {}

enum Category { ELECTRONICS, BOOKS, CLOTHING }

// AI 输出直接映射到 POJO
Product product = chatClient.prompt()
    .user("推荐一款笔记本电脑")
    .call()
    .entity(Product.class);

System.out.println(product.name());     // "MacBook Pro 14"
System.out.println(product.price());    // 14999.0
System.out.println(product.category()); // ELECTRONICS
```

**列表输出**
```java
List<String> ideas = chatClient.prompt()
    .user("给我5个创业点子")
    .call()
    .entity(new ParameterizedTypeReference<List<String>>() {});
```

#### 2.3 流式响应

**Server-Sent Events**
```java
@GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<String> streamChat(@RequestParam String message) {
    return chatClient.prompt()
        .user(message)
        .stream()
        .content();
}
```

**WebFlux 集成**
```java
Flux<ChatResponse> stream = chatClient.prompt()
    .user("写一篇关于 Spring AI 的文章")
    .stream()
    .chatResponse();

stream.subscribe(
    chunk -> System.out.print(chunk.getResult().getOutput().getContent()),
    error -> log.error("Error: ", error),
    () -> log.info("Stream completed")
);
```

#### 2.4 错误处理

```java
try {
    String response = chatClient.prompt()
        .user(message)
        .call()
        .content();
} catch (OpenAiApiException e) {
    // API 调用失败
    log.error("OpenAI API error: {}", e.getMessage());
} catch (RateLimitException e) {
    // 速率限制
    log.warn("Rate limit exceeded");
}
```

---

### 3. [Function Calling](function-calling/)

#### 3.1 函数调用基础

**什么是 Function Calling？**
- 让 AI 模型调用你的 Java 方法
- 获取实时数据（天气、数据库、API）
- 执行业务操作（下单、发邮件）

**简单示例**
```java
@Configuration
public class FunctionConfig {
    
    @Bean
    @Description("查询天气信息")
    public Function<WeatherRequest, WeatherResponse> weatherFunction() {
        return request -> {
            // 调用真实天气 API
            return weatherService.getWeather(request.city());
        };
    }
}

record WeatherRequest(String city) {}
record WeatherResponse(String temperature, String condition) {}

// AI 自动调用函数
String response = chatClient.prompt()
    .user("北京今天天气怎么样？")
    .functions("weatherFunction")
    .call()
    .content();
// 输出：北京今天晴天，温度 25°C
```

#### 3.2 自定义函数

**数据库查询函数**
```java
@Bean
@Description("查询用户信息")
public Function<UserQuery, User> userQueryFunction() {
    return query -> {
        return userRepository.findById(query.userId())
            .orElseThrow();
    };
}

// AI: "查询 ID 为 123 的用户信息"
// → 自动调用 userQueryFunction(123)
// → 返回用户数据
```

**API 调用函数**
```java
@Bean
@Description("搜索网页")
public Function<SearchRequest, SearchResult> webSearchFunction() {
    return request -> {
        return restTemplate.getForObject(
            "https://api.search.com/search?q=" + request.query(),
            SearchResult.class
        );
    };
}
```

#### 3.3 数据库集成

**SQL 生成与执行**
```java
@Service
public class DatabaseAgentService {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Autowired
    private ChatClient chatClient;
    
    @Bean
    @Description("执行 SQL 查询")
    public Function<SqlQuery, List<Map<String, Object>>> sqlFunction() {
        return query -> jdbcTemplate.queryForList(query.sql());
    }
    
    public String queryData(String naturalLanguage) {
        return chatClient.prompt()
            .system("你是数据库助手，根据用户需求生成并执行 SQL")
            .user(naturalLanguage)
            .functions("sqlFunction")
            .call()
            .content();
    }
}

// 用户：查询销售额最高的10个商品
// AI 自动生成并执行：SELECT * FROM products ORDER BY sales DESC LIMIT 10
```

#### 3.4 多函数协作

```java
String response = chatClient.prompt()
    .user("查询北京天气，如果温度低于10度推荐穿衣建议")
    .functions(
        "weatherFunction",        // 查询天气
        "clothingAdviceFunction"  // 穿衣建议
    )
    .call()
    .content();

// AI 会自动:
// 1. 调用 weatherFunction 获取温度
// 2. 判断温度
// 3. 调用 clothingAdviceFunction 获取建议
// 4. 综合回复用户
```

---

### 4. [Advisors API](advisors/)

#### 4.1 Advisors 概述

**什么是 Advisors？**
- 封装常见的 AI 应用模式
- 在请求/响应流程中插入处理逻辑
- 可组合、可复用

**内置 Advisors：**
- `MessageChatMemoryAdvisor` - 对话记忆
- `QuestionAnswerAdvisor` - 自动 RAG
- `SafeGuardAdvisor` - 内容安全
- `LoggingAdvisor` - 日志记录

#### 4.2 记忆管理（MessageChatMemoryAdvisor）

**实现多轮对话**
```java
@Configuration
public class ChatConfig {
    
    @Bean
    public ChatClient chatClient(ChatModel chatModel, ChatMemory chatMemory) {
        return ChatClient.builder(chatModel)
            .defaultAdvisors(
                new MessageChatMemoryAdvisor(chatMemory)
            )
            .build();
    }
    
    @Bean
    public ChatMemory chatMemory() {
        return new InMemoryChatMemory();
    }
}

// 使用
chatClient.prompt()
    .user("我叫张三")
    .call()
    .content();  // "你好张三！"

chatClient.prompt()
    .user("我叫什么名字？")
    .call()
    .content();  // "你叫张三"（记住了上一轮对话）
```

**按会话管理记忆**
```java
String response = chatClient.prompt()
    .user("你好")
    .advisors(a -> a.param(CHAT_MEMORY_CONVERSATION_ID, "user-123"))
    .call()
    .content();
```

#### 4.3 RAG Advisor（QuestionAnswerAdvisor）

**自动检索增强**
```java
@Bean
public ChatClient chatClient(
    ChatModel chatModel,
    VectorStore vectorStore
) {
    return ChatClient.builder(chatModel)
        .defaultAdvisors(
            new QuestionAnswerAdvisor(vectorStore)
        )
        .build();
}

// 使用时自动进行 RAG
String response = chatClient.prompt()
    .user("Spring AI 有哪些特性？")
    // 自动从向量库检索相关文档
    // 自动构建上下文
    // 生成答案
    .call()
    .content();
```

**自定义 RAG 参数**
```java
String response = chatClient.prompt()
    .user("什么是 Spring AI？")
    .advisors(a -> a
        .param(QuestionAnswerAdvisor.FILTER_EXPRESSION, "type == 'documentation'")
        .param(QuestionAnswerAdvisor.TOP_K, 5)
    )
    .call()
    .content();
```

#### 4.4 自定义 Advisor

```java
public class CustomAdvisor implements RequestResponseAdvisor {
    
    @Override
    public AdvisedRequest adviseRequest(AdvisedRequest request, Map<String, Object> context) {
        // 请求前处理：添加系统提示、日志等
        log.info("Processing request: {}", request.userText());
        
        return AdvisedRequest.from(request)
            .withSystemText("你是专业的AI助手")
            .build();
    }
    
    @Override
    public ChatResponse adviseResponse(ChatResponse response, Map<String, Object> context) {
        // 响应后处理：内容过滤、格式化等
        String content = response.getResult().getOutput().getContent();
        String filtered = contentFilter.filter(content);
        
        return ChatResponse.builder()
            .withGeneration(new Generation(filtered))
            .build();
    }
}
```

---

### 5. [可观测性](observability/)

#### 5.1 指标监控（Metrics）

**Spring Boot Actuator + Micrometer**
```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,prometheus
  metrics:
    tags:
      application: ${spring.application.name}
```

**自定义指标**
```java
@Service
public class AIService {
    private final MeterRegistry meterRegistry;
    
    @Timed(value = "ai.chat.duration", description = "AI chat duration")
    public String chat(String message) {
        meterRegistry.counter("ai.chat.requests").increment();
        
        try {
            String response = chatClient.prompt()
                .user(message)
                .call()
                .content();
            
            meterRegistry.counter("ai.chat.success").increment();
            return response;
        } catch (Exception e) {
            meterRegistry.counter("ai.chat.errors").increment();
            throw e;
        }
    }
}
```

**监控 Token 使用**
```java
ChatResponse response = chatClient.prompt()
    .user(message)
    .call()
    .chatResponse();

ChatResponseMetadata metadata = response.getMetadata();
Usage usage = metadata.getUsage();

log.info("Prompt tokens: {}", usage.getPromptTokens());
log.info("Completion tokens: {}", usage.getCompletionTokens());
log.info("Total tokens: {}", usage.getTotalTokens());
```

#### 5.2 分布式追踪（Tracing）

**OpenTelemetry 集成**
```xml
<dependency>
    <groupId>io.opentelemetry.instrumentation</groupId>
    <artifactId>opentelemetry-spring-boot-starter</artifactId>
</dependency>
```

```java
@Service
public class AIService {
    private final Tracer tracer;
    
    @WithSpan(value = "ai.chat", kind = SpanKind.CLIENT)
    public String chat(String message) {
        Span span = Span.current();
        span.setAttribute("message.length", message.length());
        span.setAttribute("model", "gpt-4o-mini");
        
        String response = chatClient.prompt().user(message).call().content();
        
        span.setAttribute("response.length", response.length());
        return response;
    }
}
```

#### 5.3 日志记录

**结构化日志**
```java
@Slf4j
@Service
public class AIService {
    public String chat(String message) {
        log.info("AI chat started", 
            kv("message", message),
            kv("model", "gpt-4o-mini")
        );
        
        long startTime = System.currentTimeMillis();
        String response = chatClient.prompt().user(message).call().content();
        long duration = System.currentTimeMillis() - startTime;
        
        log.info("AI chat completed",
            kv("duration_ms", duration),
            kv("response_length", response.length())
        );
        
        return response;
    }
}
```

---

## 🛠️ 实战练习

### 练习 1：智能客服基础版
构建一个简单的客服机器人，支持：
- 多轮对话
- 记忆管理
- 常见问题回答

### 练习 2：数据查询助手
实现一个自然语言查询数据库的工具：
- Function Calling 集成数据库
- SQL 生成与执行
- 结果格式化

### 练习 3：知识库问答
创建一个基于 RAG 的问答系统：
- QuestionAnswerAdvisor
- 文档检索
- 答案生成

---

## 📖 推荐资源

- [Spring AI 官方文档](https://docs.spring.io/spring-ai/reference/)
- [Spring AI GitHub](https://github.com/spring-projects/spring-ai)
- [Spring AI Examples](https://github.com/spring-projects/spring-ai-examples)

---

## 🚀 下一步

完成 Spring AI 学习后，你已经可以构建基础的 AI 应用了。接下来学习：

**下一步** → [第六部分：向量数据库](../06-vector-databases/)

---

**Spring AI 是 Java 开发者进入 AI 领域的最佳选择！** 它让你用熟悉的 Spring 方式构建生产级的 AI 应用。🚀
