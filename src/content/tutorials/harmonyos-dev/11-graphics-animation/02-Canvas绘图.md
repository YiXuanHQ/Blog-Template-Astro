---
title: Canvas 绘图
date: 2025-01-22
prevChapter: "harmonyos-dev/11-graphics-animation/01-动画基础"
nextChapter: "harmonyos-dev/11-graphics-animation/03-高级动画效果"
parentChapter: "harmonyos-dev/11-graphics-animation/README"
---
# Canvas 绘图

> 使用 Canvas 实现自定义绘图

## 🎨 Canvas 基础

### 创建 Canvas

```typescript
@Entry
@Component
struct CanvasDemo {
  private settings: RenderingContextSettings = new RenderingContextSettings(true)
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(this.settings)
  
  build() {
    Column() {
      Canvas(this.context)
        .width('100%')
        .height(400)
        .backgroundColor('#F5F5F5')
        .onReady(() => {
          this.drawShapes()
        })
    }
  }
  
  drawShapes() {
    // 绘制矩形
    this.context.fillStyle = '#007DFF'
    this.context.fillRect(50, 50, 100, 100)
    
    // 绘制圆形
    this.context.fillStyle = '#FF0000'
    this.context.beginPath()
    this.context.arc(250, 100, 50, 0, 2 * Math.PI)
    this.context.fill()
  }
}
```

## 📐 基础图形

### 矩形

```typescript
drawRectangles() {
  const ctx = this.context
  
  // 填充矩形
  ctx.fillStyle = '#007DFF'
  ctx.fillRect(50, 50, 100, 80)
  
  // 描边矩形
  ctx.strokeStyle = '#FF0000'
  ctx.lineWidth = 3
  ctx.strokeRect(200, 50, 100, 80)
  
  // 圆角矩形
  ctx.fillStyle = '#00FF00'
  ctx.roundRect(350, 50, 100, 80, [10])
  ctx.fill()
}
```

### 圆形和椭圆

```typescript
drawCircles() {
  const ctx = this.context
  
  // 圆形
  ctx.fillStyle = '#FF6B6B'
  ctx.beginPath()
  ctx.arc(100, 200, 40, 0, 2 * Math.PI)
  ctx.fill()
  
  // 椭圆
  ctx.fillStyle = '#4ECDC4'
  ctx.beginPath()
  ctx.ellipse(250, 200, 60, 40, 0, 0, 2 * Math.PI)
  ctx.fill()
}
```

### 线条

```typescript
drawLines() {
  const ctx = this.context
  
  // 直线
  ctx.strokeStyle = '#000000'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(50, 300)
  ctx.lineTo(200, 300)
  ctx.stroke()
  
  // 折线
  ctx.strokeStyle = '#007DFF'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(250, 280)
  ctx.lineTo(300, 320)
  ctx.lineTo(350, 280)
  ctx.lineTo(400, 320)
  ctx.stroke()
}
```

## 🖌️ 路径绘制

### 复杂路径

```typescript
@Entry
@Component
struct PathDrawing {
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(
    new RenderingContextSettings(true)
  )
  
  build() {
    Canvas(this.context)
      .width('100%')
      .height(500)
      .onReady(() => {
        this.drawStar()
        this.drawHeart()
      })
  }
  
  // 绘制五角星
  drawStar() {
    const ctx = this.context
    const cx = 100
    const cy = 100
    const outerRadius = 50
    const innerRadius = 20
    
    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
      const x = cx + Math.cos(angle) * outerRadius
      const y = cy + Math.sin(angle) * outerRadius
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
      
      const innerAngle = angle + (2 * Math.PI) / 5
      const innerX = cx + Math.cos(innerAngle) * innerRadius
      const innerY = cy + Math.sin(innerAngle) * innerRadius
      ctx.lineTo(innerX, innerY)
    }
    
    ctx.closePath()
    ctx.fill()
  }
  
  // 绘制爱心
  drawHeart() {
    const ctx = this.context
    const x = 300
    const y = 100
    const size = 50
    
    ctx.fillStyle = '#FF69B4'
    ctx.beginPath()
    ctx.moveTo(x, y + size / 4)
    
    // 左半边
    ctx.bezierCurveTo(
      x, y,
      x - size / 2, y,
      x - size / 2, y + size / 4
    )
    ctx.bezierCurveTo(
      x - size / 2, y + size / 2,
      x, y + size * 0.75,
      x, y + size
    )
    
    // 右半边
    ctx.bezierCurveTo(
      x, y + size * 0.75,
      x + size / 2, y + size / 2,
      x + size / 2, y + size / 4
    )
    ctx.bezierCurveTo(
      x + size / 2, y,
      x, y,
      x, y + size / 4
    )
    
    ctx.closePath()
    ctx.fill()
  }
}
```

