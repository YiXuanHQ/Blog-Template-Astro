---
title: RNN和LSTM
prevChapter: "python-ai/nlp/08-文本相似度"
nextChapter: "python-ai/nlp/10-Transformer"
parentChapter: "python-ai/nlp/README"
---
# RNN 和 LSTM

> 掌握循环神经网络在NLP中的应用

## 📚 学习目标

- 理解RNN原理
- 掌握LSTM架构
- 学会序列标注
- 了解双向LSTM

## 1. RNN 基础

```python
import torch
import torch.nn as nn

class SimpleRNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.hidden_size = hidden_size
        self.rnn = nn.RNN(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)
    
    def forward(self, x):
        # x: (batch, seq_len, input_size)
        out, hidden = self.rnn(x)
        # 使用最后一个时间步的输出
        out = self.fc(out[:, -1, :])
        return out

# 使用
model = SimpleRNN(input_size=100, hidden_size=128, output_size=2)
x = torch.randn(32, 10, 100)  # (batch, seq_len, features)
output = model(x)
print(output.shape)  # (32, 2)
```

## 2. LSTM

```python
class LSTMClassifier(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_classes):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, num_classes)
    
    def forward(self, x):
        # x: (batch, seq_len)
        embedded = self.embedding(x)
        # LSTM
        lstm_out, (hidden, cell) = self.lstm(embedded)
        # 使用最后的隐藏状态
        out = self.fc(hidden[-1])
        return out

# 训练
model = LSTMClassifier(vocab_size=10000, embed_dim=100, 
                      hidden_dim=128, num_classes=2)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    for batch_x, batch_y in train_loader:
        optimizer.zero_grad()
        outputs = model(batch_x)
        loss = criterion(outputs, batch_y)
        loss.backward()
        optimizer.step()
```

## 3. 双向 LSTM

```python
class BiLSTM(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_classes):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.bilstm = nn.LSTM(embed_dim, hidden_dim, 
                             batch_first=True, bidirectional=True)
        self.fc = nn.Linear(hidden_dim * 2, num_classes)  # *2 for bidirectional
    
    def forward(self, x):
        embedded = self.embedding(x)
        lstm_out, (hidden, cell) = self.bilstm(embedded)
        # 拼接前向和后向的最后隐藏状态
        hidden = torch.cat((hidden[-2], hidden[-1]), dim=1)
        out = self.fc(hidden)
        return out
```

## 4. 序列标注（NER）

```python
class BiLSTM_CRF(nn.Module):
    def __init__(self, vocab_size, tagset_size, embed_dim, hidden_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim // 2,
                           num_layers=1, bidirectional=True, batch_first=True)
        self.hidden2tag = nn.Linear(hidden_dim, tagset_size)
    
    def forward(self, x):
        embedded = self.embedding(x)
        lstm_out, _ = self.lstm(embedded)
        tag_scores = self.hidden2tag(lstm_out)
        return tag_scores

# 用于命名实体识别
model = BiLSTM_CRF(vocab_size=5000, tagset_size=10,
                   embed_dim=100, hidden_dim=256)
```

## 5. 实战：文本分类

```python
import torch
from torch.utils.data import Dataset, DataLoader
import jieba

# 数据集
class TextDataset(Dataset):
    def __init__(self, texts, labels, word2idx, max_len=50):
        self.texts = texts
        self.labels = labels
        self.word2idx = word2idx
        self.max_len = max_len
    
    def __len__(self):
        return len(self.texts)
    
    def __getitem__(self, idx):
        text = self.texts[idx]
        label = self.labels[idx]
        
        # 分词并转为索引
        words = list(jieba.cut(text))
        indices = [self.word2idx.get(w, 0) for w in words]
        
        # 截断或填充
        if len(indices) < self.max_len:
            indices += [0] * (self.max_len - len(indices))
        else:
            indices = indices[:self.max_len]
        
        return torch.tensor(indices), torch.tensor(label)

# 训练
texts = ["这个产品很好", "质量太差了"]
labels = [1, 0]
word2idx = {"这个": 1, "产品": 2, "很": 3, "好": 4, "质量": 5, "太": 6, "差": 7, "了": 8}

dataset = TextDataset(texts, labels, word2idx)
loader = DataLoader(dataset, batch_size=2, shuffle=True)

model = LSTMClassifier(vocab_size=len(word2idx)+1, embed_dim=50,
                      hidden_dim=64, num_classes=2)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters())

for epoch in range(10):
    for batch_x, batch_y in loader:
        optimizer.zero_grad()
        outputs = model(batch_x)
        loss = criterion(outputs, batch_y)
        loss.backward()
        optimizer.step()
    print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")
```

---

**下一节：** [Transformer](10-Transformer.md)
