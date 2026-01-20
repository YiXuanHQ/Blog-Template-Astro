---
title: ---
---

---
title: ExtensionAbility 新类型
date: 2025-01-22
---

# ExtensionAbility 新类型

> 扩展应用能力的组件

## 🎯 ExtensionAbility 概述

ExtensionAbility 是一种特殊的 Ability，用于扩展应用的特定功能，通常没有用户界面。

```
ExtensionAbility 类型
├─ FormExtensionAbility（服务卡片）
├─ ServiceExtensionAbility（后台服务）
├─ DataShareExtensionAbility（数据共享）
├─ StaticSubscriberExtensionAbility（静态订阅）
└─ WindowExtensionAbility（窗口扩展）
```

## 📇 FormExtensionAbility

### 服务卡片

```typescript
import FormExtensionAbility from '@ohos.app.form.FormExtensionAbility'
import formBindingData from '@ohos.app.form.formBindingData'

export default class WeatherFormAbility extends FormExtensionAbility {
  // 创建卡片
  onAddForm(want) {
    console.log('创建卡片')
    
    const formData = {
      temperature: '25°C',
      weather: '晴天',
      city: '北京'
    }
    
    return formBindingData.createFormBindingData(formData)
  }
  
  // 更新卡片
  onUpdateForm(formId) {
    console.log('更新卡片:', formId)
    
    const formData = {
      temperature: '26°C',
      weather: '多云',
      city: '北京'
    }
    
    return formBindingData.createFormBindingData(formData)
  }
  
  // 删除卡片
  onRemoveForm(formId) {
    console.log('删除卡片:', formId)
  }
  
  // 卡片可见性变化
  onVisibilityChange(formIds) {
    console.log('卡片可见性变化:', formIds)
  }
}
```

### 卡片页面

```typescript
@Entry
@Component
struct WeatherCard {
  @LocalStorageProp('temperature') temperature: string = '--'
  @LocalStorageProp('weather') weather: string = '--'
  @LocalStorageProp('city') city: string = '--'
  
  build() {
    Column() {
      Text(this.city)
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
      
      Text(this.temperature)
        .fontSize(48)
        .fontColor(Color.Blue)
        .margin({ top: 10 })
      
      Text(this.weather)
        .fontSize(14)
        .fontColor(Color.Gray)
        .margin({ top: 5 })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .backgroundColor(Color.White)
    .borderRadius(12)
    .padding(15)
  }
}
```

### 定时更新卡片

```typescript
import formProvider from '@ohos.app.form.formProvider'

export default class WeatherFormAbility extends FormExtensionAbility {
  private timers: Map<string, number> = new Map()
  
  onAddForm(want) {
    const formId = want.parameters['ohos.extra.param.key.form_identity']
    
    // 每5分钟更新一次
    const timer = setInterval(() => {
      this.updateForm(formId)
    }, 5 * 60 * 1000)
    
    this.timers.set(formId, timer)
    
    return this.getFormData()
  }
  
  async updateForm(formId: string) {
    const formData = await this.fetchWeatherData()
    
    formProvider.updateForm(formId, formBindingData.createFormBindingData(formData))
      .then(() => {
        console.log('更新卡片成功')
      })
      .catch((err) => {
        console.error('更新卡片失败:', err)
      })
  }
  
  onRemoveForm(formId) {
    // 清理定时器
    const timer = this.timers.get(formId)
    if (timer) {
      clearInterval(timer)
      this.timers.delete(formId)
    }
  }
  
  async fetchWeatherData() {
    // 获取天气数据
    return {
      temperature: '25°C',
      weather: '晴天',
      city: '北京'
    }
  }
}
```

## 🔧 ServiceExtensionAbility

### 后台服务

