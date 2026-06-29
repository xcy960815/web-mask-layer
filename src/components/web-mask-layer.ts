import './web-mask-layer.css'

import type { MaskLayerOption } from '../types'

export class WebMaskLayer {
  private WEB_MASK_LAYER_CLASS_NAME = 'web-mask-layer'
  private WEB_MASK_LAYER_CONTENT_CLASS_NAME = 'web-mask-layer-content'
  private WEB_MASK_LAYER_TEXT_CLASS_NAME = 'web-mask-layer-text'
  private WEB_MASK_LAYER_DOTTING_CLASS_NAME = 'web-mask-layer-dotting'
  private WEB_MASK_LAYER_ENTER_CLASS_NAME = 'web-mask-layer-enter'
  private WEB_MASK_LAYER_LEAVE_CLASS_NAME = 'web-mask-layer-leave'
  private maskLayerElement: HTMLElement | null = null
  private isClosing: boolean = false
  private text: string = '数据加载中'
  private target: HTMLElement = document.body
  private targetStyleReactive: CSSStyleDeclaration['position'] = ''
  private background: string = '#000'
  private customClass: string = ''
  private color: string = '#fff'
  private opacity: string = '0.5'
  private static instance: WebMaskLayer

  public static getInstance(): WebMaskLayer {
    if (WebMaskLayer.instance) {
      return WebMaskLayer.instance
    } else {
      return (WebMaskLayer.instance = new WebMaskLayer())
    }
  }

  private getMaxZIndex(): number {
    return Array.from(document.querySelectorAll('*')).reduce(
      (maxZIndex: number, element: Element) => {
        if (!(element instanceof HTMLElement)) return maxZIndex
        if (element.closest(`.${this.WEB_MASK_LAYER_CLASS_NAME}`))
          return maxZIndex
        const zIndex = Number(window.getComputedStyle(element).zIndex)
        return Number.isNaN(zIndex) ? maxZIndex : Math.max(maxZIndex, zIndex)
      },
      0,
    )
  }

  private checkMaskLayer(): boolean {
    return !!this.maskLayerElement
  }

  private checkIsClosing(): boolean {
    return this.isClosing
  }

  private checkTargetHasMaskLayerElement(): boolean {
    return this.target.contains(this.maskLayerElement!)
  }

  private makeTargetReactive(): void {
    const target = this.target
    this.targetStyleReactive = target.style.position
    this.target.style.position = 'relative'
  }

  private makeTargetUnReactive(): void {
    this.target.style.position = this.targetStyleReactive
  }

  private resetProperty() {
    this.text = '数据加载中'
    this.target = document.body
    this.background = '#000'
    this.customClass = ''
    this.color = '#fff'
    this.opacity = '0.5'
  }

  private createElement(tagName: string, className: string): HTMLElement {
    const element = document.createElement(tagName)

    element.classList.add(className)

    if (className === this.WEB_MASK_LAYER_CLASS_NAME) {
      if (this.customClass) {
        element.classList.add(this.customClass)
      }
      element.style.background = this.background
      element.style.opacity = this.opacity
      element.style.zIndex = (this.getMaxZIndex() + 1).toString()
      element.classList.add(this.WEB_MASK_LAYER_ENTER_CLASS_NAME)
      setTimeout(() => {
        element.classList.remove(this.WEB_MASK_LAYER_ENTER_CLASS_NAME)
      }, 100)
    }
    if (className === this.WEB_MASK_LAYER_DOTTING_CLASS_NAME) {
      element.style.color = this.color
    }
    if (className === this.WEB_MASK_LAYER_TEXT_CLASS_NAME) {
      element.innerText = this.text
      element.style.color = this.color
    }
    return element
  }

  private createLoadingElement(): void {
    this.makeTargetReactive()
    if (this.checkMaskLayer() && !this.checkIsClosing()) {
      const textElement = this.maskLayerElement?.querySelector<HTMLSpanElement>(
        `.${this.WEB_MASK_LAYER_TEXT_CLASS_NAME}`,
      ) as HTMLSpanElement
      textElement.innerText = this.text
    } else {
      this.isClosing = false
      const textElement = this.createElement(
        'span',
        this.WEB_MASK_LAYER_TEXT_CLASS_NAME,
      )
      const dottingElement = this.createElement(
        'span',
        this.WEB_MASK_LAYER_DOTTING_CLASS_NAME,
      )
      const loadingElement = this.createElement(
        'div',
        this.WEB_MASK_LAYER_CONTENT_CLASS_NAME,
      )
      loadingElement.appendChild(textElement)
      loadingElement.appendChild(dottingElement)
      this.maskLayerElement = this.createElement(
        'div',
        this.WEB_MASK_LAYER_CLASS_NAME,
      )
      this.maskLayerElement.appendChild(loadingElement)
    }
    this.target.appendChild(this.maskLayerElement!)
  }

  private removeLoadingElement = (): void => {
    if (this.checkMaskLayer() && !this.checkIsClosing()) {
      this.isClosing = true
      this.maskLayerElement?.classList.add(this.WEB_MASK_LAYER_LEAVE_CLASS_NAME)
      setTimeout(() => {
        if (this.checkTargetHasMaskLayerElement()) {
          this.target.removeChild(this.maskLayerElement!)
        }
        this.maskLayerElement?.classList.remove(
          this.WEB_MASK_LAYER_LEAVE_CLASS_NAME,
        )
        this.makeTargetUnReactive()
        this.isClosing = false
        this.resetProperty()
      }, 100)
    }
  }

  public createLoading(maskLayerOption: MaskLayerOption | string): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    if (typeof maskLayerOption === 'string') {
      maskLayerOption = { text: maskLayerOption }
    }
    const { text, background, customClass, target, color, opacity } =
      maskLayerOption
    if (text) this.text = text
    if (background) this.background = background
    if (customClass) this.customClass = customClass
    if (target) {
      if (target instanceof HTMLElement) {
        this.target = target
      } else {
        const queriedTarget = document.querySelector<HTMLElement>(target)
        if (queriedTarget) {
          this.target = queriedTarget
        }
      }
    }
    if (color) this.color = color
    if (opacity) this.opacity = opacity
    this.createLoadingElement()
  }

  public closeLoading() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return
    this.removeLoadingElement()
  }
}
