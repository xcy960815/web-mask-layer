---
layout: home

hero:
  name: web-mask-layer
  text: Browser-side mask layer
  tagline: A simple, lightweight and customizable web mask layer with plain JavaScript API. Supports singleton pattern, custom styles, and smooth animations.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/install
    - theme: alt
      text: Try Demo
      link: /guide/demo

features:
  - title: Plain JS API
    details: Use the singleton instance from JavaScript or TypeScript in any browser-based project with zero framework dependency.
  - title: Lightweight
    details: Pure vanilla DOM implementation without any runtime dependencies. Small bundle size, fast to load.
  - title: Customizable
    details: Configure text, background, color, opacity, custom CSS class, and target element. Smooth enter/leave animations included.
---

## Why this library

`web-mask-layer` is a simple and direct mask layer for loading states in browser applications:

- no runtime dependencies — pure vanilla DOM operations
- singleton pattern for efficient memory usage
- target any DOM element or the entire page body
- custom styles and CSS classes for easy theming
- smooth CSS animations for enter and leave transitions

## Runtime notes

- This is a pure browser-side library with no framework dependency.
- It can be used in any browser-based project — Vue, React, Angular, or plain HTML.
- In SSR applications, call `createLoading()` only on the client side.

## Next steps

- [Install and quick start](/guide/install)
- [API reference](/guide/api)
- [Online demo playground](/guide/demo)
