export declare interface MaskLayerOption {
    text?: string;
    target?: string | HTMLElement;
    background?: string;
    color?: string;
    customClass?: string;
    opacity?: string;
}

export declare class WebMaskLayer {
    private WEB_MASK_LAYER_CLASS_NAME;
    private WEB_MASK_LAYER_CONTENT_CLASS_NAME;
    private WEB_MASK_LAYER_TEXT_CLASS_NAME;
    private WEB_MASK_LAYER_DOTTING_CLASS_NAME;
    private WEB_MASK_LAYER_ENTER_CLASS_NAME;
    private WEB_MASK_LAYER_LEAVE_CLASS_NAME;
    private maskLayerElement;
    private text;
    private target;
    private targetStyleReactive;
    private background;
    private customClass;
    private color;
    private opacity;
    private static instance;
    constructor();
    private getMaxZIndex;
    private checkMaskLayer;
    private checkTargetHasMaskLayerElement;
    /**
     * @desc 将target节点的属性变成 reactive属性
     * @returns {void}
     */
    private makeTargetReactive;
    /**
     * @desc 将target节点的属性还原
     * @returns {void}
     */
    private makeTargetUnReactive;
    /**
     * @desc 还原属性
     * @returns {void}
     */
    private resetProperty;
    /**
     * @desc 创建节点方法
     * @param {string} tagName
     * @param {string} className
     * @return HTMLElement
     * @private
     */
    private createElement;
    /**
     * @desc 创建遮罩层节点
     * @return {void}
     */
    private createLoadingElement;
    /**
     * @desc 移除遮罩层
     * @return {void}
     */
    private removeLoadingElement;
    /**
     * @desc 创建遮罩层
     * @param {MaskLayerOption|string} maskLayerOption
     * @return {void}
     */
    createLoading(maskLayerOption?: MaskLayerOption | string): void;
    /**
     * @desc 关闭遮罩层
     * @returns {void}
     */
    closeLoading(): void;
}

export { }
