---
title: WebSocket 实时通信
date: 2025-01-22
prevChapter: "harmonyos-dev/08-network-connect/01-HTTP请求"
nextChapter: "harmonyos-dev/08-network-connect/03-网络安全"
parentChapter: "harmonyos-dev/08-network-connect/README"
---
# WebSocket 实时通信

> 实现双向实时通信

## 📚 WebSocket 概述

WebSocket 提供全双工通信，适合实时消息推送。

### 使用场景

```
✅ 适合
├─ 即时聊天
├─ 实时推送
├─ 在线游戏
└─ 协同编辑

❌ 不适合
└─ 简单请求（用 HTTP）
```

## 🔧 基本使用

### 建立连接

```typescript
import webSocket from '@ohos.net.webSocket'

// 创建 WebSocket 对象
const ws = webSocket.createWebSocket()

// 连接服务器
ws.connect('wss://example.com/socket', (err, value) => {
  if (!err) {
    console.log('连接成功')
  } else {
    console.error('连接失败:', err)
  }
})

// 监听打开事件
ws.on('open', (err, value) => {
  console.log('WebSocket 已打开')
})

// 监听消息
ws.on('message', (err, value) => {
  console.log('收到消息:', value)
})

// 监听关闭
ws.on('close', (err, value) => {
  console.log('连接已关闭')
})

// 监听错误
ws.on('error', (err) => {
  console.error('WebSocket 错误:', err)
})
```

### 发送消息

```typescript
// 发送文本消息
ws.send('Hello Server', (err) => {
  if (!err) {
    console.log('发送成功')
  }
})

// 发送 JSON
const message = {
  type: 'chat',
  content: 'Hello',
  timestamp: Date.now()
}
ws.send(JSON.stringify(message))
```

### 关闭连接

```typescript
// 关闭连接
ws.close((err) => {
  if (!err) {
    console.log('关闭成功')
  }
})
```

## 🎯 实战案例

### 即时聊天应用

```typescript
import webSocket from '@ohos.net.webSocket'

class ChatClient {
  private ws: webSocket.WebSocket
  private url: string
  private reconnectAttempts: number = 0
  private maxReconnectAttempts: number = 5
  private heartbeatTimer: number = 0
  
  constructor(url: string) {
    this.url = url
  }
  
  connect() {
    this.ws = webSocket.createWebSocket()
    
    // 连接服务器
    this.ws.connect(this.url, (err) => {
      if (!err) {
        console.log('连接成功')
        this.reconnectAttempts = 0
        this.startHeartbeat()
      } else {
        console.error('连接失败:', err)
        this.reconnect()
      }
    })
    
    // 监听消息
    this.ws.on('message', (err, value) => {
      if (!err) {
        this.handleMessage(value)
      }
    })
    
    // 监听关闭
    this.ws.on('close', (err, value) => {
      console.log('连接关闭')
      this.stopHeartbeat()
      this.reconnect()
    })
    
    // 监听错误
    this.ws.on('error', (err) => {
      console.error('WebSocket 错误:', err)
    })
  }
  
  // 发送消息
  sendMessage(message: ChatMessage) {
    if (this.ws) {
      this.ws.send(JSON.stringify(message), (err) => {
        if (err) {
          console.error('发送失败:', err)
        }
      })
    }
  }
  
  // 处理收到的消息
  private handleMessage(data: string | ArrayBuffer) {
    try {
      const message = JSON.parse(data.toString())
      
      switch (message.type) {
        case 'chat':
          this.onChatMessage(message)
          break
        case 'system':
          this.onSystemMessage(message)
          break
        case 'pong':
          console.log('心跳响应')
          break
      }
    } catch (err) {
      console.error('解析消息失败:', err)
    }
  }
  
  // 聊天消息
  private onChatMessage(message: ChatMessage) {
    console.log('收到聊天消息:', message)
    // 通知UI更新
    AppStorage.SetOrCreate('newMessage', message)
  }
  
  // 系统消息
  private onSystemMessage(message: any) {
    console.log('系统消息:', message)
  }
  
  // 心跳保活
  private startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      this.sendMessage({
        type: 'ping',
        timestamp: Date.now()
      } as ChatMessage)
    }, 30000)  // 每30秒发送一次
  }
  
  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = 0
    }
  }
  
  // 重连
  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`尝试重连 (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
      
      setTimeout(() => {
        this.connect()
      }, 3000 * this.reconnectAttempts)
    } else {
      console.log('重连失败，已达最大尝试次数')
    }
  }
  
  // 断开连接
  disconnect() {
    this.stopHeartbeat()
    
    if (this.ws) {
      this.ws.close()
    }
  }
}

interface ChatMessage {
  type: 'chat' | 'ping' | 'system'
  content?: string
  timestamp: number
  from?: string
  to?: string
}

// 使用
@Entry
@Component
struct ChatPage {
  private chatClient: ChatClient
  @State messages: ChatMessage[] = []
  @State inputText: string = ''
  
  aboutToAppear() {
    this.chatClient = new ChatClient('wss://chat.example.com')
    this.chatClient.connect()
    
    // 监听新消息
    AppStorage.SetOrCreate('newMessage', null)
  }
  
  aboutToDisappear() {
    this.chatClient.disconnect()
  }
  
  sendMessage() {
    if (this.inputText.trim()) {
      const message: ChatMessage = {
        type: 'chat',
        content: this.inputText,
        timestamp: Date.now(),
        from: 'me'
      }
      
      this.chatClient.sendMessage(message)
      this.messages.push(message)
      this.inputText = ''
    }
  }
  
  build() {
    Column() {
      // 消息列表
      List() {
        ForEach(this.messages, (msg: ChatMessage) => {
          ListItem() {
            Text(msg.content)
              .padding(10)
              .backgroundColor(msg.from === 'me' ? Color.Blue : Color.Gray)
              .fontColor(Color.White)
              .borderRadius(8)
          }
        })
      }
      .layoutWeight(1)
      
      // 输入框
      Row({ space: 10 }) {
        TextInput({ text: this.inputText })
          .layoutWeight(1)
          .onChange((value) => {
            this.inputText = value
          })
        
        Button('发送')
          .onClick(() => {
            this.sendMessage()
          })
      }
      .padding(10)
    }
  }
}
```

## 💡 最佳实践

### 1. 实现心跳保活

```typescript
// 定期发送心跳
setInterval(() => {
  ws.send(JSON.stringify({ type: 'ping' }))
}, 30000)
```

### 2. 自动重连

```typescript
let reconnectAttempts = 0

ws.on('close', () => {
  if (reconnectAttempts < 5) {
    reconnectAttempts++
    setTimeout(() => {
      connect()
    }, 3000)
  }
})
```

### 3. 消息队列

```typescript
const messageQueue: string[] = []
let isConnected = false

function sendMessage(msg: string) {
  if (isConnected) {
    ws.send(msg)
  } else {
    messageQueue.push(msg)
  }
}

ws.on('open', () => {
  isConnected = true
  // 发送队列中的消息
  while (messageQueue.length > 0) {
    ws.send(messageQueue.shift())
  }
})
```

## 📚 参考资源

- [WebSocket 官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-webSocket-0000001821000425-V5)

---

**下一节** → [网络安全](03-网络安全.md)
