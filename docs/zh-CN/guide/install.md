# 安装

## 安装依赖

::: code-group

```bash [pnpm]
pnpm add web-mask-layer
```

```bash [npm]
npm install web-mask-layer -S
```

```bash [yarn]
yarn add web-mask-layer
```

:::

## 快速开始

导入库即可使用，CSS 已内联打包在 JS 中，无需单独引入样式文件：

```ts
import { WebMaskLayer } from 'web-mask-layer'

const maskLayer = WebMaskLayer.getInstance()

maskLayer.createLoading({
  text: '数据加载中',
  background: '#000',
  opacity: '0.5',
  color: '#fff',
})

setTimeout(() => {
  maskLayer.closeLoading()
}, 2000)
```

也可以单独引入样式文件：

```ts
import { WebMaskLayer } from 'web-mask-layer'
import 'web-mask-layer/style.css'
```

## 在任意浏览器项目中使用

`web-mask-layer` 零框架依赖，可在任意浏览器端技术栈中使用：

```ts
import { WebMaskLayer } from 'web-mask-layer'

document.querySelector('#load-btn')?.addEventListener('click', () => {
  WebMaskLayer.getInstance().createLoading({
    text: '加载中...',
  })
})
```

## CDN / UMD

```html
<script src="https://unpkg.com/web-mask-layer/dist/web-mask-layer.umd.min.js"></script>
<script>
  const maskLayer = window.WebMaskLayer.WebMaskLayer.getInstance()

  maskLayer.createLoading({
    text: 'Hello from UMD',
  })

  setTimeout(function () {
    maskLayer.closeLoading()
  }, 2000)
</script>
```

## 指定目标元素

可以将遮罩层挂载到指定元素上，而不是整个页面：

```ts
const maskLayer = WebMaskLayer.getInstance()

maskLayer.createLoading({
  text: '加载中...',
  target: '.my-container',
})

// 也可以直接传入 HTMLElement
const el = document.getElementById('my-container')
maskLayer.createLoading({
  text: '加载中...',
  target: el,
})
```

## 运行边界

- `web-mask-layer` 仅适用于浏览器端使用。
- 它无法在纯 Node.js 运行时里运行。
- 在 SSR 项目中调用 `createLoading()` 或 `closeLoading()` 是安全的 — 它们会检查 `window`/`document` 并提前返回。
