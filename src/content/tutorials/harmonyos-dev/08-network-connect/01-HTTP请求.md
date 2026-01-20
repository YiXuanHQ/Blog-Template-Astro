---
title: HTTP 请求
date: 2025-01-22
nextChapter: "harmonyos-dev/08-network-connect/02-WebSocket实时通信"
parentChapter: "harmonyos-dev/08-network-connect/README"
---
# HTTP 请求

> 掌握网络请求基础

## 📚 HTTP 模块

HarmonyOS 提供了 `@ohos.net.http` 模块用于 HTTP 通信。

### 导入模块

```typescript
import http from '@ohos.net.http'
```

## 🔧 GET 请求

### 基础 GET 请求

```typescript
import http from '@ohos.net.http'

async function fetchData() {
  // 创建 HTTP 请求对象
  const httpRequest = http.createHttp()
  
  try {
    // 发送 GET 请求
    const response = await httpRequest.request(
      'https://api.example.com/users',
      {
        method: http.RequestMethod.GET,
        header: {
          'Content-Type': 'application/json'
        },
        readTimeout: 60000,
        connectTimeout: 60000
      }
    )
    
    console.log('状态码:', response.responseCode)
    console.log('响应数据:', response.result)
    
    // 解析 JSON
    const data = JSON.parse(response.result.toString())
    return data
    
  } catch (err) {
    console.error('请求失败:', err)
  } finally {
    // 销毁请求对象
    httpRequest.destroy()
  }
}
```

### 带参数的 GET 请求

```typescript
async function fetchUserById(userId: number) {
  const httpRequest = http.createHttp()
  
  const url = `https://api.example.com/users/${userId}`
  
  const response = await httpRequest.request(url, {
    method: http.RequestMethod.GET,
    header: {
      'Authorization': 'Bearer token123',
      'Content-Type': 'application/json'
    }
  })
  
  httpRequest.destroy()
  return JSON.parse(response.result.toString())
}
```

## 📤 POST 请求

### JSON 数据提交

```typescript
async function createUser(user: User) {
  const httpRequest = http.createHttp()
  
  try {
    const response = await httpRequest.request(
      'https://api.example.com/users',
      {
        method: http.RequestMethod.POST,
        header: {
          'Content-Type': 'application/json'
        },
        extraData: JSON.stringify(user)
      }
    )
    
    if (response.responseCode === 201) {
      console.log('创建成功')
      return JSON.parse(response.result.toString())
    }
  } catch (err) {
    console.error('创建失败:', err)
  } finally {
    httpRequest.destroy()
  }
}

interface User {
  name: string
  email: string
  age: number
}
```

### 表单数据提交

```typescript
async function submitForm(formData: FormData) {
  const httpRequest = http.createHttp()
  
  // 构建表单数据
  const params = new URLSearchParams()
  params.append('username', formData.username)
  params.append('password', formData.password)
  
  const response = await httpRequest.request(
    'https://api.example.com/login',
    {
      method: http.RequestMethod.POST,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      extraData: params.toString()
    }
  )
  
  httpRequest.destroy()
  return response
}
```

## 📁 文件上传

### 单文件上传

```typescript
import fs from '@ohos.file.fs'

async function uploadFile(filePath: string) {
  const httpRequest = http.createHttp()
  
  try {
    // 读取文件
    const file = fs.openSync(filePath, fs.OpenMode.READ_ONLY)
    const stat = fs.statSync(filePath)
    const buffer = new ArrayBuffer(stat.size)
    fs.readSync(file.fd, buffer)
    fs.closeSync(file)
    
    // 上传文件
    const response = await httpRequest.request(
      'https://api.example.com/upload',
      {
        method: http.RequestMethod.POST,
        header: {
          'Content-Type': 'multipart/form-data'
        },
        extraData: buffer
      }
    )
    
    console.log('上传成功:', response.result)
    
  } catch (err) {
    console.error('上传失败:', err)
  } finally {
    httpRequest.destroy()
  }
}
```

## 📥 文件下载

### 下载文件

```typescript
async function downloadFile(url: string, savePath: string) {
  const httpRequest = http.createHttp()
  
  try {
    const response = await httpRequest.request(url, {
      method: http.RequestMethod.GET
    })
    
    if (response.responseCode === 200) {
      // 保存文件
      const file = fs.openSync(savePath, fs.OpenMode.CREATE | fs.OpenMode.WRITE_ONLY)
      fs.writeSync(file.fd, response.result)
      fs.closeSync(file)
      
      console.log('下载成功:', savePath)
    }
  } catch (err) {
    console.error('下载失败:', err)
  } finally {
    httpRequest.destroy()
  }
}
```

### 带进度的下载

```typescript
async function downloadWithProgress(url: string, savePath: string) {
  const httpRequest = http.createHttp()
  
  // 监听进度
  httpRequest.on('headerReceive', (headers) => {
    const contentLength = headers['content-length']
    console.log('文件大小:', contentLength)
  })
  
  httpRequest.on('dataReceive', (data) => {
    const progress = (data.length / totalLength) * 100
    console.log('下载进度:', progress.toFixed(2) + '%')
  })
  
  const response = await httpRequest.request(url, {
    method: http.RequestMethod.GET
  })
  
  // 保存文件
  const file = fs.openSync(savePath, fs.OpenMode.CREATE | fs.OpenMode.WRITE_ONLY)
  fs.writeSync(file.fd, response.result)
  fs.closeSync(file)
  
  httpRequest.destroy()
}
```

## 🎯 实战案例

### API 服务封装

```typescript
import http from '@ohos.net.http'

