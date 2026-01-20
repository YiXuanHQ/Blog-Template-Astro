---
title: Preferences 轻量级存储
date: 2025-01-22
nextChapter: "harmonyos-dev/07-data-management/02-关系型数据库"
parentChapter: "harmonyos-dev/07-data-management/README"
---
# Preferences 轻量级存储

> 轻量级键值对存储方案

## 📚 Preferences 概述

Preferences 是 HarmonyOS 提供的轻量级存储方案，用于保存少量配置数据。

### 适用场景

```
✅ 适合存储
├─ 用户设置（主题、语言）
├─ 应用配置（首次启动标记）
├─ 简单键值对
└─ 轻量级数据（< 10KB）

❌ 不适合存储
├─ 大量数据
├─ 复杂关系数据
└─ 二进制数据
```

## 🔧 基本操作

### 获取 Preferences 实例

```typescript
import preferences from '@ohos.data.preferences'

// 获取 Preferences 实例
const dataPreferences = await preferences.getPreferences(context, 'myPreferences')
```

### 写入数据

```typescript
// 写入字符串
await dataPreferences.put('username', 'Alice')

// 写入数字
await dataPreferences.put('age', 25)

// 写入布尔值
await dataPreferences.put('isLoggedIn', true)

// 写入数组
await dataPreferences.put('favorites', ['item1', 'item2'])

// 持久化到磁盘
await dataPreferences.flush()
```

### 读取数据

```typescript
// 读取字符串
const username = await dataPreferences.get('username', '')  // 默认值 ''
console.log('用户名:', username)

// 读取数字
const age = await dataPreferences.get('age', 0)
console.log('年龄:', age)

// 读取布尔值
const isLoggedIn = await dataPreferences.get('isLoggedIn', false)
console.log('是否登录:', isLoggedIn)
```

### 删除数据

```typescript
// 删除指定键
await dataPreferences.delete('username')

// 清空所有数据
await dataPreferences.clear()

// 持久化
await dataPreferences.flush()
```

### 检查键是否存在

```typescript
const hasKey = await dataPreferences.has('username')
if (hasKey) {
  console.log('用户名存在')
}
```

## 💾 实战案例

### 用户设置管理

```typescript
import preferences from '@ohos.data.preferences'
import common from '@ohos.app.ability.common'

class UserSettings {
  private context: common.UIAbilityContext
  private prefs: preferences.Preferences
  
  constructor(context: common.UIAbilityContext) {
    this.context = context
  }
  
  async init() {
    this.prefs = await preferences.getPreferences(this.context, 'userSettings')
  }
  
  // 保存主题
  async setTheme(theme: string) {
    await this.prefs.put('theme', theme)
    await this.prefs.flush()
  }
  
  // 获取主题
  async getTheme(): Promise<string> {
    return await this.prefs.get('theme', 'light') as string
  }
  
  // 保存语言
  async setLanguage(language: string) {
    await this.prefs.put('language', language)
    await this.prefs.flush()
  }
  
  // 获取语言
  async getLanguage(): Promise<string> {
    return await this.prefs.get('language', 'zh-CN') as string
  }
  
  // 保存通知设置
  async setNotificationEnabled(enabled: boolean) {
    await this.prefs.put('notificationEnabled', enabled)
    await this.prefs.flush()
  }
  
  // 获取通知设置
  async getNotificationEnabled(): Promise<boolean> {
    return await this.prefs.get('notificationEnabled', true) as boolean
  }
  
  // 获取所有设置
  async getAllSettings() {
    return {
      theme: await this.getTheme(),
      language: await this.getLanguage(),
      notificationEnabled: await this.getNotificationEnabled()
    }
  }
  
  // 重置设置
  async resetSettings() {
    await this.prefs.clear()
    await this.prefs.flush()
  }
}

// 使用
@Entry
@Component
struct SettingsPage {
  private context = getContext(this) as common.UIAbilityContext
  private userSettings: UserSettings = new UserSettings(this.context)
  @State theme: string = 'light'
  @State language: string = 'zh-CN'
  @State notificationEnabled: boolean = true
  
  async aboutToAppear() {
    await this.userSettings.init()
    await this.loadSettings()
  }
  
  async loadSettings() {
    this.theme = await this.userSettings.getTheme()
    this.language = await this.userSettings.getLanguage()
    this.notificationEnabled = await this.userSettings.getNotificationEnabled()
  }
  
  build() {
    Column({ space: 20 }) {
      // 主题设置
      Row() {
        Text('主题')
          .layoutWeight(1)
        
        Select([
          { value: '浅色', data: 'light' },
          { value: '深色', data: 'dark' }
        ])
        .selected(this.theme === 'light' ? 0 : 1)
        .onSelect(async (index) => {
          this.theme = index === 0 ? 'light' : 'dark'
          await this.userSettings.setTheme(this.theme)
        })
      }
      
      // 语言设置
      Row() {
        Text('语言')
          .layoutWeight(1)
        
        Select([
          { value: '中文', data: 'zh-CN' },
          { value: 'English', data: 'en-US' }
        ])
        .selected(this.language === 'zh-CN' ? 0 : 1)
        .onSelect(async (index) => {
          this.language = index === 0 ? 'zh-CN' : 'en-US'
          await this.userSettings.setLanguage(this.language)
        })
      }
      
      // 通知设置
      Row() {
        Text('推送通知')
          .layoutWeight(1)
        
        Toggle({ type: ToggleType.Switch, isOn: this.notificationEnabled })
          .onChange(async (checked) => {
            this.notificationEnabled = checked
            await this.userSettings.setNotificationEnabled(checked)
          })
      }
      
      // 重置按钮
      Button('重置设置')
        .onClick(async () => {
          await this.userSettings.resetSettings()
          await this.loadSettings()
        })
    }
    .padding(20)
  }
}
```

