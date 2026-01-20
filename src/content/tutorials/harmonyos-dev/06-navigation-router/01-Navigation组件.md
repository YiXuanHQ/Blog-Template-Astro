---
title: Navigation 组件
date: 2025-01-22
nextChapter: "harmonyos-dev/06-navigation-router/02-页面栈管理"
parentChapter: "harmonyos-dev/06-navigation-router/README"
---
# Navigation 组件

> HarmonyOS NEXT 全新的页面导航方案

## 🧭 Navigation 概述

### 为什么使用 Navigation

**旧版本路由（Router）的问题：**
```typescript
// HarmonyOS 4.0 - Router
import router from '@ohos.router'

// 页面跳转
router.pushUrl({ url: 'pages/Detail' })

// 问题：
// 1. 缺少页面栈管理
// 2. 转场动画不够灵活
// 3. 参数传递复杂
```

**新版本（Navigation）的优势：**
```typescript
// HarmonyOS NEXT - Navigation
this.pageStack.pushPath({ name: 'Detail' })

// 优势：
// 1. 完整的页面栈管理
// 2. 丰富的转场动画
// 3. 类型安全的参数传递
// 4. 更好的性能
```

## 📐 基本用法

### 创建 Navigation

```typescript
@Entry
@Component
struct MainPage {
  // 创建导航控制器
  pageStack: NavPathStack = new NavPathStack()
  
  build() {
    Navigation(this.pageStack) {
      // 页面内容
      Column() {
        Text('首页')
          .fontSize(24)
        
        Button('跳转到详情')
          .onClick(() => {
            // 跳转页面
            this.pageStack.pushPath({ name: 'DetailPage' })
          })
      }
    }
    .title('首页')  // 标题
    .mode(NavigationMode.Stack)  // 导航模式
  }
}
```

### 注册页面

```typescript
// app.json5 或 module.json5
{
  "pages": [
    "pages/Index",
    "pages/DetailPage"
  ]
}

// DetailPage.ets
@Entry
@Component
struct DetailPage {
  pageStack: NavPathStack = new NavPathStack()
  
  build() {
    NavDestination() {
      Column() {
        Text('详情页')
          .fontSize(24)
        
        Button('返回')
          .onClick(() => {
            this.pageStack.pop()
          })
      }
    }
    .title('详情')
  }
}
```

## 🔄 页面跳转

### pushPath - 推入新页面

```typescript
@Entry
@Component
struct HomePage {
  pageStack: NavPathStack = new NavPathStack()
  
  build() {
    Navigation(this.pageStack) {
      Column({ space: 20 }) {
        Button('跳转到详情')
          .onClick(() => {
            // 基本跳转
            this.pageStack.pushPath({ name: 'Detail' })
          })
        
        Button('带参数跳转')
          .onClick(() => {
            // 传递参数
            this.pageStack.pushPath({
              name: 'Detail',
              param: {
                id: 123,
                title: '商品详情'
              }
            })
          })
        
        Button('带回调跳转')
          .onClick(() => {
            // 页面返回时的回调
            this.pageStack.pushPath({
              name: 'Detail',
              onPop: (result: Object) => {
                console.log('返回结果:', result)
              }
            })
          })
      }
    }
  }
}
```

### replacePath - 替换当前页面

```typescript
Button('替换为详情页')
  .onClick(() => {
    // 替换当前页面，不能返回
    this.pageStack.replacePath({ name: 'Detail' })
  })
```

### pop - 返回上一页

```typescript
Button('返回')
  .onClick(() => {
    // 返回上一页
    this.pageStack.pop()
  })

Button('返回并传递结果')
  .onClick(() => {
    // 返回并传递数据
    this.pageStack.pop({
      success: true,
      data: '处理结果'
    })
  })
```

### clear - 清空页面栈

```typescript
Button('返回首页')
  .onClick(() => {
    // 清空所有页面，回到首页
    this.pageStack.clear()
  })
```

## 📦 参数传递

### 发送参数

```typescript
@Entry
@Component
struct ListPage {
  pageStack: NavPathStack = new NavPathStack()
  @State items: Item[] = []
  
  build() {
    Navigation(this.pageStack) {
      List() {
        ForEach(this.items, (item: Item) => {
          ListItem() {
            Row() {
              Text(item.title)
            }
            .onClick(() => {
              // 传递完整对象
              this.pageStack.pushPath({
                name: 'ItemDetail',
                param: item
              })
            })
          }
        })
      }
    }
  }
}
```

### 接收参数

```typescript
@Component
struct ItemDetail {
  @State item: Item = null
  
  aboutToAppear() {
    // 获取传递的参数
    const params = this.pageStack.getParamByName('ItemDetail')
    if (params) {
      this.item = params as Item
    }
  }
  
  build() {
    NavDestination() {
      Column() {
        Text(this.item?.title)
        Text(this.item?.description)
      }
    }
  }
}
```

## 🎨 导航模式

### Stack 模式（堆栈导航）