class ApiService {
  private baseUrl: string = 'https://api.example.com'
  private token: string = ''
  
  setToken(token: string) {
    this.token = token
  }
  
  private async request(url: string, options: http.HttpRequestOptions) {
    const httpRequest = http.createHttp()
    
    try {
      const fullUrl = `${this.baseUrl}${url}`
      
      // 添加认证头
      const headers = {
        ...options.header,
        'Authorization': `Bearer ${this.token}`
      }
      
      const response = await httpRequest.request(fullUrl, {
        ...options,
        header: headers
      })
      
      if (response.responseCode >= 200 && response.responseCode < 300) {
        return JSON.parse(response.result.toString())
      } else {
        throw new Error(`HTTP ${response.responseCode}`)
      }
    } finally {
      httpRequest.destroy()
    }
  }
  
  async get(url: string) {
    return this.request(url, {
      method: http.RequestMethod.GET
    })
  }
  
  async post(url: string, data: any) {
    return this.request(url, {
      method: http.RequestMethod.POST,
      header: {
        'Content-Type': 'application/json'
      },
      extraData: JSON.stringify(data)
    })
  }
  
  async put(url: string, data: any) {
    return this.request(url, {
      method: http.RequestMethod.PUT,
      header: {
        'Content-Type': 'application/json'
      },
      extraData: JSON.stringify(data)
    })
  }
  
  async delete(url: string) {
    return this.request(url, {
      method: http.RequestMethod.DELETE
    })
  }
}

// 使用
const api = new ApiService()
api.setToken('your-token')

// GET 请求
const users = await api.get('/users')

// POST 请求
const newUser = await api.post('/users', {
  name: 'Alice',
  email: 'alice@example.com'
})

// PUT 请求
const updated = await api.put('/users/1', {
  name: 'Bob'
})

// DELETE 请求
await api.delete('/users/1')
```

### 请求拦截器

```typescript
class HttpClient {
  private requestInterceptors: Function[] = []
  private responseInterceptors: Function[] = []
  
  // 添加请求拦截器
  addRequestInterceptor(interceptor: Function) {
    this.requestInterceptors.push(interceptor)
  }
  
  // 添加响应拦截器
  addResponseInterceptor(interceptor: Function) {
    this.responseInterceptors.push(interceptor)
  }
  
  async request(url: string, options: http.HttpRequestOptions) {
    // 执行请求拦截器
    let modifiedOptions = options
    for (const interceptor of this.requestInterceptors) {
      modifiedOptions = await interceptor(url, modifiedOptions)
    }
    
    // 发送请求
    const httpRequest = http.createHttp()
    let response = await httpRequest.request(url, modifiedOptions)
    httpRequest.destroy()
    
    // 执行响应拦截器
    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response)
    }
    
    return response
  }
}

// 使用
const client = new HttpClient()

// 添加请求拦截器 - 添加认证
client.addRequestInterceptor((url, options) => {
  return {
    ...options,
    header: {
      ...options.header,
      'Authorization': 'Bearer token123'
    }
  }
})

// 添加响应拦截器 - 处理错误
client.addResponseInterceptor((response) => {
  if (response.responseCode === 401) {
    console.log('未授权，跳转登录')
  }
  return response
})
```

## 💡 最佳实践

### 1. 及时销毁请求对象

```typescript
// ✅ 使用 try-finally
try {
  const response = await httpRequest.request(url, options)
} finally {
  httpRequest.destroy()
}
```

### 2. 设置超时时间

```typescript
const options = {
  method: http.RequestMethod.GET,
  readTimeout: 30000,      // 读取超时 30秒
  connectTimeout: 10000    // 连接超时 10秒
}
```

### 3. 错误处理

```typescript
try {
  const response = await httpRequest.request(url, options)
  
  if (response.responseCode !== 200) {
    throw new Error(`HTTP ${response.responseCode}`)
  }
  
  return JSON.parse(response.result.toString())
} catch (err) {
  console.error('请求失败:', err)
  // 显示错误提示
  showError('网络请求失败')
}
```

## 📚 参考资源

- [HTTP 官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-http-0000001821000565-V5)

---

**下一节** → [WebSocket 实时通信](02-WebSocket实时通信.md)
