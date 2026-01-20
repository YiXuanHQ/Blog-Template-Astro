---
title: 第七部分：RAG 应用开发
---

# 第七部分：RAG 应用开发 ⭐⭐⭐⭐⭐

> 检索增强生成 - 企业级 AI 应用的核心技术

## 📖 本部分概述

**RAG (Retrieval-Augmented Generation)** 是当前最实用的 AI 应用技术之一。它通过将外部知识库与大语言模型结合，解决了 LLM 的知识局限性和幻觉问题。几乎所有企业级 AI 应用都会用到 RAG。

**学习时长：** 4-6 周  
**难度：** ⭐⭐⭐⭐☆  
**重要程度：** ⭐⭐⭐⭐⭐ **(必修)**

---

## 🎯 学习目标

完成本部分学习后，你将能够：

- ✅ 理解 RAG 的工作原理和应用场景
- ✅ 设计完整的 RAG 系统架构
- ✅ 实现文档处理管道（ETL）
- ✅ 掌握多种检索策略
- ✅ 优化 RAG 性能和准确率
- ✅ 使用 Spring AI 构建生产级 RAG 应用

---

## 💡 什么是 RAG？

### 问题：LLM 的局限性

1. **知识截止日期** - 训练数据有时间限制
2. **无法访问私有数据** - 不知道你公司的内部信息
3. **容易产生幻觉** - 编造不存在的信息
4. **更新困难** - 重新训练模型成本高

### 解决方案：RAG

**RAG = 检索 (Retrieval) + 生成 (Generation)**

```
用户问题 → 检索相关文档 → 构建上下文 → LLM 生成答案
```

### RAG vs Fine-tuning

| 对比项 | RAG | Fine-tuning |
|--------|-----|-------------|
| **成本** | 低（只需存储） | 高（需要训练） |
| **更新速度** | 实时 | 慢（需重新训练） |
| **数据量要求** | 少 | 多 |
| **适用场景** | 知识库、问答 | 特定任务、风格调整 |
| **可解释性** | 高（可溯源） | 低 |

---

## 📚 课程内容

### 1. [RAG 基础](rag-basics/)

#### 1.1 RAG 工作流程

```
┌─────────────┐
│ 用户提问     │
│"Spring AI是  │
│ 什么？"     │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ 1. 问题向量化    │ 
│ Embedding Model │
└──────┬──────────┘
       │ [0.2, 0.5, ...]
       ▼
┌─────────────────┐
│ 2. 向量检索      │
│ Vector Store    │
│ (Top K=5)       │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ 3. 相关文档      │
│ Doc1: Spring AI │
│ Doc2: Features  │
│ Doc3: Example   │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ 4. 构建 Prompt   │
│ Context + Query │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ 5. LLM 生成答案  │
│ "Spring AI是..." │
└─────────────────┘
```

#### 1.2 核心组件

**Embedding Model (嵌入模型)**
- 将文本转为向量
- 常用：OpenAI Embeddings, HuggingFace

**Vector Store (向量数据库)**
- 存储和检索向量
- 常用：PGVector, Redis, Pinecone

**LLM (大语言模型)**
- 根据上下文生成答案
- 常用：GPT-4, Claude, Gemini

#### 1.3 Spring AI RAG 示例

```java
@Service
public class SimpleRAGService {
    
    @Autowired
    private ChatClient chatClient;
    
    @Autowired
    private VectorStore vectorStore;
    
    public String query(String question) {
        // 1. 检索相关文档
        List<Document> docs = vectorStore.similaritySearch(
            SearchRequest.query(question).withTopK(5)
        );
        
        // 2. 构建上下文
        String context = docs.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("\n\n"));
        
        // 3. 生成答案
        return chatClient.prompt()
            .system("基于以下文档回答问题：\n" + context)
            .user(question)
            .call()
            .content();
    }
}
```

---

### 2. [文档处理](document-processing/)

#### 2.1 ETL Pipeline

**ETL = Extract (提取) → Transform (转换) → Load (加载)**

```java
@Service
public class DocumentIngestionService {
    
    @Autowired
    private VectorStore vectorStore;
    
    @Autowired
    private EmbeddingModel embeddingModel;
    
    public void ingestDocument(String filePath) {
        // 1. Extract - 文档加载
        PagePdfDocumentReader reader = 
            new PagePdfDocumentReader(new FileSystemResource(filePath));
        List<Document> documents = reader.get();
        
        // 2. Transform - 文本分块
        TextSplitter splitter = new TokenTextSplitter(500, 50);
        List<Document> chunks = splitter.split(documents);
        
        // 3. Load - 向量化并存储
        vectorStore.add(chunks);
    }
}
```

