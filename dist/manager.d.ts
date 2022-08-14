import { Handler } from 'mitt';
import { Popup } from './popup';
export declare class PopupManager {
    private count;
    event: import("mitt").Emitter<Record<import("mitt").EventType, unknown>>;
    constructor();
    private popups;
    getCurrentVisiblePopup: () => (Popup<any> & {
        props?: any;
    }) | undefined;
    open: <T = any>(opts: Required<Pick<Popup, 'el'>> & Partial<Pick<Popup, 'key' | 'position' | 'mask' | 'zIndex' | 'maskClosable' | 'duration' | 'callbackWhen' | 'wrapClass' | 'maskClass' | 'contentClass' | 'keyboard'>> & {
        onClose?: () => void;
        onOpened?: () => void;
        onClosed?: () => void;
    }) => Promise<T | undefined>;
    close: (key: string, result?: unknown) => void;
    closeAll: () => void;
    destroy: (key: string) => void;
    includes: (key: string) => boolean;
    on: (type: string, handler: Handler) => void;
    off: (type: string, handler?: Handler<unknown> | undefined) => void;
    private emitChange;
}
