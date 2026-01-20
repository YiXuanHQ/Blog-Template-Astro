---
title: Transformer
prevChapter: "python-ai/nlp/09-RNN和LSTM"
nextChapter: "python-ai/nlp/11-文本生成"
parentChapter: "python-ai/nlp/README"
---
# Transformer

> 掌握Transformer架构和预训练模型

## 📚 学习目标

- 理解Attention机制
- 掌握Transformer架构
- 学会使用BERT
- 了解GPT模型

## 1. Self-Attention

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class SelfAttention(nn.Module):
    def __init__(self, embed_dim):
        super().__init__()
        self.embed_dim = embed_dim
        self.query = nn.Linear(embed_dim, embed_dim)
        self.key = nn.Linear(embed_dim, embed_dim)
        self.value = nn.Linear(embed_dim, embed_dim)
    
    def forward(self, x):
        # x: (batch, seq_len, embed_dim)
        Q = self.query(x)
        K = self.key(x)
        V = self.value(x)
        
        # 计算注意力分数
        scores = torch.matmul(Q, K.transpose(-2, -1)) / (self.embed_dim ** 0.5)
        attention_weights = F.softmax(scores, dim=-1)
        
        # 加权求和
        out = torch.matmul(attention_weights, V)
        return out
```

## 2. 使用 BERT

```python
from transformers import BertTokenizer, BertModel

# 加载预训练模型
tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
model = BertModel.from_pretrained('bert-base-chinese')

# 编码文本
text = "自然语言处理很有趣"
inputs = tokenizer(text, return_tensors='pt')

# 获取编码
outputs = model(**inputs)
last_hidden_states = outputs.last_hidden_state
print(last_hidden_states.shape)  # (1, seq_len, 768)
```

## 3. BERT 文本分类

```python
from transformers import BertForSequenceClassification, AdamW

# 加载分类模型
model = BertForSequenceClassification.from_pretrained(
    'bert-base-chinese',
    num_labels=2
)

# 训练
optimizer = AdamW(model.parameters(), lr=2e-5)

for epoch in range(3):
    for batch in train_loader:
        inputs = tokenizer(batch['text'], padding=True, 
                          truncation=True, return_tensors='pt')
        labels = batch['labels']
        
        outputs = model(**inputs, labels=labels)
        loss = outputs.loss
        
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
```

## 4. 使用 GPT

```python
from transformers import GPT2LMHeadModel, GPT2Tokenizer

# 加载GPT-2
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')

# 生成文本
input_text = "Once upon a time"
input_ids = tokenizer.encode(input_text, return_tensors='pt')

# 生成
output = model.generate(
    input_ids,
    max_length=50,
    num_return_sequences=1,
    no_repeat_ngram_size=2,
    temperature=0.7
)

generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(generated_text)
```

## 5. 中文预训练模型

```python
# 使用Chinese-BERT
from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained("hfl/chinese-bert-wwm-ext")
model = AutoModel.from_pretrained("hfl/chinese-bert-wwm-ext")

# 编码
text = "今天天气很好"
inputs = tokenizer(text, return_tensors="pt")
outputs = model(**inputs)
```

---

**下一节：** [文本生成](11-文本生成.md)
