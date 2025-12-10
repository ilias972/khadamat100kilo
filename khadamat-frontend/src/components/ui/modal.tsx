import React, { useEffect, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Memoized Modal component to prevent unnecessary re-renders
export const Modal: React.FC<ModalProps> = React.memo(({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  // Memoize size classes to prevent recalculation on every render
  const sizeClasses = useMemo(() => ({
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }), []);

  // Memoize event handlers to prevent recreation
  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Memoize the close handler for the overlay
  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  // Handle escape key and body scroll with optimized effect
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  // Only render when modal is open to optimize performance
  if (!isOpen) return null;

  // Memoize the modal content to prevent unnecessary re-renders of children
  const memoizedContent = useMemo(() => children, [children]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        className={cn(
          'relative bg-background rounded-2xl shadow-xl max-h-[90vh] overflow-auto w-full',
          sizeClasses[size]
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-border-light">
            <h2 id="modal-title" className="text-lg font-semibold text-text-primary">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        )}
        <div className="p-6">
          {memoizedContent}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to optimize re-rendering
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.title === nextProps.title &&
    prevProps.size === nextProps.size &&
    // Only re-render if children actually changed (shallow comparison)
    prevProps.children === nextProps.children
  );
});