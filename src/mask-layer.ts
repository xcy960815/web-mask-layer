interface MaskLayerOptions {
    loadingText: string
}
import "./mask-layer.css"
export class MaskLayer {
    /* 遮罩层节点 */
    private maskLayerElement: HTMLElement | null = null
    /**
     * 遮罩层队列*
     */
    readonly maskLayerQueue: Array<MaskLayerOptions> = []

    /**
     * @desc 更新遮罩层内容
     * @param {MaskLayerOptions} maskLayerOptions 遮罩层配置项
     * @return {void}
     */
    private uploadMaskLayerText(maskLayerOptions: MaskLayerOptions): void {
        const MaskLayerTextDom: HTMLSpanElement =
            document.querySelector('.web-text')!
        MaskLayerTextDom.textContent = maskLayerOptions.loadingText
            ? maskLayerOptions.loadingText
            : '拼命加载中'
    }

    /**
     * @desc 创建或者更新遮罩层
     * @return {void}
     */
    private uploadMaskLayer(): void {
        const config = this.maskLayerQueue[this.maskLayerQueue.length - 1]
        const hasMaskLayerLayerElement = document.querySelector(
            '.web-mask-layer'
        )
        if (hasMaskLayerLayerElement) {
            this.uploadMaskLayerText(config)
        } else {
            this.createLoadingElement(config)
        }
    }

    /**
     * @desc 向遮罩层队列中添加记录
     * @param {MaskLayerOptions} maskLayerOptions
     * @return {void}
     */
    private addMaskLayerLayer(maskLayerOptions: MaskLayerOptions) {
        // this.maskLayerQueue.push(config)
        // this.uploadMaskLayer()
    }

    //     // 向遮罩层队列中删除记录
    //     private removeMaskLayerLayer(config: maskLayerQueueOptions): void {
    //         const index = this.maskLayerQueue.findIndex(
    //             (itemConfig) =>
    //                 JSON.stringify(itemConfig) === JSON.stringify(config)
    //         )
    //         this.maskLayerQueue.splice(index, 1)
    //         if (this.maskLayerQueue.length) {
    //             this.uploadMaskLayer()
    //         } else {
    //             this.removeLoadingDom()
    //         }
    //     }
    //
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
        // 创建文本节点
        const textElement = this.createElement("span", 'web-mask-layer', loadingText)
        // 创建loading节点
        const dottingElement = this.createElement('span', 'web-dotting')
        // 创建load box 为了将两个放在一个节点内
        const loadingElement = this.createElement('div', 'web-loading-box')
        loadingElement.appendChild(textElement)
        loadingElement.appendChild(dottingElement)
        // 创建遮罩层节点
        this.maskLayerElement = this.createElement('div', 'web-mask-layer')
        this.maskLayerElement.appendChild(loadingElement)
        document.body.appendChild(this.maskLayerElement)
    }

    /**
     * @desc 移除遮罩层
     */
    private removeLoadingElement = (): void => {
        // 延迟300毫秒关闭
        setTimeout(() => {
            const loadingElement = document.querySelector(
                '.web-mask-layer'
            )
            if (loadingElement) {
                document.body.removeChild(loadingElement)
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
    public removeLoading() {
        // if (config) {
        //     this.removeMaskLayerLayer(config)
        // } else {
        //     this.removeLoadingDom()
        // }
    }
}