import {Position} from "postcss";

export interface MaskLayerOption {
    text?: string // 显示在加载图标前面的加载文案
    target?: string | HTMLElement // Loading 需要覆盖的 DOM 节点。可传入一个 DOM 对象或字符串；若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
    background?: string // 遮罩层的背景色
    color?: string // 遮罩层的字体颜色
    customClass?: string // 遮罩层的自定义类名
    opacity?: string; // 遮罩层的透明度
}

// 加载css样式
import "./web-mask-layer.css"

export class WebMaskLayer {
    /* 遮罩层根节点class */
    private WEB_MASK_LAYER_CLASS_NAME = 'web-mask-layer'
    /* 遮罩层文本和动态省略号盒子class */
    private WEB_MASK_LAYER_CONTENT_CLASS_NAME = 'web-mask-layer-content'
    /* 遮罩层文本class */
    private WEB_MASK_LAYER_TEXT_CLASS_NAME = 'web-mask-layer-text'
    /* 遮罩层动态省略号class */
    private WEB_MASK_LAYER_DOTTING_CLASS_NAME = 'web-mask-layer-dotting'
    /* 遮罩层移入动画class */
    private WEB_MASK_LAYER_ENTER_CLASS_NAME = 'web-mask-layer-enter'
    /* 遮罩层移出动画class */
    private WEB_MASK_LAYER_LEAVE_CLASS_NAME = 'web-mask-layer-leave'
    /* 遮罩层节点 */
    private maskLayerElement: HTMLElement | null = null
    /* 默认loading文本 */
    private text: string = '数据加载中'
    /* 遮罩层根节点 */
    private target: HTMLElement = document.body
    /* 遮罩层根节点原来的position属性 */
    private targetStyleReactive: CSSStyleDeclaration['position'] = ""
    /* 遮罩层背景色 */
    private background: string = '#000'
    /* 遮罩层自定义class */
    private customClass: string = ''
    /*遮罩层文本颜色*/
    private color: string = '#fff'
    /*遮罩层透明度*/
    private opacity: string = "0.5"

    private static instance: WebMaskLayer

    constructor() {
        /* 多次实例化只返回第一次new的对象 */
        if (WebMaskLayer.instance) {
            return WebMaskLayer.instance
        } else {
            WebMaskLayer.instance = this
        }
    }

    /* 获取页面中最大的z-index 使用reduce方法 */
    private getMaxZIndex(): number {
        return Array.from(document.querySelectorAll("*")).reduce((maxZIndex: number, element: Element) => Math.max(maxZIndex, +window.getComputedStyle(element).zIndex || 0), 0)
    }

    /* 校验是否存在遮罩层 */
    private checkMaskLayer(): boolean {
        return !!this.maskLayerElement
    }

    /**
     * @desc 将target节点的属性变成 reactive属性
     * @returns {void}
     */
    private makeTargetReactive(): void {
        const target = this.target
        //  记录原来的position属性
        this.targetStyleReactive = target.style.position
        this.target.style.position = 'relative'
    }

    /**
     * @desc 将target节点的属性还原
     * @returns {void}
     */
    private makeTargetUnReactive(): void {
        this.target.style.position = this.targetStyleReactive
    }

    /**
     * @desc 还原属性
     * @returns {void}
     */
    private resetProperty() {
        this.text = '数据加载中'
        this.target = document.body
        this.background = '#000'
        this.customClass = ''
        this.color = '#fff'
        this.opacity = "0.5"
    }

