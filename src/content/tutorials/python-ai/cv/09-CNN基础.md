---
title: CNN基础
prevChapter: "python-ai/cv/08-特征匹配"
nextChapter: "python-ai/cv/10-迁移学习"
parentChapter: "python-ai/cv/README"
---
# CNN基础

> 掌握卷积神经网络基础

## 📚 学习目标

- 理解CNN原理
- 掌握经典网络
- 学会使用PyTorch
- 了解模型训练

## 1. 简单CNN

```python
import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 8 * 8, 512)
        self.fc2 = nn.Linear(512, num_classes)
        self.relu = nn.ReLU()
        
    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))
        x = self.pool(self.relu(self.conv2(x)))
        x = x.view(-1, 64 * 8 * 8)
        x = self.relu(self.fc1(x))
        x = self.fc2(x)
        return x

model = SimpleCNN(num_classes=10)
```

## 2. 使用预训练模型

```python
import torchvision.models as models

# ResNet18
resnet = models.resnet18(pretrained=True)

# VGG16
vgg = models.vgg16(pretrained=True)

# 修改最后一层
num_features = resnet.fc.in_features
resnet.fc = nn.Linear(num_features, 10)
```

## 3. 训练模型

```python
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# 数据预处理
transform = transforms.Compose([
    transforms.Resize(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                       std=[0.229, 0.224, 0.225])
])

# 加载数据
train_dataset = datasets.CIFAR10(root='./data', train=True,
                                download=True, transform=transform)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

# 训练
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    for images, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
    
    print(f'Epoch {epoch+1}, Loss: {loss.item():.4f}')
```

---

**下一节：** [迁移学习](10-迁移学习.md)