#### 2.2 文档加载器

**支持的格式：**

```java
// PDF
PagePdfDocumentReader pdfReader = new PagePdfDocumentReader(file);

// Word
TikaDocumentReader wordReader = new TikaDocumentReader(file);

// Markdown
TextReader mdReader = new TextReader(file);

// JSON
JsonReader jsonReader = new JsonReader(file);

// 网页
HtmlDocumentReader htmlReader = new HtmlDocumentReader(url);
```

#### 2.3 文本分块策略

**为什么要分块？**
- LLM 上下文窗口有限
- 提高检索精度
- 减少无关信息

**分块方法对比：**

| 策略 | 说明 | 适用场景 |
|------|------|---------|
| **固定长度** | 按字符/Token 数分块 | 通用 |
| **句子边界** | 按句子分割 | 需要完整语义 |
| **段落边界** | 按段落分割 | 结构化文档 |
| **语义分块** | 根据语义相似度 | 高质量要求 |

**代码示例：**

```java
// 1. 固定 Token 分块
TextSplitter tokenSplitter = new TokenTextSplitter(
    500,   // chunk size
    50     // overlap
);

// 2. 句子分块
TextSplitter sentenceSplitter = new ParagraphTextSplitter(
    1000,  // 最大字符数
    100    // 重叠
);

// 3. 递归字符分块（推荐）
TextSplitter recursiveSplitter = new RecursiveCharacterTextSplitter(
    500, 
    50,
    List.of("\n\n", "\n", " ", "")  // 分隔符优先级
);
```

#### 2.4 元数据提取

```java
@Service
public class MetadataExtractor {
    
    public Document enrichDocument(Document doc, String filePath) {
        Map<String, Object> metadata = new HashMap<>();
        
        // 基础元数据
        metadata.put("source", filePath);
        metadata.put("timestamp", Instant.now());
        metadata.put("length", doc.getContent().length());
        
        // 提取标题
        String title = extractTitle(doc.getContent());
        metadata.put("title", title);
        
        // 提取关键词
        List<String> keywords = extractKeywords(doc.getContent());
        metadata.put("keywords", keywords);
        
        // 分类
        String category = classifyDocument(doc.getContent());
        metadata.put("category", category);
        
        return Document.builder()
            .content(doc.getContent())
            .metadata(metadata)
            .build();
    }
}
```

---

### 3. [检索策略](retrieval-strategies/)

#### 3.1 向量检索（基础）

```java
// 最基础的语义搜索
List<Document> results = vectorStore.similaritySearch(
    SearchRequest.query("Spring AI 是什么？")
        .withTopK(5)                    // 返回 Top 5
        .withSimilarityThreshold(0.7)   // 相似度阈值
);
```

#### 3.2 元数据过滤

```java
// 使用 Filter Expression
SearchRequest request = SearchRequest.query("Spring AI")
    .withTopK(5)
    .withFilterExpression(
        "category == 'documentation' && year >= 2024"
    );

List<Document> results = vectorStore.similaritySearch(request);
```

**Filter Expression 语法：**
```
// 相等
category == 'tech'

// 不等
status != 'deleted'

// 比较
year >= 2024 && views > 1000

// IN 操作
category in ['java', 'spring', 'ai']

// 逻辑运算
(category == 'tech' || category == 'ai') && year >= 2024
```

#### 3.3 混合检索（Hybrid Search）

**向量检索 + 关键词检索**

```java
@Service
public class HybridSearchService {
    
    public List<Document> hybridSearch(String query) {
        // 1. 向量检索
        List<Document> vectorResults = vectorStore.similaritySearch(
            SearchRequest.query(query).withTopK(10)
        );
        
        // 2. 关键词检索（BM25）
        List<Document> keywordResults = fullTextSearch(query, 10);
        
        // 3. 融合结果（RRF - Reciprocal Rank Fusion）
        return fuseResults(vectorResults, keywordResults);
    }
    
    private List<Document> fuseResults(
        List<Document> list1, 
        List<Document> list2
    ) {
        Map<String, Double> scores = new HashMap<>();
        
        // 计算 RRF 分数
        for (int i = 0; i < list1.size(); i++) {
            String id = list1.get(i).getId();
            scores.merge(id, 1.0 / (60 + i + 1), Double::sum);
        }
        
        for (int i = 0; i < list2.size(); i++) {
            String id = list2.get(i).getId();
            scores.merge(id, 1.0 / (60 + i + 1), Double::sum);
        }
        
        // 按分数排序
        return scores.entrySet().stream()
            .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
            .map(e -> findDocumentById(e.getKey()))
            .limit(5)
            .collect(Collectors.toList());
    }
}
```