```typescript
Navigation(this.pageStack) {
  // 内容
}
.mode(NavigationMode.Stack)  // 堆栈模式
.hideToolBar(false)           // 显示工具栏
```

### Split 模式（分栏导航）

```typescript
Navigation(this.pageStack) {
  // 左侧导航
}
.mode(NavigationMode.Split)  // 分栏模式
.navDestination(this.buildDestination.bind(this))

@Builder
buildDestination(name: string, param: Object) {
  // 右侧内容
  if (name === 'Home') {
    HomeContent()
  } else if (name === 'Settings') {
    SettingsContent()
  }
}
```

### Auto 模式（自适应）

```typescript
Navigation(this.pageStack) {
  // 内容
}
.mode(NavigationMode.Auto)  // 根据设备自动选择模式
```

## 🎭 转场动画

### 内置转场

```typescript
this.pageStack.pushPath({
  name: 'Detail',
  animated: true  // 启用动画（默认）
})

// 禁用动画
this.pageStack.pushPath({
  name: 'Detail',
  animated: false
})
```

### 自定义转场

```typescript
Navigation(this.pageStack) {
  // 内容
}
.customNavContentTransition((from: NavContentInfo, to: NavContentInfo, operation: NavigationOperation) => {
  if (operation === NavigationOperation.PUSH) {
    // 自定义入场动画
    return {
      timeout: 300,
      transition: (proxy: CustomTransitionProxy) => {
        to.content
          .translate({ x: 1000 })
          .animation({ duration: 300 })
          .translate({ x: 0 })
      }
    }
  }
})
```

## 🎯 实战案例

### 电商应用导航

```typescript
// 首页
@Entry
@Component
struct ShopIndex {
  pageStack: NavPathStack = new NavPathStack()
  @State products: Product[] = []
  
  build() {
    Navigation(this.pageStack) {
      Column() {
        // 顶部搜索
        Row() {
          TextInput({ placeholder: '搜索商品' })
            .layoutWeight(1)
            .onClick(() => {
              this.pageStack.pushPath({ name: 'SearchPage' })
            })
          
          Button('购物车')
            .onClick(() => {
              this.pageStack.pushPath({ name: 'CartPage' })
            })
        }
        .padding(10)
        
        // 商品列表
        Grid() {
          ForEach(this.products, (product: Product) => {
            GridItem() {
              Column() {
                Image(product.image)
                  .width('100%')
                  .height(150)
                
                Text(product.name)
                  .maxLines(2)
                
                Text(`¥${product.price}`)
                  .fontColor(Color.Red)
              }
              .onClick(() => {
                this.pageStack.pushPath({
                  name: 'ProductDetail',
                  param: product
                })
              })
            }
          })
        }
      }
    }
    .title('商城首页')
  }
}

// 商品详情页
@Component
struct ProductDetail {
  pageStack: NavPathStack = new NavPathStack()
  @State product: Product = null
  
  aboutToAppear() {
    const params = this.pageStack.getParamByName('ProductDetail')
    this.product = params as Product
  }
  
  build() {
    NavDestination() {
      Column() {
        Image(this.product?.image)
          .width('100%')
          .height(300)
        
        Text(this.product?.name)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
        
        Text(`¥${this.product?.price}`)
          .fontSize(24)
          .fontColor(Color.Red)
        
        Text(this.product?.description)
          .margin({ top: 20 })
        
        Blank()
        
        Row({ space: 10 }) {
          Button('加入购物车')
            .layoutWeight(1)
            .onClick(() => {
              // 加入购物车
              this.pageStack.pop({ action: 'addToCart' })
            })
          
          Button('立即购买')
            .layoutWeight(1)
            .backgroundColor(Color.Red)
            .onClick(() => {
              this.pageStack.pushPath({
                name: 'OrderConfirm',
                param: this.product
              })
            })
        }
        .width('100%')
        .padding(20)
      }
    }
    .title('商品详情')
    .onBackPressed(() => {
      this.pageStack.pop()
      return true
    })
  }
}
```

## 📚 API 参考

### NavPathStack 方法

| 方法 | 说明 | 参数 |
|------|------|------|
| pushPath | 推入新页面 | name, param, animated |
| pushPathByName | 按名称推入 | name, param |
| pop | 返回上一页 | result |
| popToName | 返回到指定页面 | name |
| popToIndex | 返回到指定索引 | index |
| clear | 清空页面栈 | - |
| replacePath | 替换当前页面 | name, param |
| getParamByIndex | 获取参数（索引） | index |
| getParamByName | 获取参数（名称） | name |
| size | 页面栈大小 | - |

## 📚 参考资源

- [Navigation 官方文档](https://developer.harmonyos.com/cn/docs/documentation/doc-references-V3/ts-basic-components-navigation-0000001428061740-V3)
- [页面路由指南](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/arkts-routing-0000001503325125-V3)

---

**下一节** → [页面栈管理](02-页面栈管理.md)
