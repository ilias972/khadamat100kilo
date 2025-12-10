import { useState, useEffect, useCallback } from 'react';

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

export const useAccessibility = (): AccessibilityPreferences & AccessibilityActions => {
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    screenReader: false,
    focusVisible: true
  });

  // Detect system preferences
  useEffect(() => {
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

    // Initial check
    updatePreferences();

    // Listen for changes
    mediaQueryMotion.addEventListener('change', updatePreferences);
    mediaQueryContrast.addEventListener('change', updatePreferences);

    return () => {
      mediaQueryMotion.removeEventListener('change', updatePreferences);
      mediaQueryContrast.removeEventListener('change', updatePreferences);
    };
  }, []);

  // Screen reader announcement
  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
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

    // Remove after announcement
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  }, []);

  // Focus management
  const setFocus = useCallback((element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
      // Scroll into view if needed
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  // Focus trapping for modals
  const trapFocus = useCallback((container: HTMLElement, initialFocus?: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Set initial focus
    if (initialFocus) {
      setFocus(initialFocus);
    } else if (firstElement) {
      setFocus(firstElement);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            setFocus(lastElement);
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            setFocus(firstElement);
          }
        }
      }

      // Escape key handling
      if (e.key === 'Escape') {
        // Could emit an event to close modal
        const closeButton = container.querySelector('[data-close-modal]') as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [setFocus]);

  // Skip to content functionality
  const skipToContent = useCallback((targetId: string) => {
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

// Hook for managing ARIA attributes dynamically
export const useAriaAttributes = (baseAttributes: Record<string, any> = {}) => {
  const [attributes, setAttributes] = useState(baseAttributes);

  const updateAttribute = useCallback((key: string, value: any) => {
    setAttributes(prev => ({ ...prev, [key]: value }));
  }, []);

  const removeAttribute = useCallback((key: string) => {
    setAttributes(prev => {
      const newAttrs = { ...prev };
      delete newAttrs[key];
      return newAttrs;
    });
  }, []);

  return { attributes, updateAttribute, removeAttribute };
};

// Hook for keyboard navigation
export const useKeyboardNavigation = (items: any[], onSelect?: (item: any) => void) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
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

// WCAG compliance checker (development helper)
export const useWCAGCompliance = () => {
  const checkContrast = useCallback((foreground: string, background: string): boolean => {
    // Simple contrast check - in production, use a proper color contrast library
    const fgBrightness = getBrightness(foreground);
    const bgBrightness = getBrightness(background);
    const contrast = Math.abs(fgBrightness - bgBrightness);

    return contrast > 125; // WCAG AA requires 4.5:1 ratio, this is a simplified check
  }, []);

  const getBrightness = (color: string): number => {
    // Convert hex to RGB and calculate brightness
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const validateFocusableElements = useCallback((container: HTMLElement): string[] => {
    const issues: string[] = [];
    const focusableElements = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]');

    focusableElements.forEach((element) => {
      const el = element as HTMLElement;

      // Check for accessible name
      const hasAccessibleName = el.getAttribute('aria-label') ||
                               el.getAttribute('aria-labelledby') ||
                               el.textContent?.trim() ||
                               el.getAttribute('alt');

      if (!hasAccessibleName) {
        issues.push(`Element ${el.tagName} lacks accessible name`);
      }

      // Check tabindex
      const tabindex = el.getAttribute('tabindex');
      if (tabindex && parseInt(tabindex) < 0 && el.tagName !== 'BUTTON' && el.tagName !== 'INPUT') {
        issues.push(`Element ${el.tagName} has negative tabindex but is not inherently focusable`);
      }
    });

    return issues;
  }, []);

  return { checkContrast, validateFocusableElements };
};