"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWCAGCompliance = exports.useKeyboardNavigation = exports.useAriaAttributes = exports.useAccessibility = void 0;
const react_1 = require("react");
const useAccessibility = () => {
    const [preferences, setPreferences] = (0, react_1.useState)({
        reducedMotion: false,
        highContrast: false,
        largeText: false,
        screenReader: false,
        focusVisible: true
    });
    (0, react_1.useEffect)(() => {
        const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const mediaQueryContrast = window.matchMedia('(prefers-contrast: high)');
        const updatePreferences = () => {
            setPreferences(prev => ({
                ...prev,
                reducedMotion: mediaQueryMotion.matches,
                highContrast: mediaQueryContrast.matches,
                screenReader: navigator.userAgent.includes('Screen Reader') ||
                    document.querySelector('[aria-live]') !== null
            }));
        };
        updatePreferences();
        mediaQueryMotion.addEventListener('change', updatePreferences);
        mediaQueryContrast.addEventListener('change', updatePreferences);
        return () => {
            mediaQueryMotion.removeEventListener('change', updatePreferences);
            mediaQueryContrast.removeEventListener('change', updatePreferences);
        };
    }, []);
    const announceToScreenReader = (0, react_1.useCallback)((message, priority = 'polite') => {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', priority);
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        document.body.appendChild(announcement);
        announcement.textContent = message;
        setTimeout(() => {
            if (announcement.parentNode) {
                announcement.parentNode.removeChild(announcement);
            }
        }, 1000);
    }, []);
    const setFocus = (0, react_1.useCallback)((element) => {
        if (element && typeof element.focus === 'function') {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);
    const trapFocus = (0, react_1.useCallback)((container, initialFocus) => {
        const focusableElements = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (initialFocus) {
            setFocus(initialFocus);
        }
        else if (firstElement) {
            setFocus(firstElement);
        }
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        setFocus(lastElement);
                    }
                }
                else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        setFocus(firstElement);
                    }
                }
            }
            if (e.key === 'Escape') {
                const closeButton = container.querySelector('[data-close-modal]');
                if (closeButton) {
                    closeButton.click();
                }
            }
        };
        container.addEventListener('keydown', handleKeyDown);
        return () => {
            container.removeEventListener('keydown', handleKeyDown);
        };
    }, [setFocus]);
    const skipToContent = (0, react_1.useCallback)((targetId) => {
        const target = document.getElementById(targetId);
        if (target) {
            setFocus(target);
            announceToScreenReader(`Navigated to ${target.getAttribute('aria-label') || target.textContent || 'content'}`);
        }
    }, [setFocus, announceToScreenReader]);
    return {
        ...preferences,
        announceToScreenReader,
        setFocus,
        trapFocus,
        skipToContent
    };
};
exports.useAccessibility = useAccessibility;
const useAriaAttributes = (baseAttributes = {}) => {
    const [attributes, setAttributes] = (0, react_1.useState)(baseAttributes);
    const updateAttribute = (0, react_1.useCallback)((key, value) => {
        setAttributes(prev => ({ ...prev, [key]: value }));
    }, []);
    const removeAttribute = (0, react_1.useCallback)((key) => {
        setAttributes(prev => {
            const newAttrs = { ...prev };
            delete newAttrs[key];
            return newAttrs;
        });
    }, []);
    return { attributes, updateAttribute, removeAttribute };
};
exports.useAriaAttributes = useAriaAttributes;
const useKeyboardNavigation = (items, onSelect) => {
    const [focusedIndex, setFocusedIndex] = (0, react_1.useState)(-1);
    const handleKeyDown = (0, react_1.useCallback)((e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIndex(prev => Math.min(prev + 1, items.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIndex(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (focusedIndex >= 0 && onSelect) {
                    onSelect(items[focusedIndex]);
                }
                break;
            case 'Home':
                e.preventDefault();
                setFocusedIndex(0);
                break;
            case 'End':
                e.preventDefault();
                setFocusedIndex(items.length - 1);
                break;
        }
    }, [items, focusedIndex, onSelect]);
    return { focusedIndex, setFocusedIndex, handleKeyDown };
};
exports.useKeyboardNavigation = useKeyboardNavigation;
const useWCAGCompliance = () => {
    const checkContrast = (0, react_1.useCallback)((foreground, background) => {
        const fgBrightness = getBrightness(foreground);
        const bgBrightness = getBrightness(background);
        const contrast = Math.abs(fgBrightness - bgBrightness);
        return contrast > 125;
    }, []);
    const getBrightness = (color) => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return (r * 299 + g * 587 + b * 114) / 1000;
    };
    const validateFocusableElements = (0, react_1.useCallback)((container) => {
        const issues = [];
        const focusableElements = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]');
        focusableElements.forEach((element) => {
            const el = element;
            const hasAccessibleName = el.getAttribute('aria-label') ||
                el.getAttribute('aria-labelledby') ||
                el.textContent?.trim() ||
                el.getAttribute('alt');
            if (!hasAccessibleName) {
                issues.push(`Element ${el.tagName} lacks accessible name`);
            }
            const tabindex = el.getAttribute('tabindex');
            if (tabindex && parseInt(tabindex) < 0 && el.tagName !== 'BUTTON' && el.tagName !== 'INPUT') {
                issues.push(`Element ${el.tagName} has negative tabindex but is not inherently focusable`);
            }
        });
        return issues;
    }, []);
    return { checkContrast, validateFocusableElements };
};
exports.useWCAGCompliance = useWCAGCompliance;
//# sourceMappingURL=use-accessibility.js.map