## 🎨 渐变和图案

### 线性渐变

```typescript
drawLinearGradient() {
  const ctx = this.context
  
  // 创建渐变
  const gradient = ctx.createLinearGradient(50, 200, 250, 200)
  gradient.addColorStop(0, '#FF6B6B')
  gradient.addColorStop(0.5, '#4ECDC4')
  gradient.addColorStop(1, '#45B7D1')
  
  // 应用渐变
  ctx.fillStyle = gradient
  ctx.fillRect(50, 200, 200, 100)
}
```

### 径向渐变

```typescript
drawRadialGradient() {
  const ctx = this.context
  
  // 创建径向渐变
  const gradient = ctx.createRadialGradient(350, 250, 10, 350, 250, 80)
  gradient.addColorStop(0, '#FFFFFF')
  gradient.addColorStop(0.5, '#FFD700')
  gradient.addColorStop(1, '#FF6B6B')
  
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(350, 250, 80, 0, 2 * Math.PI)
  ctx.fill()
}
```

## 🔄 图形变换

### 平移、旋转、缩放

```typescript
drawTransforms() {
  const ctx = this.context
  
  ctx.save()  // 保存状态
  
  // 平移
  ctx.translate(100, 350)
  
  // 旋转
  ctx.rotate(Math.PI / 4)
  
  // 缩放
  ctx.scale(1.5, 1.5)
  
  // 绘制
  ctx.fillStyle = '#007DFF'
  ctx.fillRect(-25, -25, 50, 50)
  
  ctx.restore()  // 恢复状态
}
```

## 🎯 实战案例：时钟

```typescript
@Entry
@Component
struct ClockCanvas {
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(
    new RenderingContextSettings(true)
  )
  private timer: number = -1
  
  aboutToAppear() {
    this.timer = setInterval(() => {
      this.drawClock()
    }, 1000)
  }
  
  aboutToDisappear() {
    clearInterval(this.timer)
  }
  
  build() {
    Canvas(this.context)
      .width('100%')
      .height(400)
      .backgroundColor('#F0F0F0')
      .onReady(() => {
        this.drawClock()
      })
  }
  
  drawClock() {
    const ctx = this.context
    const width = 400
    const height = 400
    const cx = width / 2
    const cy = height / 2
    const radius = 150
    
    // 清空画布
    ctx.clearRect(0, 0, width, height)
    
    // 绘制表盘
    ctx.fillStyle = '#FFFFFF'
    ctx.strokeStyle = '#333333'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
    
    // 绘制刻度
    this.drawScale(ctx, cx, cy, radius)
    
    // 绘制指针
    const now = new Date()
    const hours = now.getHours() % 12
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    
    // 时针
    this.drawHand(ctx, cx, cy, 
      (hours + minutes / 60) * 30, 
      radius * 0.5, 6, '#333333')
    
    // 分针
    this.drawHand(ctx, cx, cy, 
      (minutes + seconds / 60) * 6, 
      radius * 0.7, 4, '#666666')
    
    // 秒针
    this.drawHand(ctx, cx, cy, 
      seconds * 6, 
      radius * 0.9, 2, '#FF0000')
    
    // 中心点
    ctx.fillStyle = '#333333'
    ctx.beginPath()
    ctx.arc(cx, cy, 8, 0, 2 * Math.PI)
    ctx.fill()
  }
  
  drawScale(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
    ctx.strokeStyle = '#666666'
    
    for (let i = 0; i < 60; i++) {
      const angle = (i * 6 - 90) * Math.PI / 180
      const length = i % 5 === 0 ? 15 : 8
      const width = i % 5 === 0 ? 3 : 1
      
      ctx.lineWidth = width
      ctx.beginPath()
      ctx.moveTo(
        cx + Math.cos(angle) * (radius - length),
        cy + Math.sin(angle) * (radius - length)
      )
      ctx.lineTo(
        cx + Math.cos(angle) * radius,
        cy + Math.sin(angle) * radius
      )
      ctx.stroke()
    }
  }
  
  drawHand(ctx: CanvasRenderingContext2D, cx: number, cy: number, 
           angle: number, length: number, width: number, color: string) {
    const radian = (angle - 90) * Math.PI / 180
    
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(
      cx + Math.cos(radian) * length,
      cy + Math.sin(radian) * length
    )
    ctx.stroke()
  }
}
```

## 📚 参考资源

- [Canvas组件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/ts-components-canvas-canvas-0000001815927332-V5)
- [CanvasRenderingContext2D](https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V5/ts-canvasrenderingcontext2d-0000001815767456-V5)

---

**下一节** → [高级动画效果](03-高级动画效果.md)
