# Install

## Package install

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

## Quick start

Import the library. CSS is bundled in the JS, so no separate stylesheet import is needed:

```ts
import { WebMaskLayer } from 'web-mask-layer'

const maskLayer = WebMaskLayer.getInstance()

maskLayer.createLoading({
  text: 'Loading data',
  background: '#000',
  opacity: '0.5',
  color: '#fff',
})

setTimeout(() => {
  maskLayer.closeLoading()
}, 2000)
```

Or import the stylesheet separately:

```ts
import { WebMaskLayer } from 'web-mask-layer'
import 'web-mask-layer/style.css'
```

## Use in any browser project

`web-mask-layer` has zero framework dependency. It works in any browser-based project:

```ts
import { WebMaskLayer } from 'web-mask-layer'

document.querySelector('#load-btn')?.addEventListener('click', () => {
  WebMaskLayer.getInstance().createLoading({
    text: 'Loading...',
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

## Target a specific element

You can mask a specific element instead of the whole page:

```ts
const maskLayer = WebMaskLayer.getInstance()

maskLayer.createLoading({
  text: 'Loading...',
  target: '.my-container',
})

// or pass an HTMLElement directly
const el = document.getElementById('my-container')
maskLayer.createLoading({
  text: 'Loading...',
  target: el,
})
```

## Runtime boundary

- `web-mask-layer` is intended for browser-side usage only.
- It cannot function in a pure Node.js runtime.
- In SSR apps, calling `createLoading()` or `closeLoading()` is safe — they check for `window`/`document` and return early.
