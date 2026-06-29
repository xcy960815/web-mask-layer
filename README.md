# web-mask-layer

[![npm](https://img.shields.io/npm/v/web-mask-layer.svg)](https://www.npmjs.com/package/web-mask-layer)
[![License](https://img.shields.io/npm/l/web-mask-layer.svg)](https://github.com/xcy960815/web-mask-layer)
[![npm](https://img.shields.io/npm/dm/web-mask-layer.svg)](https://github.com/xcy960815/web-mask-layer)
[![GitHub issues](https://img.shields.io/github/issues/xcy960815/web-mask-layer.svg)](https://github.com/xcy960815/web-mask-layer/issues)
[![GitHub stars](https://img.shields.io/github/stars/xcy960815/web-mask-layer.svg?style=social&label=Stars)](https://github.com/xcy960815/web-mask-layer)
[![GitHub forks](https://img.shields.io/github/forks/xcy960815/web-mask-layer.svg?style=social&label=Fork)](https://github.com/xcy960815/web-mask-layer)

- Documentation: [https://xcy960815.github.io/web-mask-layer/](https://xcy960815.github.io/web-mask-layer/)
- Online Demo: [https://xcy960815.github.io/web-mask-layer/guide/demo](https://xcy960815.github.io/web-mask-layer/guide/demo)

`web-mask-layer` is a lightweight browser-side mask/layer library with a plain JavaScript API. It shows a loading overlay on the entire page or on a specific target element.

It is a pure vanilla-DOM library with zero framework dependency.

## Features

- Singleton pattern for efficient memory usage
- Target any DOM element or the entire page body
- Configurable text, background, color, opacity, and custom CSS class
- Smooth enter/leave CSS animations
- SSR-safe: no-ops when `window` or `document` is unavailable
- TypeScript definitions included
- Automatic z-index calculation to always appear on top
- Supports updating text in-place without recreating the mask

## Installation

```bash
npm install web-mask-layer -S
```

```bash
pnpm add web-mask-layer
```

## Quick Start

Import the library:

```ts
import { WebMaskLayer } from 'web-mask-layer'

const maskLayer = WebMaskLayer.getInstance()

maskLayer.createLoading({
  text: 'Loading data',
  background: '#000',
  target: '.my-container',
  color: '#fff',
  opacity: '0.5',
})

setTimeout(() => {
  maskLayer.closeLoading()
}, 2000)
```

Or import the stylesheet separately:

```ts
import 'web-mask-layer/style.css'
```

## Using It Outside Vue Apps

`web-mask-layer` is pure vanilla DOM. It works in any browser-based project with zero framework dependency:

```ts
import { WebMaskLayer } from 'web-mask-layer'

document.querySelector('#load-btn')?.addEventListener('click', () => {
  WebMaskLayer.getInstance().createLoading({
    text: 'Loading...',
  })
})
```

## CDN / UMD Example

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

Returns the singleton mask layer manager.

### `createLoading(options)`

Creates a mask layer instance.

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

## Notes

- This package is intended for browser usage.
- It cannot function in a pure Node.js runtime because it depends on `window`, `document`, and DOM APIs.
- In SSR applications, import is usually fine, but `createLoading()` and `closeLoading()` should only be called on the client side.
- `createLoading()` supports a shorthand: pass a string directly as the text value.

## Build Artifacts

The published package currently includes:

- `dist/web-mask-layer.es.js`: ESM build for modern bundlers
- `dist/web-mask-layer.umd.js`: UMD build for script-tag or legacy integration
- `dist/web-mask-layer.umd.min.js`: minified UMD build
- `dist/web-mask-layer.css`: stylesheet

Source maps and CommonJS output are intentionally not published.

## Development

```bash
pnpm install
pnpm run dev
pnpm run check
pnpm run build
```

## Project Structure

- `src/components/web-mask-layer.ts`: core mask layer logic
- `src/components/web-mask-layer.css`: component styles
- `src/index.ts`: library entry
- `src/App.vue`: local demo playground
- `rollup.config.js`: Rollup build for library bundles and bundled declarations
- `vite.config.mts`: Vite config for the demo app

## License

[MIT](./LICENSE)