#### 3.4 重排序（Reranking）

```java
@Service
public class RerankingService {
    
    @Autowired
    private ChatClient chatClient;
    
    public List<Document> rerankDocuments(
        String query, 
        List<Document> candidates
    ) {
        // 使用 LLM 对候选文档重新打分
        List<ScoredDocument> scored = candidates.stream()
            .map(doc -> {
                String prompt = String.format(
                    "问题：%s\n文档：%s\n相关性评分(0-10)：", 
                    query, 
                    doc.getContent()
                );
                
                String scoreStr = chatClient.prompt()
                    .user(prompt)
                    .call()
                    .content();
                
                double score = Double.parseDouble(scoreStr.trim());
                return new ScoredDocument(doc, score);
            })
            .collect(Collectors.toList());
        
        // 按分数排序
        return scored.stream()
            .sorted(Comparator.comparingDouble(ScoredDocument::score).reversed())
            .map(ScoredDocument::document)
            .collect(Collectors.toList());
    }
}
```

---

### 4. [高级 RAG](advanced-rag/)

#### 4.1 查询重写

```java
@Service
public class QueryRewriteService {
    
    @Autowired
    private ChatClient chatClient;
    
    public String rewriteQuery(String originalQuery) {
        return chatClient.prompt()
            .system("将用户问题改写为更适合检索的查询")
            .user(originalQuery)
            .call()
            .content();
    }
    
    public List<String> generateMultipleQueries(String query) {
        String prompt = String.format(
            "生成3个语义相似但表述不同的问题：\n原问题：%s",
            query
        );
        
        return chatClient.prompt()
            .user(prompt)
            .call()
            .entity(new ParameterizedTypeReference<List<String>>() {});
    }
}
```

#### 4.2 HyDE (Hypothetical Document Embeddings)

```java
public List<Document> hydeSearch(String query) {
    // 1. 生成假设性答案
    String hypotheticalAnswer = chatClient.prompt()
        .system("生成一个假设性的答案（即使不确定）")
        .user(query)
        .call()
        .content();
    
    // 2. 用假设答案检索
    return vectorStore.similaritySearch(
        SearchRequest.query(hypotheticalAnswer).withTopK(5)
    );
}
```

#### 4.3 自适应 RAG

```java
@Service
public class AdaptiveRAGService {
    
    public String query(String question) {
        // 1. 判断是否需要检索
        boolean needsRetrieval = shouldRetrieve(question);
        
        if (!needsRetrieval) {
            // 直接回答
            return chatClient.prompt().user(question).call().content();
        }
        
        // 2. 执行检索
        List<Document> docs = vectorStore.similaritySearch(
            SearchRequest.query(question).withTopK(5)
        );
        
        // 3. 评估检索质量
        double relevance = evaluateRelevance(question, docs);
        
        if (relevance < 0.6) {
            // 检索质量低，生成新的查询
            String rewritten = rewriteQuery(question);
            docs = vectorStore.similaritySearch(
                SearchRequest.query(rewritten).withTopK(5)
            );
        }
        
        // 4. 生成答案
        return generateAnswer(question, docs);
    }
}
```

---

### 5. [Spring AI RAG 实战](spring-ai-rag/)

#### 5.1 使用 QuestionAnswerAdvisor

```java
@Configuration
public class RAGConfig {
    
    @Bean
    public ChatClient ragChatClient(
        ChatModel chatModel,
        VectorStore vectorStore
    ) {
        return ChatClient.builder(chatModel)
            .defaultAdvisors(
                new QuestionAnswerAdvisor(vectorStore, 
                    SearchRequest.defaults()
                        .withTopK(5)
                )
            )
            .build();
    }
}

// 使用
@Service
public class RAGService {
    @Autowired
    private ChatClient ragChatClient;
    
    public String query(String question) {
        // 自动 RAG
        return ragChatClient.prompt()
            .user(question)
            .call()
            .content();
    }
}
```

