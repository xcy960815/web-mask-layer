<template>
  <div class="web-mask-layer-demo">
    <button @click="handleClickButton">点击创建</button>
  </div>
</template>

<script lang='ts'>
import { WebMaskLayer } from "web-mask-layer";
import Vue from "vue";

export default Vue.extend({
  methods: {
    handleClickButton() {
      const webMaskLayer = WebMaskLayer.getInstance();
      webMaskLayer.createLoading("数据加载中1");
      setTimeout(() => {
        webMaskLayer.createLoading("数据加载中2");
      }, 2000);
      setTimeout(() => {
        webMaskLayer.createLoading("数据加载中3");
      }, 4000);
      setTimeout(() => {
        webMaskLayer.createLoading("数据加载中4");
      }, 6000);
      setTimeout(() => {
        webMaskLayer.closeLoading();
      }, 8000);
    },
    //  创建一个遮罩层
    createMaskLayer() {
      const webMaskLayer = new WebMaskLayer();
      new Promise(resolve => {
        const resolveValue = 123;
        webMaskLayer.createLoading({
          text: "数据加载中",
          // background: "red",
          target: ".web-mask-layer-demo",
          color: "yellow"
        });
        setTimeout(() => {
          resolve(resolveValue);
        }, 2000);
      }).then(() => {
        //  关闭遮罩层
        webMaskLayer.closeLoading();
      });
    }
  },
  mounted() {
    this.createMaskLayer();
  }
});
</script>
<style lang='less' scoped>
.web-mask-layer-demo {
  height: 500px;
  width: 500px;
  margin: 100px;
  background: aquamarine;
  z-index: 1000;
  position: relative;
}
</style>