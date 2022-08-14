import { Handler } from 'mitt';
import { PopupManager } from './manager';
import { AugmentedRequired, PopupController, PopupState, Position } from './type';
export declare class Popup<T = any> {
    manager: PopupManager;
    visible: boolean;
    key: string;
    el: T;
    position?: Position;
    mask?: boolean | number;
    zIndex: number;
    maskClosable?: boolean;
    controller: PopupController;
    state: PopupState;
    callbackWhen: 'onClose' | 'onClosed';
    promise?: {
        reject: (reason?: any) => void;
        resolve: (value?: any) => void;
    };
    callbacks: {
        onClose?: () => void;
        onOpened?: () => void;
        onClosed?: () => void;
    };
    duration?: number;
    transition?: string;
    wrapClass?: string;
    contentClass?: string;
    maskClass?: string;
    keyboard: boolean;
    event: import("mitt").Emitter<Record<import("mitt").EventType, unknown>>;
    constructor(opts: AugmentedRequired<Partial<Popup>, 'key' | 'manager' | 'el'>);
    emitBack: () => void;
    updateState: (newValue: PopupState) => void;
    updateVisible: (newValue: boolean) => void;
    onClose: () => void;
    onClosed: () => void;
    on: (type: string, handler: Handler) => void;
    off: (type: string, handler?: Handler<unknown> | undefined) => void;
    private emitChange;
}