    /**
     * @desc 创建节点方法
     * @param {string} tagName
     * @param {string} className
     * @return HTMLElement
     * @private
     */
    private createElement(tagName: string, className: string): HTMLElement {

        const element = document.createElement(tagName)

        element.classList.add(className)

        // 处理根节点
        if (className === this.WEB_MASK_LAYER_CLASS_NAME) {
            // 添加自定义class
            if (this.customClass) {
                element.classList.add(this.customClass)
            }
            element.style.background = this.background
            element.style.opacity = this.opacity
            // 让遮罩层的z-index最大
            element.style.zIndex = (this.getMaxZIndex() + 1).toString()
            // 添加入场动画
            element.classList.add(this.WEB_MASK_LAYER_ENTER_CLASS_NAME)
            // 300ms后移除入场动画
            setTimeout(() => {
                element.classList.remove(this.WEB_MASK_LAYER_ENTER_CLASS_NAME)
            }, 300)
        }
        // 处理dotting节点
        if (className === this.WEB_MASK_LAYER_DOTTING_CLASS_NAME) {
            element.style.color = this.color
        }
        // 处理文本节点
        if (className === this.WEB_MASK_LAYER_TEXT_CLASS_NAME) {
            element.innerText = this.text
            element.style.color = this.color
        }
        return element
    }

    /**
     * @desc 创建遮罩层节点
     * @return {void}
     */
    private createLoadingElement(): void {
        this.makeTargetReactive()
        if (this.checkMaskLayer()) {
            // 修改遮罩层文本
            const textElement = this.maskLayerElement?.querySelector<HTMLSpanElement>(`.${this.WEB_MASK_LAYER_TEXT_CLASS_NAME}`) as HTMLSpanElement
            textElement.innerText = this.text
        } else {
            // 创建遮罩层文本节点
            const textElement = this.createElement("span", this.WEB_MASK_LAYER_TEXT_CLASS_NAME,)
            // 创建dotting节点
            const dottingElement = this.createElement('span', this.WEB_MASK_LAYER_DOTTING_CLASS_NAME,)
            // 创建load box 为了将两个放在一个节点内
            const loadingElement = this.createElement('div', this.WEB_MASK_LAYER_CONTENT_CLASS_NAME,)
            loadingElement.appendChild(textElement)
            loadingElement.appendChild(dottingElement)
            // 创建遮罩层根节点
            this.maskLayerElement = this.createElement('div', this.WEB_MASK_LAYER_CLASS_NAME,)
            this.maskLayerElement.appendChild(loadingElement)
        }
        this.target.appendChild(this.maskLayerElement!)
    }

    /**
     * @desc 移除遮罩层
     */
    private removeLoadingElement = (): void => {
        // 延迟300毫秒关闭
        if (this.checkMaskLayer()) {
            // 添加离开动画
            this.maskLayerElement?.classList.add(this.WEB_MASK_LAYER_LEAVE_CLASS_NAME)
            //延迟300毫秒移除遮罩层
            setTimeout(() => {
                this.target.removeChild(this.maskLayerElement!)
                this.maskLayerElement?.classList.remove(this.WEB_MASK_LAYER_LEAVE_CLASS_NAME)
                this.makeTargetUnReactive()
                this.resetProperty()
            }, 300)
        }
    }

    /**
     * @desc 创建遮罩层
     * @param {MaskLayerOption|string} maskLayerOption
     * @return {void}
     */
    public createLoading(maskLayerOption?: MaskLayerOption | string): void {
        // maskLayerOption做兼容处理
        maskLayerOption = typeof maskLayerOption === 'string' || maskLayerOption === undefined ? {text: maskLayerOption || "数据加载中"} : maskLayerOption
        const {text, background, customClass, target, color, opacity} = maskLayerOption
        if (text) this.text = text
        if (background) this.background = background
        if (customClass) this.customClass = customClass
        if (target) {
            if (target instanceof HTMLElement) {
                this.target = target
            } else {
                this.target = document.querySelector<HTMLElement>(target) as HTMLElement
            }
        }
        if (color) this.color = color
        if (opacity) this.opacity = opacity
        this.createLoadingElement()
    }

    /**
     * @desc 关闭遮罩层
     * @returns {void}
     */
    public closeLoading() {
        this.removeLoadingElement()
    }
}