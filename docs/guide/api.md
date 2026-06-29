# API

## `WebMaskLayer.getInstance()`

Returns the singleton mask layer manager.

```ts
import { WebMaskLayer } from 'web-mask-layer'

const maskLayer = WebMaskLayer.getInstance()
```

## `createLoading(options)`

Creates a mask layer instance. Subsequent calls update the existing mask text or re-create it if the previous one is closing.

```ts
import type { MaskLayerOption } from 'web-mask-layer'
```

| Option        | Type                    | Default         | Description                                                      |
| ------------- | ----------------------- | --------------- | ---------------------------------------------------------------- |
| `text`        | `string`                | `"数据加载中"`  | Text displayed on the mask                                       |
| `target`      | `string \| HTMLElement` | `document.body` | Target element to mount the mask on. CSS selector or HTMLElement |
| `background`  | `string`                | `"#000"`        | Mask background color                                            |
| `color`       | `string`                | `"#fff"`        | Text color                                                       |
| `opacity`     | `string`                | `"0.5"`         | Mask opacity (0 to 1)                                            |
| `customClass` | `string`                | `""`            | Additional custom CSS class name for the mask root element       |

A shorthand is also supported — pass a string directly as the `text` value:

```ts
maskLayer.createLoading('Loading...')
// equivalent to
maskLayer.createLoading({ text: 'Loading...' })
```

## `closeLoading()`

Closes the currently visible mask layer with a fade-out animation.

```ts
maskLayer.closeLoading()
```

The mask is removed from the DOM after the leave animation completes (~100ms). Calling `closeLoading()` multiple times or when no mask is visible is safe — it is a no-op.

## Example

```ts
import { WebMaskLayer } from 'web-mask-layer'

const maskLayer = WebMaskLayer.getInstance()

// Create a mask on a specific container
maskLayer.createLoading({
  text: 'Loading data',
  target: '#dashboard',
  background: '#1a1a2e',
  color: '#e94560',
  opacity: '0.8',
  customClass: 'my-custom-mask',
})

// After some async work
setTimeout(() => {
  maskLayer.closeLoading()
}, 2000)
```

## Behavior notes

- The mask layer uses `position: absolute` and sets the target element to `position: relative` while the mask is active. The original position is restored on close.
- The z-index is computed automatically to the highest value on the page, ensuring the mask always appears on top.
- Calling `createLoading()` while a mask is already running will update the mask text in place.
- Calling `createLoading()` while a mask is in the process of closing will cancel the close and create a fresh mask.
- SSR-safe: `createLoading()` and `closeLoading()` are no-ops in non-browser environments.

## Published artifacts

- `dist/web-mask-layer.es.js`
- `dist/web-mask-layer.umd.js`
- `dist/web-mask-layer.umd.min.js`
- `dist/web-mask-layer.css`
- `types/web-mask-layer.d.ts`
