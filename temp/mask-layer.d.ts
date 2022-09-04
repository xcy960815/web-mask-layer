interface MaskLayerOptions {
    loadingText: string;
}
import "./mask-layer.css";
export declare class MaskLayer {
    private maskLayerElement;
    /**
     * 遮罩层队列*
     */
    readonly maskLayerQueue: Array<MaskLayerOptions>;
    /**
     * @desc 更新遮罩层内容
     * @param {MaskLayerOptions} maskLayerOptions 遮罩层配置项
     * @return {void}
     */
    private uploadMaskLayerText;
    /**
     * @desc 创建或者更新遮罩层
     * @return {void}
     */
    private uploadMaskLayer;
    /**
     * @desc 向遮罩层队列中添加记录
     * @param {MaskLayerOptions} maskLayerOptions
     * @return {void}
     */
    private addMaskLayerLayer;
    /**
     * @desc 创建节点方法
     * @param {string} tagName
     * @param {string} className
     * @param {string} innerText
     * @return HTMLElement
     * @private
     */
    private createElement;
    /**
     * @desc 创建遮罩层节点
     * @param {MaskLayerOptions} maskLayerOptions
     * @private
     * @return {void}
     */
    private createLoadingElement;
    /**
     * @desc 移除遮罩层
     */
    private removeLoadingElement;
    /**
     * @desc 创建遮罩层
     * @param loadingText
     */
    createLoading(loadingText: string): void;
    /**
     * @desc 关闭遮罩层
     */
    removeLoading(): void;
}
export {};