#### 5.2 完整的 RAG 应用

```java
@Service
@Slf4j
public class KnowledgeBaseService {
    
    @Autowired
    private ChatClient chatClient;
    
    @Autowired
    private VectorStore vectorStore;
    
    /**
     * 文档导入
     */
    @Transactional
    public void ingestDocument(MultipartFile file) {
        try {
            // 1. 加载文档
            Resource resource = file.getResource();
            PagePdfDocumentReader reader = new PagePdfDocumentReader(resource);
            List<Document> documents = reader.get();
            
            // 2. 添加元数据
            documents.forEach(doc -> {
                doc.getMetadata().put("filename", file.getOriginalFilename());
                doc.getMetadata().put("uploadTime", Instant.now());
            });
            
            // 3. 分块
            TextSplitter splitter = new TokenTextSplitter(500, 50);
            List<Document> chunks = splitter.split(documents);
            
            // 4. 存储
            vectorStore.add(chunks);
            
            log.info("Document ingested: {}", file.getOriginalFilename());
        } catch (Exception e) {
            log.error("Failed to ingest document", e);
            throw new RuntimeException("Document ingestion failed", e);
        }
    }
    
    /**
     * 智能问答
     */
    public AnswerWithSources queryWithSources(String question) {
        // 1. 检索
        List<Document> docs = vectorStore.similaritySearch(
            SearchRequest.query(question)
                .withTopK(5)
                .withSimilarityThreshold(0.7)
        );
        
        if (docs.isEmpty()) {
            return new AnswerWithSources(
                "抱歉，没有找到相关信息。",
                Collections.emptyList()
            );
        }
        
        // 2. 构建上下文
        String context = docs.stream()
            .map(doc -> String.format(
                "文档片段（来源：%s）：\n%s",
                doc.getMetadata().get("filename"),
                doc.getContent()
            ))
            .collect(Collectors.joining("\n\n"));
        
        // 3. 生成答案
        String answer = chatClient.prompt()
            .system("""
                你是一个专业的问答助手。
                基于提供的文档片段回答问题。
                如果文档中没有相关信息，请明确说明。
                回答时要引用来源。
                """)
            .user(String.format("上下文：\n%s\n\n问题：%s", context, question))
            .call()
            .content();
        
        // 4. 提取来源
        List<Source> sources = docs.stream()
            .map(doc -> new Source(
                (String) doc.getMetadata().get("filename"),
                doc.getContent().substring(0, Math.min(200, doc.getContent().length()))
            ))
            .distinct()
            .collect(Collectors.toList());
        
        return new AnswerWithSources(answer, sources);
    }
}

record AnswerWithSources(String answer, List<Source> sources) {}
record Source(String filename, String preview) {}
```

---

## 🎯 RAG 评估与优化

### 评估指标

```java
@Service
public class RAGEvaluationService {
    
    /**
     * 评估检索质量
     */
    public double evaluateRetrieval(String query, List<Document> retrieved) {
        // 相关性评分
        double relevanceScore = calculateRelevance(query, retrieved);
        
        // 召回率
        double recall = calculateRecall(query, retrieved);
        
        // 多样性
        double diversity = calculateDiversity(retrieved);
        
        return 0.5 * relevanceScore + 0.3 * recall + 0.2 * diversity;
    }
    
    /**
     * 评估生成质量
     */
    public double evaluateGeneration(String answer, String groundTruth) {
        // BLEU 分数
        double bleu = calculateBLEU(answer, groundTruth);
        
        // ROUGE 分数
        double rouge = calculateROUGE(answer, groundTruth);
        
        // 事实准确性
        double factuality = checkFactuality(answer);
        
        return 0.3 * bleu + 0.3 * rouge + 0.4 * factuality;
    }
}
```

---

## 📖 推荐资源

- [Spring AI RAG 文档](https://docs.spring.io/spring-ai/reference/api/etl-pipeline.html)
- [RAG 论文](https://arxiv.org/abs/2005.11401)
- [Advanced RAG Techniques](https://arxiv.org/abs/2312.10997)

---

## 🚀 下一步

掌握 RAG 后，你已经可以构建实用的 AI 应用了。接下来学习 Agent 开发：

**下一步** → [第八部分：Agent 开发](../08-agent-development/)

---

**RAG 是企业级 AI 应用的基石！** 几乎所有成功的 AI 产品都使用了 RAG 技术。🚀
