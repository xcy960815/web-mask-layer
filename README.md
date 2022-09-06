### web-mask-layer

[//]: # ([![Build Status]&#40;https://travis-ci.org/lukeed/web-mask-layer.svg?branch=master&#41;]&#40;https://travis-ci.org/lukeed/web-mask-layer&#41;)

> 一个简单、轻量级且可自定义的 Web 遮罩层

## 安装

``` 
npm install --save web-mask-layer
```

### 使用

```js
import {WebMaskLayer} from 'web-mask-layer';

//创建遮罩层实例
const webMaskLayer = new WebMaskLayer();

//创建遮罩层
webMaskLayer.createLoading({
    text: "数据加载中", // 遮罩层文本 默认为"数据加载中"
    background: "#000", // 遮罩层背景色 默认为"#000"
    target: ".web-mask-layer-demo", // 遮罩层挂载的目标元素 默认为body
    color: "#fff", // 遮罩层文本颜色 默认为"#fff"
    opacity: "0.5", // 遮罩层透明度 默认为"0.5"
    customClass: "web-mask-layer-demo", // 遮罩层自定义类名 默认为""
});

setTimeout(() => {
    webMaskLayer.closeLoading();
}, 2000)

```
