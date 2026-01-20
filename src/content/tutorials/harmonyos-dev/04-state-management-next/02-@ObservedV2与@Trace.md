---
title: ---
---

---
title: "@ObservedV2 与 @Trace"
date: 2025-01-22
---

# @ObservedV2 与 @Trace

> 细粒度状态监听的核心装饰器

## 🎯 核心概念

### @ObservedV2 - 可观察类

```typescript
// 标记类为可观察
@ObservedV2
class User {
  @Trace name: string = ''      // 监听 name 变化
  @Trace age: number = 0         // 监听 age 变化
  city: string = ''              // 不监听
  createdAt: Date = new Date()   // 不监听
}
```

### @Trace - 属性监听

```typescript
@ObservedV2
class Counter {
  @Trace count: number = 0  // 只有 count 变化时才触发 UI 更新
  
  increment() {
    this.count++  // ✅ 触发更新
  }
}
```

## 📊 性能对比

### 旧版本 @Observed

```typescript
// HarmonyOS 4.0
@Observed
class Product {
  id: number = 0
  name: string = ''
  price: number = 0
  stock: number = 0
  description: string = ''
}

// 问题：任何属性变化都会触发整个对象的更新
product.description = '新描述'  // 触发不必要的更新
```

### 新版本 @ObservedV2

```typescript
// HarmonyOS NEXT
@ObservedV2
class Product {
  id: number = 0
  @Trace name: string = ''
  @Trace price: number = 0
  @Trace stock: number = 0
  description: string = ''  // 不监听
}

// 只有 @Trace 标记的属性变化才触发更新
product.description = '新描述'  // ✅ 不触发更新
product.price = 99.99           // ✅ 只更新相关 UI
```

### 性能提升

```
更新 1000 次测试：
├─ @Observed（旧版）: 800ms
└─ @ObservedV2 + @Trace（新版）: 200ms
性能提升：75%
```

## 🔧 基础用法

### 简单对象

```typescript
@ObservedV2
class UserInfo {
  @Trace username: string = ''
  @Trace email: string = ''
  @Trace avatar: string = ''
  
  // 不需要监听的字段
  id: number = 0
  createdAt: Date = new Date()
}

@Entry
@Component
struct UserProfile {
  @Local user: UserInfo = new UserInfo()
  
  aboutToAppear() {
    this.user.username = 'Alice'
    this.user.email = 'alice@example.com'
  }
  
  build() {
    Column({ space: 15 }) {
      // 显示用户信息
      Row({ space: 10 }) {
        Image(this.user.avatar || $r('app.media.default_avatar'))
          .width(60)
          .height(60)
          .borderRadius(30)
        
        Column({ space: 5 }) {
          Text(this.user.username)
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
          
          Text(this.user.email)
            .fontSize(14)
            .fontColor(Color.Gray)
        }
        .alignItems(HorizontalAlign.Start)
      }
      
      // 编辑按钮
      Button('编辑资料')
        .onClick(() => {
          this.user.username = 'Bob'  // ✅ 触发 UI 更新
        })
    }
    .padding(20)
  }
}
```

### 嵌套对象

```typescript
@ObservedV2
class Address {
  @Trace province: string = ''
  @Trace city: string = ''
  @Trace street: string = ''
}

@ObservedV2
class Customer {
  @Trace name: string = ''
  @Trace phone: string = ''
  @Trace address: Address = new Address()  // 嵌套对象
}

@Entry
@Component
struct CustomerForm {
  @Local customer: Customer = new Customer()
  
  build() {
    Column({ space: 15 }) {
      TextInput({ placeholder: '姓名' })
        .onChange((value) => {
          this.customer.name = value
        })
      
      TextInput({ placeholder: '电话' })
        .onChange((value) => {
          this.customer.phone = value
        })
      
      TextInput({ placeholder: '省份' })
        .onChange((value) => {
          this.customer.address.province = value
        })
      
      TextInput({ placeholder: '城市' })
        .onChange((value) => {
          this.customer.address.city = value
        })
      
      Button('保存')
        .onClick(() => {
          console.log(JSON.stringify(this.customer))
        })
    }
    .padding(20)
  }
}
```

### 数组监听

```typescript
@ObservedV2
class TodoList {
  @Trace items: TodoItem[] = []
  
  addItem(text: string) {
    this.items.push({ id: Date.now(), text, done: false })
  }
  
  removeItem(id: number) {
    const index = this.items.findIndex(item => item.id === id)
    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }
  
  toggleItem(id: number) {
    const item = this.items.find(i => i.id === id)
    if (item) {
      item.done = !item.done
    }
  }
}

interface TodoItem {
  id: number
  text: string
  done: boolean
}

@Entry
@Component
struct TodoApp {
  @Local todoList: TodoList = new TodoList()
  @State newTodo: string = ''
  
  build() {
    Column() {
      // 输入框
      Row({ space: 10 }) {
        TextInput({ placeholder: '新任务', text: this.newTodo })
          .layoutWeight(1)
          .onChange((value) => {
            this.newTodo = value
          })
        
        Button('添加')
          .onClick(() => {
            if (this.newTodo.trim()) {
              this.todoList.addItem(this.newTodo)
              this.newTodo = ''
            }
          })
      }
      .padding(15)
      
      // 任务列表
      List({ space: 10 }) {
        ForEach(this.todoList.items, (item: TodoItem) => {
          ListItem() {
            Row({ space: 10 }) {
              Checkbox()
                .select(item.done)
                .onChange((checked) => {
                  this.todoList.toggleItem(item.id)
                })
              
              Text(item.text)
                .fontSize(16)
                .decoration({
                  type: item.done ? TextDecorationType.LineThrough : TextDecorationType.None
                })
                .layoutWeight(1)
              
              Button('删除')
                .fontSize(14)
                .onClick(() => {
                  this.todoList.removeItem(item.id)
                })
            }
            .width('100%')
            .padding(10)
            .backgroundColor(Color.White)
            .borderRadius(8)
          }
        }, (item: TodoItem) => `${item.id}`)
      }
      .layoutWeight(1)
      .padding({ left: 15, right: 15 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor(0xF5F5F5)
  }
}
```

