export declare type Position = 'left' | 'right' | 'bottom' | 'top' | 'center';
export interface PopupController {
    close(result?: unknown): void;
    onlyClose(): void;
}
export declare type PopupState = 'created' | 'beforeMount' | 'mounted' | 'beforeUnmount' | 'unmounted';
export declare type AugmentedRequired<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Required<Pick<T, K>>;
