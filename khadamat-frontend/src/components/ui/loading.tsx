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
  // ✅ CORRECTION CRITIQUE : Utilisation d'un calcul déterministe.
  // Au lieu de Math.random(), on utilise une formule basée sur l'index 'i'.
  // Serveur : ligne 1 = 77%
  // Client  : ligne 1 = 77%
  // -> Plus d'erreur d'hydratation.
  const widths = useMemo(() =>
    Array.from({ length: lines }, (_, i) => {
      // Formule pour varier entre 60% et 100% de manière pseudo-aléatoire mais stable
      return 60 + ((i * 17) % 41);
    }),
    [lines]
  );

  return (
    <div className={cn('space-y-3', className)}>
      {widths.map((width, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded animate-pulse" // 'bg-surface' remplacé par 'bg-gray-200' si 'surface' n'est pas défini dans tailwind
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
    <div className={cn('p-6 border border-gray-100 rounded-lg', className)}>
      <div className="animate-pulse space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};