## 🎯 高级用法

### 计算属性

```typescript
@ObservedV2
class ShoppingCart {
  @Trace items: CartItem[] = []
  
  // 计算属性：总价
  get totalPrice(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }
  
  // 计算属性：商品总数
  get totalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0)
  }
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

@Entry
@Component
struct CartPage {
  @Local cart: ShoppingCart = new ShoppingCart()
  
  build() {
    Column() {
      // 商品列表
      List() {
        ForEach(this.cart.items, (item: CartItem) => {
          ListItem() {
            Row() {
              Text(item.name)
                .layoutWeight(1)
              Text(`¥${item.price}`)
              Text(` x ${item.quantity}`)
            }
            .padding(10)
          }
        })
      }
      .layoutWeight(1)
      
      // 底部汇总
      Row() {
        Column({ space: 5 }) {
          Text(`共 ${this.cart.totalItems} 件商品`)
            .fontSize(14)
            .fontColor(Color.Gray)
          
          Text(`总价：¥${this.cart.totalPrice}`)
            .fontSize(20)
            .fontColor(Color.Red)
            .fontWeight(FontWeight.Bold)
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        
        Button('去结算')
          .width(120)
      }
      .padding(20)
      .backgroundColor(Color.White)
    }
  }
}
```

### 深层嵌套对象

```typescript
@ObservedV2
class Address {
  @Trace street: string = ''
  @Trace city: string = ''
}

@ObservedV2
class Contact {
  @Trace phone: string = ''
  @Trace email: string = ''
}

@ObservedV2
class Company {
  @Trace name: string = ''
  @Trace address: Address = new Address()
  @Trace contact: Contact = new Contact()
}

@Entry
@Component
struct CompanyProfile {
  @Local company: Company = new Company()
  
  build() {
    Column({ space: 15 }) {
      Text('公司信息')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
      
      TextInput({ placeholder: '公司名称' })
        .onChange((value) => {
          this.company.name = value
        })
      
      Text('地址信息')
        .fontSize(16)
        .margin({ top: 10 })
      
      TextInput({ placeholder: '街道' })
        .onChange((value) => {
          this.company.address.street = value
        })
      
      TextInput({ placeholder: '城市' })
        .onChange((value) => {
          this.company.address.city = value
        })
      
      Text('联系方式')
        .fontSize(16)
        .margin({ top: 10 })
      
      TextInput({ placeholder: '电话' })
        .onChange((value) => {
          this.company.contact.phone = value
        })
      
      TextInput({ placeholder: '邮箱' })
        .onChange((value) => {
          this.company.contact.email = value
        })
    }
    .padding(20)
  }
}
```

## 💡 最佳实践

### 1. 只监听必要的属性

```typescript
// ✅ 好的实践
@ObservedV2
class Product {
  @Trace name: string = ''        // UI 需要显示
  @Trace price: number = 0        // UI 需要显示
  @Trace stock: number = 0        // UI 需要显示
  
  id: number = 0                  // 不需要监听
  createdAt: Date = new Date()    // 不需要监听
  updatedAt: Date = new Date()    // 不需要监听
}

// ❌ 避免过度监听
@ObservedV2
class Product {
  @Trace id: number = 0           // 不必要
  @Trace createdAt: Date = new Date()  // 不必要
}
```

### 2. 合理拆分对象

```typescript
// ✅ 按业务逻辑拆分
@ObservedV2
class UserProfile {
  @Trace avatar: string = ''
  @Trace nickname: string = ''
}

@ObservedV2
class UserSettings {
  @Trace theme: string = 'light'
  @Trace language: string = 'zh-CN'
}

// ❌ 避免大对象
@ObservedV2
class User {
  @Trace avatar: string = ''
  @Trace nickname: string = ''
  @Trace theme: string = 'light'
  @Trace language: string = 'zh-CN'
  // ... 更多属性
}
```

### 3. 避免循环引用

```typescript
// ❌ 避免
@ObservedV2
class Parent {
  @Trace child: Child = new Child()
}

@ObservedV2
class Child {
  @Trace parent: Parent = new Parent()  // 循环引用
}

// ✅ 使用 ID 引用
@ObservedV2
class Parent {
  @Trace childId: number = 0
}

@ObservedV2
class Child {
  @Trace parentId: number = 0
}
```

## 📚 参考资源

- [@ObservedV2 官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/arkts-new-observedv2-and-trace-0000001820999489-V5)

---

**下一节** → [状态共享机制](03-状态共享机制.md)
