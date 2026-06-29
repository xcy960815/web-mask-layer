---
layout: home

hero:
  name: web-mask-layer
  text: 浏览器端遮罩层
  tagline: 一个简单、轻量级且可自定义的 Web 遮罩层，提供普通 JavaScript API，支持单例模式、自定义样式和平滑动画。
  actions:
    - theme: brand
      text: 快速开始
      link: /zh-CN/guide/install
    - theme: alt
      text: 在线体验
      link: /zh-CN/guide/demo

features:
  - title: 普通 JS API
    details: 用 `WebMaskLayer.getInstance()` 即可在 JavaScript/TypeScript 等任意浏览器项目中调用，零框架依赖。
  - title: 轻量级
    details: 纯原生 DOM 实现，没有任何运行时依赖，打包体积小，加载快。
  - title: 可自定义
    details: 支持配置文本、背景色、文字颜色、透明度、自定义 CSS 类名和目标元素。内建平滑进出动画。
---

## 为什么用它

`web-mask-layer` 提供一个简单直接的浏览器端遮罩层，用于展示加载状态：

- 零运行时依赖 — 纯原生 DOM 操作
- 单例模式，节省内存
- 可指定任意 DOM 元素或整个页面作为遮罩目标
- 自定义样式和 CSS 类名，易于主题化
- 平滑的 CSS 入场/离场动画

## 运行时说明

- 这是一个纯浏览器端库，无任何框架依赖。
- 可以在 Vue、React、Angular 或纯 HTML 等任意浏览器项目中使用。
- 如果你在 SSR 项目中使用，`createLoading()` 需要只在客户端调用。

## 下一步

- [安装与快速开始](/zh-CN/guide/install)
- [API 说明](/zh-CN/guide/api)
- [在线演示](/zh-CN/guide/demo)