### 首次启动引导

```typescript
class AppConfig {
  private prefs: preferences.Preferences
  
  async init(context: common.UIAbilityContext) {
    this.prefs = await preferences.getPreferences(context, 'appConfig')
  }
  
  // 是否首次启动
  async isFirstLaunch(): Promise<boolean> {
    return await this.prefs.get('isFirstLaunch', true) as boolean
  }
  
  // 标记已启动
  async markLaunched() {
    await this.prefs.put('isFirstLaunch', false)
    await this.prefs.flush()
  }
  
  // 获取启动次数
  async getLaunchCount(): Promise<number> {
    return await this.prefs.get('launchCount', 0) as number
  }
  
  // 增加启动次数
  async incrementLaunchCount() {
    const count = await this.getLaunchCount()
    await this.prefs.put('launchCount', count + 1)
    await this.prefs.flush()
  }
}

// 应用启动时
export default class EntryAbility extends UIAbility {
  async onCreate(want, launchParam) {
    const appConfig = new AppConfig()
    await appConfig.init(this.context)
    
    // 增加启动次数
    await appConfig.incrementLaunchCount()
    
    // 检查是否首次启动
    const isFirst = await appConfig.isFirstLaunch()
    
    if (isFirst) {
      console.log('首次启动，显示引导页')
      await appConfig.markLaunched()
    }
  }
}
```

### 缓存管理

```typescript
class CacheManager {
  private prefs: preferences.Preferences
  
  async init(context: common.UIAbilityContext) {
    this.prefs = await preferences.getPreferences(context, 'cache')
  }
  
  // 保存缓存
  async setCache(key: string, value: any, ttl: number = 3600000) {
    const cacheData = {
      value: value,
      expireAt: Date.now() + ttl
    }
    
    await this.prefs.put(key, JSON.stringify(cacheData))
    await this.prefs.flush()
  }
  
  // 获取缓存
  async getCache(key: string): Promise<any> {
    const cached = await this.prefs.get(key, '') as string
    
    if (!cached) {
      return null
    }
    
    try {
      const cacheData = JSON.parse(cached)
      
      // 检查是否过期
      if (Date.now() > cacheData.expireAt) {
        await this.prefs.delete(key)
        await this.prefs.flush()
        return null
      }
      
      return cacheData.value
    } catch (err) {
      return null
    }
  }
  
  // 清除过期缓存
  async clearExpired() {
    // 注意：实际应用中需要遍历所有键
    // Preferences 不提供直接遍历方法
  }
}

// 使用
const cacheManager = new CacheManager()
await cacheManager.init(context)

// 保存缓存（1小时有效）
await cacheManager.setCache('userList', userList, 3600000)

// 读取缓存
const cachedUsers = await cacheManager.getCache('userList')
if (cachedUsers) {
  console.log('使用缓存数据')
} else {
  console.log('缓存已过期，重新加载')
}
```

## 💡 最佳实践

### 1. 及时持久化

```typescript
// ✅ 写入后立即持久化
await prefs.put('key', 'value')
await prefs.flush()

// ❌ 忘记持久化
await prefs.put('key', 'value')
// 数据可能丢失
```

### 2. 使用默认值

```typescript
// ✅ 提供默认值
const theme = await prefs.get('theme', 'light')

// ❌ 不提供默认值
const theme = await prefs.get('theme', null)
if (theme === null) {
  // 需要额外处理
}
```

### 3. 错误处理

```typescript
try {
  await prefs.put('key', 'value')
  await prefs.flush()
} catch (err) {
  console.error('保存失败:', err)
}
```

## 📚 参考资源

- [Preferences 官方文档](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/js-apis-data-preferences-0000001821000613-V5)

---

**下一节** → [关系型数据库](02-关系型数据库.md)
