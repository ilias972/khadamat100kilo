import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text,
  className,
  fullScreen = false,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-primary-200 border-t-primary-600',
          sizeClasses[size]
        )}
        role="status"
        aria-label="Chargement"
      >
        <span className="sr-only">Chargement...</span>
      </div>
      {text && (
        <p className="text-sm text-text-secondary animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export const LoadingSkeleton: React.FC<{
  className?: string;
  lines?: number;
}> = ({ className, lines = 3 }) => {
  const widths = useMemo(() =>
    Array.from({ length: lines }, () => Math.random() * 40 + 60),
    [lines]
  );

  return (
    <div className={cn('space-y-3', className)}>
      {widths.map((width, i) => (
        <div
          key={i}
          className="h-4 bg-surface rounded animate-pulse"
          style={{
            width: `${width}%`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export const LoadingCard: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div className={cn('p-6 border border-border-light rounded-lg', className)}>
      <div className="animate-pulse space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-surface rounded-full"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-surface rounded w-3/4"></div>
            <div className="h-3 bg-surface rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-surface rounded"></div>
          <div className="h-3 bg-surface rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};