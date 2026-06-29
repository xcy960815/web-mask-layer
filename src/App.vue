<template>
  <div class="web-mask-layer-demo">
    <div class="web-mask-layer-demo__header">
      <h1>web-mask-layer demo</h1>
      <p>一个简单、轻量级且可自定义的 Web 遮罩层</p>
    </div>

    <div class="web-mask-layer-demo__layout">
      <section class="demo-panel">
        <h2>基础场景</h2>
        <div class="demo-grid">
          <button class="demo-button" @click="emitDefaultMask">
            默认遮罩（body）
          </button>
          <button class="demo-button" @click="emitTargetMask">
            指定目标遮罩
          </button>
          <button class="demo-button" @click="emitMultipleTexts">
            连续更新文本
          </button>
          <button class="demo-button" @click="emitCustomStyle">
            自定义样式
          </button>
        </div>
      </section>

      <section class="demo-panel demo-panel--playground">
        <h2>自定义测试</h2>
        <div class="demo-form">
          <label class="demo-field">
            <span>遮罩文本</span>
            <input
              v-model="customText"
              type="text"
              class="demo-input"
              placeholder="请输入遮罩文本"
            />
          </label>

          <div class="demo-form__row">
            <label class="demo-field">
              <span>背景色</span>
              <input
                v-model="customBackground"
                type="text"
                class="demo-input"
                placeholder="#000"
              />
            </label>

            <label class="demo-field">
              <span>文本颜色</span>
              <input
                v-model="customColor"
                type="text"
                class="demo-input"
                placeholder="#fff"
              />
            </label>

            <label class="demo-field">
              <span>透明度</span>
              <input
                v-model="customOpacity"
                type="text"
                class="demo-input"
                placeholder="0.5"
              />
            </label>
          </div>

          <label class="demo-field">
            <span>目标选择器</span>
            <input
              v-model="customTarget"
              type="text"
              class="demo-input"
              placeholder="留空为 body，指定选择器如 .demo-box"
            />
          </label>

          <label class="demo-field">
            <span>自定义类名</span>
            <input
              v-model="customClass"
              type="text"
              class="demo-input"
              placeholder="自定义 CSS 类名"
            />
          </label>

          <div class="demo-form__actions">
            <button
              class="demo-button demo-button--primary"
              @click="emitCustomMask"
            >
              创建自定义遮罩
            </button>
            <button class="demo-button" @click="resetCustomForm">
              重置表单
            </button>
          </div>
        </div>
      </section>

      <section class="demo-panel demo-panel--target">
        <h2>目标区域测试</h2>
        <div id="demo-box-1" class="demo-box">
          <p>目标区域 1</p>
          <button class="demo-button" @click="emitTargetById('#demo-box-1')">
            在此区域创建遮罩
          </button>
        </div>
        <div id="demo-box-2" class="demo-box">
          <p>目标区域 2</p>
          <button class="demo-button" @click="emitTargetById('#demo-box-2')">
            在此区域创建遮罩
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { WebMaskLayer } from './index'

const messageInstance = WebMaskLayer.getInstance()

const customText = ref('数据加载中')
const customBackground = ref('#000')
const customColor = ref('#fff')
const customOpacity = ref('0.5')
const customTarget = ref('')
const customClass = ref('')

const emitDefaultMask = (): void => {
  messageInstance.createLoading('数据加载中')
  setTimeout(() => {
    messageInstance.closeLoading()
  }, 2000)
}

const emitTargetMask = (): void => {
  messageInstance.createLoading({
    text: '指定区域加载中',
    target: '#demo-box-1',
    color: '#409eff',
  })
  setTimeout(() => {
    messageInstance.closeLoading()
  }, 2000)
}

const emitMultipleTexts = (): void => {
  messageInstance.createLoading('数据加载中 1')
  setTimeout(() => {
    messageInstance.createLoading('数据加载中 2')
  }, 2000)
  setTimeout(() => {
    messageInstance.createLoading('数据加载中 3')
  }, 4000)
  setTimeout(() => {
    messageInstance.closeLoading()
  }, 6000)
}

const emitCustomStyle = (): void => {
  messageInstance.createLoading({
    text: '自定义样式遮罩',
    background: '#1a1a2e',
    color: '#e94560',
    opacity: '0.8',
  })
  setTimeout(() => {
    messageInstance.closeLoading()
  }, 2500)
}

const emitCustomMask = (): void => {
  messageInstance.createLoading({
    text: customText.value,
    background: customBackground.value || '#000',
    color: customColor.value || '#fff',
    opacity: customOpacity.value || '0.5',
    target: customTarget.value || undefined,
    customClass: customClass.value || undefined,
  })
  setTimeout(() => {
    messageInstance.closeLoading()
  }, 3000)
}

const emitTargetById = (selector: string): void => {
  messageInstance.createLoading({
    text: '目标区域遮罩',
    target: selector,
    color: '#409eff',
    opacity: '0.7',
  })
  setTimeout(() => {
    messageInstance.closeLoading()
  }, 2000)
}

const resetCustomForm = (): void => {
  customText.value = '数据加载中'
  customBackground.value = '#000'
  customColor.value = '#fff'
  customOpacity.value = '0.5'
  customTarget.value = ''
  customClass.value = ''
}
</script>

<style lang="less" scoped>
.web-mask-layer-demo {
  min-height: 100vh;
  padding: 32px;
  background: #f6f8fb;
  color: #243041;

  &__header {
    margin-bottom: 24px;

    h1 {
      margin: 0 0 8px;
      font-size: 28px;
      font-weight: 600;
    }

    p {
      margin: 0;
      color: #5f6b7a;
      line-height: 1.5;
    }
  }

  &__layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    align-items: start;
  }
}

.demo-panel {
  background: #fff;
  border: 1px solid #d9e0ea;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(33, 52, 86, 0.08);

  h2 {
    margin: 0 0 16px;
    font-size: 18px;
    font-weight: 600;
  }

  &--playground {
    grid-column: 1 / -1;
  }

  &--target {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.demo-box {
  padding: 20px;
  border: 1px dashed #ced7e3;
  border-radius: 8px;
  min-height: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  p {
    margin: 0;
    color: #5f6b7a;
    font-size: 14px;
  }
}

.demo-button {
  min-height: 42px;
  padding: 10px 14px;
  border: 1px solid #ced7e3;
  border-radius: 8px;
  background: #fff;
  color: #243041;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: #8ea4c2;
    box-shadow: 0 6px 16px rgba(40, 67, 110, 0.12);
  }

  &--primary {
    background: #2f6fed;
    border-color: #2f6fed;
    color: #fff;
  }
}

.demo-form {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  &__actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
}

.demo-field {
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 13px;
    color: #5b6775;
  }
}

.demo-input {
  width: 100%;
  border: 1px solid #ced7e3;
  border-radius: 8px;
  padding: 10px 12px;
  font: inherit;
  color: #243041;
  background: #fff;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .web-mask-layer-demo {
    padding: 20px;

    &__layout {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .demo-grid,
  .demo-form__row,
  .demo-panel--target {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
