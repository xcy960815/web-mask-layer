interface MaskLayerOption {
    text?: string;
    target?: string | HTMLElement;
    background?: string;
    color?: string;
    customClass?: string;
    opacity?: string;
}

declare class WebMaskLayer {
    private WEB_MASK_LAYER_CLASS_NAME;
    private WEB_MASK_LAYER_CONTENT_CLASS_NAME;
    private WEB_MASK_LAYER_TEXT_CLASS_NAME;
    private WEB_MASK_LAYER_DOTTING_CLASS_NAME;
    private WEB_MASK_LAYER_ENTER_CLASS_NAME;
    private WEB_MASK_LAYER_LEAVE_CLASS_NAME;
    private maskLayerElement;
    private isClosing;
    private text;
    private target;
    private targetStyleReactive;
    private background;
    private customClass;
    private color;
    private opacity;
    private static instance;
    static getInstance(): WebMaskLayer;
    private getMaxZIndex;
    private checkMaskLayer;
    private checkIsClosing;
    private checkTargetHasMaskLayerElement;
    private makeTargetReactive;
    private makeTargetUnReactive;
    private resetProperty;
    private createElement;
    private createLoadingElement;
    private removeLoadingElement;
    createLoading(maskLayerOption: MaskLayerOption | string): void;
    closeLoading(): void;
}

export { WebMaskLayer };
export type { MaskLayerOption };
