# API

## `WebMaskLayer.getInstance()`

返回单例遮罩层管理器。

```ts
import { WebMaskLayer } from 'web-mask-layer'

const maskLayer = WebMaskLayer.getInstance()
```

## `createLoading(options)`

创建遮罩层。后续调用会更新现有遮罩的文本，如果遮罩正在关闭中则会取消关闭并重建。

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

也支持传入字符串作为简写，直接设置 `text`：

```ts
maskLayer.createLoading('数据加载中')
// 等价于
maskLayer.createLoading({ text: '数据加载中' })
```

## `closeLoading()`

关闭当前显示的遮罩层，带有淡出动画。

```ts
maskLayer.closeLoading()
```

遮罩层在离场动画完成后（约 100ms）从 DOM 中移除。多次调用 `closeLoading()` 或在没有遮罩层时调用是安全的 — 它是空操作。

## 示例

```ts
import { WebMaskLayer } from 'web-mask-layer'

const maskLayer = WebMaskLayer.getInstance()

// 在指定容器上创建遮罩
maskLayer.createLoading({
  text: '数据加载中',
  target: '#dashboard',
  background: '#1a1a2e',
  color: '#e94560',
  opacity: '0.8',
  customClass: 'my-custom-mask',
})

// 异步操作完成后关闭
setTimeout(() => {
  maskLayer.closeLoading()
}, 2000)
```

## 行为说明

- 遮罩层使用 `position: absolute` 定位，并在激活时将目标元素设置为 `position: relative`。关闭后会恢复原始 position。
- z-index 会自动计算为页面中最高值，确保遮罩层始终在最顶层。
- 在已有遮罩层时调用 `createLoading()` 会原地更新遮罩文本。
- 在遮罩正在关闭时调用 `createLoading()` 会取消关闭并重建新的遮罩。
- SSR 安全：在非浏览器环境中调用 `createLoading()` 和 `closeLoading()` 是空操作。

## 发布产物

- `dist/web-mask-layer.es.js`
- `dist/web-mask-layer.umd.js`
- `dist/web-mask-layer.umd.min.js`
- `dist/web-mask-layer.css`
- `types/web-mask-layer.d.ts`