```typescript
import ServiceExtensionAbility from '@ohos.app.ability.ServiceExtensionAbility'
import Want from '@ohos.app.ability.Want'

export default class BackgroundService extends ServiceExtensionAbility {
  onCreate(want: Want) {
    console.log('后台服务创建')
  }
  
  onRequest(want: Want, startId: number) {
    console.log('服务请求:', want, startId)
    
    // 执行后台任务
    this.performBackgroundTask()
  }
  
  onConnect(want: Want) {
    console.log('服务连接')
    return null
  }
  
  onDisconnect(want: Want) {
    console.log('服务断开')
  }
  
  onDestroy() {
    console.log('服务销毁')
  }
  
  async performBackgroundTask() {
    // 执行耗时任务
    console.log('执行后台任务')
  }
}
```

### 启动后台服务

```typescript
import common from '@ohos.app.ability.common'

@Entry
@Component
struct Index {
  private context = getContext(this) as common.UIAbilityContext
  
  startBackgroundService() {
    const want = {
      bundleName: 'com.example.myapp',
      abilityName: 'BackgroundService'
    }
    
    this.context.startServiceExtensionAbility(want)
      .then(() => {
        console.log('启动后台服务成功')
      })
      .catch((err) => {
        console.error('启动失败:', err)
      })
  }
  
  stopBackgroundService() {
    const want = {
      bundleName: 'com.example.myapp',
      abilityName: 'BackgroundService'
    }
    
    this.context.stopServiceExtensionAbility(want)
      .then(() => {
        console.log('停止后台服务成功')
      })
  }
  
  build() {
    Column({ space: 15 }) {
      Button('启动服务')
        .onClick(() => {
          this.startBackgroundService()
        })
      
      Button('停止服务')
        .onClick(() => {
          this.stopBackgroundService()
        })
    }
  }
}
```

## 📊 DataShareExtensionAbility

### 数据共享

```typescript
import DataShareExtensionAbility from '@ohos.application.DataShareExtensionAbility'

export default class DataShareExt extends DataShareExtensionAbility {
  // 插入数据
  insert(uri: string, value: ValuesBucket, callback: AsyncCallback<number>) {
    console.log('插入数据:', uri, value)
    
    // 执行插入操作
    const rowId = this.database.insert(value)
    
    callback(null, rowId)
  }
  
  // 查询数据
  query(uri: string, predicates: dataSharePredicates.DataSharePredicates, 
        columns: Array<string>, callback: AsyncCallback<Object>) {
    console.log('查询数据:', uri)
    
    // 执行查询
    const resultSet = this.database.query(predicates, columns)
    
    callback(null, resultSet)
  }
  
  // 更新数据
  update(uri: string, predicates: dataSharePredicates.DataSharePredicates,
         value: ValuesBucket, callback: AsyncCallback<number>) {
    console.log('更新数据:', uri, value)
    
    const rowCount = this.database.update(predicates, value)
    
    callback(null, rowCount)
  }
  
  // 删除数据
  delete(uri: string, predicates: dataSharePredicates.DataSharePredicates,
         callback: AsyncCallback<number>) {
    console.log('删除数据:', uri)
    
    const rowCount = this.database.delete(predicates)
    
    callback(null, rowCount)
  }
}
```

## 💡 最佳实践

### 1. 卡片性能优化

```typescript
// ✅ 避免频繁更新
const UPDATE_INTERVAL = 5 * 60 * 1000  // 5分钟

// ✅ 缓存数据
private cachedData: WeatherData = null

async getFormData() {
  if (this.cachedData && !this.isDataExpired()) {
    return this.cachedData
  }
  
  this.cachedData = await this.fetchWeatherData()
  return this.cachedData
}
```

### 2. 后台服务资源管理

```typescript
onDestroy() {
  // ✅ 清理资源
  this.stopTimer()
  this.closeConnections()
  this.releaseResources()
}
```

### 3. 数据共享安全

```typescript
// ✅ 权限检查
insert(uri: string, value: ValuesBucket, callback) {
  if (!this.checkPermission()) {
    callback(new Error('无权限'), -1)
    return
  }
  
  // 执行插入
}
```

## 📚 参考资源

- [ExtensionAbility 官方文档](https://developer.harmonyos.com/cn/docs/documentation/doc-guides-V3/extensionability-overview-0000001478341009-V3)

---

**下一节** → [生命周期管理](03-生命周期管理.md)
