import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  duration?: number;
}

// Memoized Toast component to prevent unnecessary re-renders
export const Toast: React.FC<ToastProps> = React.memo(({
  message,
  type = 'info',
  onClose,
  duration = 5000
}) => {
  const [visible, setVisible] = useState(true);

  // Memoize type classes to prevent recalculation
  const typeClasses = useMemo(() => ({
    success: 'bg-success-500 text-white',
    error: 'bg-error-500 text-white',
    warning: 'bg-warning-500 text-white',
    info: 'bg-primary-500 text-white',
  }), []);

  // Memoize close handler to prevent recreation
  const handleClose = useCallback(() => {
    setVisible(false);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  // ✅ CORRECTION : Le "early return" est placé APRÈS tous les hooks
  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg max-w-sm animate-fade-in',
        typeClasses[type]
      )}
      role="alert"
      aria-live="assertive"
    >
      <span className="flex-1">{message}</span>
      {onClose && (
        <button
          onClick={handleClose} // On utilise handleClose directement (plus besoin de doublon)
          className="ml-4 text-current opacity-75 hover:opacity-100 transition-opacity"
          aria-label="Close notification"
        >
          ✕
        </button>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison to optimize re-rendering
  return (
    prevProps.message === nextProps.message &&
    prevProps.type === nextProps.type &&
    prevProps.duration === nextProps.duration
  );
});

// Ajout du DisplayName pour le debugging (et éviter l'erreur eslint 'display-name')
Toast.displayName = 'Toast';