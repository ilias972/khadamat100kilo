'use client';

import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// Enhanced button with proper accessibility
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  tooltip?: string;
  id?: string;
}

export const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    loading = false, 
    children, 
    leftIcon, 
    rightIcon, 
    tooltip,
    id,
    disabled,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const variants = {
      default: 'bg-[#F97B22] hover:bg-[#e66a1f] text-white focus:bg-[#e66a1f]',
      outline: 'border border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10 focus:bg-[#F97B22]/20',
      ghost: 'text-text-secondary hover:text-text-primary hover:bg-[#F97B22]/10 focus:bg-[#F97B22]/20',
      destructive: 'bg-red-500 hover:bg-red-600 text-white focus:bg-red-600'
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base'
    };

    const handleFocus = () => {
      setIsFocused(true);
      if (buttonRef.current) {
        buttonRef.current.style.outline = '2px solid #F97B22';
        buttonRef.current.style.outlineOffset = '2px';
      }
    };

    const handleBlur = () => {
      setIsFocused(false);
      if (buttonRef.current) {
        buttonRef.current.style.outline = 'none';
      }
    };

    const baseClasses = cn(
      'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-95',
      // Touch target optimization
      'min-h-[44px] min-w-[44px]',
      variants[variant],
      sizes[size],
      className
    );

    return (
      <button
        ref={buttonRef}
        id={id}
        className={baseClasses}
        disabled={disabled || loading}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={props['aria-label']}
        aria-describedby={tooltip ? `${id}-tooltip` : undefined}
        aria-expanded={props['aria-expanded']}
        aria-haspopup={props['aria-haspopup']}
        data-loading={loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <span className={cn('flex items-center space-x-2', loading && 'opacity-0')}>
          {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </span>

        {tooltip && (
          <div
            id={`${id}-tooltip`}
            role="tooltip"
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap"
            aria-hidden="true"
          >
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </div>
        )}
      </button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';

// Enhanced focus management hook
export function useEnhancedFocus() {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
  const [focusHistory, setFocusHistory] = useState<HTMLElement[]>([]);

  const focusElement = (element: HTMLElement | null) => {
    if (element) {
      setFocusedElement(element);
      element.focus({ preventScroll: true });
      
      setFocusHistory(prev => {
        const newHistory = prev.filter(el => el !== element);
        newHistory.push(element);
        return newHistory.slice(-5); // Keep last 5 focused elements
      });
    }
  };

  const restoreFocus = () => {
    if (focusHistory.length > 1) {
      const previousElement = focusHistory[focusHistory.length - 2];
      focusElement(previousElement);
      setFocusHistory(prev => prev.slice(0, -1));
    }
  };

  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (e.key === 'Escape') {
        // Allow escape to break the trap
        document.removeEventListener('keydown', handleKeyDown);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Focus first element
    if (firstElement) {
      firstElement.focus();
    }

    // Return cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  };

  return {
    focusedElement,
    focusElement,
    restoreFocus,
    trapFocus
  };
}

// Skip navigation link component
export function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#F97B22] text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:ring-offset-2"
    >
      Aller au contenu principal
    </a>
  );
}

// Accessible form components
interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

export const AccessibleInput = React.forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    required, 
    className, 
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.outline = '2px solid #F97B22';
      e.target.style.outlineOffset = '2px';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.style.outline = 'none';
    };

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="obligatoire">*</span>
            )}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-text-muted" aria-hidden="true">{leftIcon}</span>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-3 py-2 border rounded-lg bg-white text-text-primary placeholder-text-muted',
              'focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-[#F97B22]',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              // Touch target optimization
              'min-h-[44px]',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-border-light focus:ring-[#F97B22] focus:border-[#F97B22]',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={cn(errorId, helperId)}
            aria-required={required}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-text-muted" aria-hidden="true">{rightIcon}</span>
            </div>
          )}
        </div>
        
        {error && (
          <p 
            id={errorId}
            className="text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p 
            id={helperId}
            className="text-sm text-text-secondary"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = 'AccessibleInput';

// Accessible modal component
interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  ariaLabel?: string;
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  ariaLabel
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { trapFocus, restoreFocus } = useEnhancedFocus();

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const cleanup = trapFocus(modalRef.current);
      
      // Focus first focusable element
      const firstFocusable = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      
      if (firstFocusable) {
        firstFocusable.focus();
      }

      return cleanup;
    }
  }, [isOpen, trapFocus]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          'relative bg-white rounded-[24px] shadow-xl max-h-[90vh] overflow-auto',
          'focus:outline-none',
          sizes[size]
        )}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 id="modal-title" className="text-xl font-bold text-text-primary">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#F97B22]/10 focus:outline-none focus:ring-2 focus:ring-[#F97B22]"
            aria-label="Fermer la modale"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div id="modal-description" className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Announce changes to screen readers
export function useScreenReader() {
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  return { announce };
}