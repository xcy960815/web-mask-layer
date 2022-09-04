<template>
  <!-- <div class='web-mask-layer'> -->
  <!-- </div> -->
</template>

<script lang='ts'>
import {MaskLayer} from "web-mask-layer";
import Vue from "vue";

export default Vue.extend({
  methods: {
    //  创建一个遮罩层
    createMaskLayer() {
      const maskLayer = new MaskLayer();
      new Promise((resolve)=>{
        maskLayer.createLoading("数据加载中");
      }).then(()=>{
        //  关闭遮罩层
        maskLayer.closeLoading();
      
      })
      
    }
  },
  mounted() {
    this.createMaskLayer();
  }
});
</script>
<style lang='less' scoped>
.web-mask-layer {
  position: relative;
}
</style>