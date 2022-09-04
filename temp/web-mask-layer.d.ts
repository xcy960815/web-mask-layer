interface MaskLayerOptions {
    loadingText: string;
}
import "./web-mask-layer.css";
export declare class MaskLayer {
    private WEB_MASK_LAYER_CLASS_NAME;
    private WEB_MASK_LAYER_CONTENT_CLASS_NAME;
    private WEB_MASK_LAYER_TEXT_CLASS_NAME;
    private WEB_MASK_LAYER_DOTTING_CLASS_NAME;
    private maskLayerElement;
    readonly maskLayerQueue: Array<MaskLayerOptions>;
    private checkMaskLayer;
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
    closeLoading(): void;
}
export {};
