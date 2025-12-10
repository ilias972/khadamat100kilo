interface AccessibilityPreferences {
    reducedMotion: boolean;
    highContrast: boolean;
    largeText: boolean;
    screenReader: boolean;
    focusVisible: boolean;
}
interface AccessibilityActions {
    announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
    setFocus: (element: HTMLElement | null) => void;
    trapFocus: (container: HTMLElement, initialFocus?: HTMLElement) => () => void;
    skipToContent: (targetId: string) => void;
}
export declare const useAccessibility: () => AccessibilityPreferences & AccessibilityActions;
export declare const useAriaAttributes: (baseAttributes?: Record<string, any>) => {
    attributes: Record<string, any>;
    updateAttribute: (key: string, value: any) => void;
    removeAttribute: (key: string) => void;
};
export declare const useKeyboardNavigation: (items: any[], onSelect?: (item: any) => void) => {
    focusedIndex: number;
    setFocusedIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
    handleKeyDown: (e: KeyboardEvent) => void;
};
export declare const useWCAGCompliance: () => {
    checkContrast: (foreground: string, background: string) => boolean;
    validateFocusableElements: (container: HTMLElement) => string[];
};
export {};
