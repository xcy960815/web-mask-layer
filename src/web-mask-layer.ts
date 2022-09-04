interface MaskLayerOptions {
    loadingText: string
}


// 加载css样式
import "./web-mask-layer.css"

export class MaskLayer {

    private WEB_MASK_LAYER_CLASS_NAME = 'web-mask-layer'
    private WEB_MASK_LAYER_CONTENT_CLASS_NAME = 'web-mask-layer-content'
    private WEB_MASK_LAYER_TEXT_CLASS_NAME = 'web-mask-layer-text'
    private WEB_MASK_LAYER_DOTTING_CLASS_NAME = 'web-mask-layer-dotting'

    /* 遮罩层节点 */
    private maskLayerElement: HTMLElement | null = null

    /* 遮罩层队列 */
    readonly maskLayerQueue: Array<MaskLayerOptions> = []

    /* 校验是否存在遮罩层 */
    private checkMaskLayer(): boolean {
        return !!this.maskLayerElement
    }
    /**
     * @desc 创建节点方法
     * @param {string} tagName
     * @param {string} className
     * @param {string} innerText
     * @return HTMLElement
     * @private
     */
    private createElement(tagName: string, className: string, innerText?: string): HTMLElement {
        const element = document.createElement(tagName)
        element.classList.add(className)
        if (innerText) {
            element.innerText = innerText
        }
        return element
    }


    /**
     * @desc 创建遮罩层节点
     * @param {MaskLayerOptions} maskLayerOptions
     * @private
     * @return {void}
     */
    private createLoadingElement(maskLayerOptions: MaskLayerOptions): void {
        // loading文本
        const { loadingText } = maskLayerOptions
        // 创建遮罩层文本节点
        const textElement = this.createElement("span", this.WEB_MASK_LAYER_TEXT_CLASS_NAME, loadingText)
        // 创建loading节点
        const dottingElement = this.createElement('span', this.WEB_MASK_LAYER_DOTTING_CLASS_NAME)
        // 创建load box 为了将两个放在一个节点内
        const loadingElement = this.createElement('div', this.WEB_MASK_LAYER_CONTENT_CLASS_NAME)
        loadingElement.appendChild(textElement)
        loadingElement.appendChild(dottingElement)
        // 创建遮罩层根节点
        this.maskLayerElement = this.createElement('div', this.WEB_MASK_LAYER_CLASS_NAME)
        this.maskLayerElement.appendChild(loadingElement)
        document.body.appendChild(this.maskLayerElement)
    }

    /**
     * @desc 移除遮罩层
     */
    private removeLoadingElement = (): void => {
        // 延迟300毫秒关闭
        setTimeout(() => {
            if (!!this.maskLayerElement) {
                document.body.removeChild(this.maskLayerElement)
            }
        })
    }

    /**
     * @desc 创建遮罩层
     * @param loadingText
     */
    public createLoading(loadingText: string): void {
        console.log("loadingText", loadingText)
        // 添加遮罩层任务队列
        // this.addMaskLayerLayer(config)
        this.createLoadingElement({ loadingText })
    }

    /**
     * @desc 关闭遮罩层
     */
    public closeLoading() {
        // if (config) {
        this.removeLoadingElement()
        // } else {
        //     this.removeLoadingDom()
        // }
    }
}