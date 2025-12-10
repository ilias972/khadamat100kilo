'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { microInteractions } from '@/lib/animations';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

interface TooltipAdvancedProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  disabled?: boolean;
  maxWidth?: number;
  variant?: 'default' | 'premium' | 'minimal';
  showArrow?: boolean;
  interactive?: boolean;
  className?: string;
}

export const TooltipAdvanced: React.FC<TooltipAdvancedProps> = ({
  content,
  children,
  position = 'auto',
  delay = 300,
  disabled = false,
  maxWidth = 200,
  variant = 'default',
  showArrow = true,
  interactive = false,
  className,
  ...motionProps
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState<TooltipPosition>('top');
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let finalPosition = position;

    if (position === 'auto') {
      const spaceTop = triggerRect.top;
      const spaceBottom = viewport.height - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = viewport.width - triggerRect.right;

      const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight);

      if (maxSpace === spaceTop) finalPosition = 'top';
      else if (maxSpace === spaceBottom) finalPosition = 'bottom';
      else if (maxSpace === spaceLeft) finalPosition = 'left';
      else finalPosition = 'right';
    }

    let x = 0;
    let y = 0;

    switch (finalPosition) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.top - tooltipRect.height - 8;
        break;
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        y = triggerRect.bottom + 8;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - 8;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'right':
        x = triggerRect.right + 8;
        y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    // Keep tooltip within viewport bounds
    x = Math.max(8, Math.min(x, viewport.width - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, viewport.height - tooltipRect.height - 8));

    setCoords({ x, y });
    setActualPosition(finalPosition);
  };

  const showTooltip = () => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Calculate position after showing to get correct dimensions
      setTimeout(calculatePosition, 0);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (interactive) {
      // Delay hiding for interactive tooltips
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 150);
    } else {
      setIsVisible(false);
    }
  };

  const handleTooltipMouseEnter = () => {
    if (interactive && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleTooltipMouseLeave = () => {
    if (interactive) {
      hideTooltip();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Recalculate position on window resize
  useEffect(() => {
    if (!isVisible) return;

    const handleResize = () => calculatePosition();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [isVisible]);

  const variantClasses = {
    default: 'bg-gray-900 text-white border-gray-700',
    premium: 'bg-white text-gray-900 border-gray-200 shadow-xl',
    minimal: 'bg-gray-800 text-white border-gray-600'
  };

  const arrowVariants: Record<Exclude<TooltipPosition, 'auto'>, string> = {
    top: 'bottom-[-4px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'top-[-4px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-4px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    right: 'left-[-4px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
  };

  return (
    <>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              'fixed z-50 px-3 py-2 text-sm rounded-lg border pointer-events-auto',
              'font-medium shadow-lg backdrop-blur-sm',
              variantClasses[variant],
              className
            )}
            style={{
              left: coords.x,
              top: coords.y,
              maxWidth: maxWidth
            }}
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
            role="tooltip"
            {...motionProps}
          >
            {content}

            {/* Arrow */}
            {showArrow && (
              <div
                className={cn(
                  'absolute w-0 h-0 border-4',
                  arrowVariants[actualPosition as Exclude<TooltipPosition, 'auto'>],
                  variant === 'premium'
                    ? 'border-gray-200'
                    : variant === 'minimal'
                    ? 'border-gray-600'
                    : 'border-gray-700'
                )}
                style={{
                  [actualPosition]: '-4px'
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Simplified tooltip group for managing multiple tooltips
interface TooltipGroupProps {
  children: React.ReactNode;
  delay?: number;
}

export const TooltipGroup: React.FC<TooltipGroupProps> = ({
  children,
  delay = 300
}) => {
  return (
    <div className="tooltip-group">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TooltipAdvanced) {
          return React.cloneElement(child, {
            delay: delay
          } as any);
        }
        return child;
      })}
    </div>
  );
};

// Preset tooltips for common use cases
export const InfoTooltip: React.FC<Omit<TooltipAdvancedProps, 'content' | 'variant'>> = (props) => (
  <TooltipAdvanced
    {...props}
    content="ℹ️ Cliquez pour plus d'informations"
    variant="minimal"
  />
);

export const HelpTooltip: React.FC<Omit<TooltipAdvancedProps, 'content' | 'variant'>> = (props) => (
  <TooltipAdvanced
    {...props}
    content="❓ Aide et assistance"
    variant="premium"
    interactive
  />
);

export const PremiumTooltip: React.FC<Omit<TooltipAdvancedProps, 'content' | 'variant'>> = (props) => (
  <TooltipAdvanced
    {...props}
    content="⭐ Fonctionnalité premium"
    variant="premium"
    position="top"
  />
);