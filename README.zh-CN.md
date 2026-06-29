# web-mask-layer

[English README](./README.md)

- 文档地址：[https://xcy960815.github.io/web-mask-layer/](https://xcy960815.github.io/web-mask-layer/)
- 在线 Demo：[https://xcy960815.github.io/web-mask-layer/guide/demo](https://xcy960815.github.io/web-mask-layer/guide/demo)

`web-mask-layer` 是一个轻量级的浏览器端遮罩层库，对外提供的是普通 JavaScript API。

它是一个纯原生 DOM 实现，零框架依赖。

## 功能特性

- 单例模式，节省内存开销
- 可指定任意 DOM 元素或整个页面作为遮罩目标
- 支持配置文本、背景色、文字颜色、透明度和自定义 CSS 类名
- 平滑的 CSS 入场/离场动画
- SSR 安全：在服务端环境中调用自动跳过
- 内置 TypeScript 类型声明
- 自动计算 z-index 确保始终在最顶层
- 支持原地更新文本，无需重建遮罩

## 安装

```bash
npm install web-mask-layer -S
```

```bash
pnpm add web-mask-layer
```

## 快速开始

导入库即可使用：

```ts
import { WebMaskLayer } from 'web-mask-layer'

const maskLayer = WebMaskLayer.getInstance()

maskLayer.createLoading({
  text: '数据加载中',
  background: '#000',
  target: '.my-container',
  color: '#fff',
  opacity: '0.5',
})

setTimeout(() => {
  maskLayer.closeLoading()
}, 2000)
```

也可以单独引入样式文件：

```ts
import 'web-mask-layer/style.css'
```

## 在非 Vue 项目中使用

`web-mask-layer` 是纯原生 DOM 实现，零框架依赖，可以在任意浏览器端技术栈中使用：

```ts
import { WebMaskLayer } from 'web-mask-layer'

document.querySelector('#load-btn')?.addEventListener('click', () => {
  WebMaskLayer.getInstance().createLoading({
    text: '加载中...',
  })
})
```

## CDN / UMD 用法

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

## API

### `WebMaskLayer.getInstance()`

返回单例遮罩层管理器。

### `createLoading(options)`

创建遮罩层实例。

```ts
import type { MaskLayerOption } from 'web-mask-layer'
```

| 参数          | 类型                    | 默认值          | 说明                                           |
| ------------- | ----------------------- | --------------- | ---------------------------------------------- |
| `text`        | `string`                | `"数据加载中"`  | 遮罩层上显示的文本                             |
| `target`      | `string \| HTMLElement` | `document.body` | 遮罩层挂载的目标元素，CSS 选择器或 HTMLElement |
| `background`  | `string`                | `"#000"`        | 遮罩层背景色                                   |
| `color`       | `string`                | `"#fff"`        | 文本颜色                                       |
| `opacity`     | `string`                | `"0.5"`         | 遮罩层透明度（0 到 1）                         |
| `customClass` | `string`                | `""`            | 遮罩层根元素的自定义 CSS 类名                  |

## 使用说明

- 这是一个浏览器端遮罩层库，不适用于 Node.js 服务端环境
- 它依赖 `window`、`document`、DOM 挂载和浏览器事件，因此不能在纯 Node.js 运行时里直接使用
- 如果你在 SSR 项目里使用，`createLoading()` 和 `closeLoading()` 应该只在客户端执行
- 支持传入字符串作为简写，等价于设置 `text` 参数
- `createLoading()` 在非浏览器环境中调用会静默跳过，不会报错

## 构建产物说明

当前发布包里包含这些产物：

- `dist/web-mask-layer.es.js`：给现代 bundler 用的 ESM 版本
- `dist/web-mask-layer.umd.js`：给 script 标签或传统接入方式用的 UMD 版本
- `dist/web-mask-layer.umd.min.js`：压缩后的 UMD 版本
- `dist/web-mask-layer.css`：样式文件

源码映射文件和 CommonJS 构建产物都不会进入最终发布包。

## 本地开发

```bash
pnpm install
pnpm run dev
pnpm run check
pnpm run build
```

## 项目结构

- `src/components/web-mask-layer.ts`：核心遮罩层逻辑
- `src/components/web-mask-layer.css`：遮罩层样式
- `src/index.ts`：库入口
- `src/App.vue`：本地调试用 demo 页面
- `rollup.config.js`：库构建和类型打包配置
- `vite.config.mts`：demo 开发配置

## License

[MIT](./LICENSE)
