'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
  animated?: boolean;
  lines?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'default',
  animated = true,
  lines = 1
}) => {
  const baseClasses = 'bg-gradient-to-r from-surface via-surface/50 to-surface';

  const variantClasses = {
    default: 'h-4 w-full rounded-lg',
    card: 'h-32 w-full rounded-3xl',
    text: 'h-4 rounded',
    avatar: 'h-10 w-10 rounded-full',
    button: 'h-10 w-24 rounded-2xl'
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={cn(
              baseClasses,
              variantClasses.text,
              index === lines - 1 ? 'w-3/4' : 'w-full', // Last line shorter
              className
            )}
            animate={animated ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : undefined}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.1
            }}
            style={{
              backgroundSize: '200% 100%'
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        className
      )}
      animate={animated ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      } : undefined}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        backgroundSize: '200% 100%'
      }}
    />
  );
};

// Specialized skeleton components
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 bg-surface rounded-3xl space-y-4', className)}>
    <Skeleton variant="avatar" className="w-12 h-12" />
    <div className="space-y-2">
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
    <Skeleton variant="button" />
  </div>
);

export const SkeletonList: React.FC<{ count?: number; className?: string }> = ({
  count = 3,
  className
}) => (
  <div className={cn('space-y-4', className)}>
    {Array.from({ length: count }).map((_, index) => (
      <motion.div
        key={index}
        className="flex items-center space-x-4 p-4 bg-surface rounded-2xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Skeleton variant="avatar" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </motion.div>
    ))}
  </div>
);

export const SkeletonGrid: React.FC<{ count?: number; className?: string }> = ({
  count = 6,
  className
}) => (
  <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
    {Array.from({ length: count }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <SkeletonCard />
      </motion.div>
    ))}
  </div>
);

// Loading overlay component
export const LoadingOverlay: React.FC<{
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}> = ({ children, loading = false, className }) => (
  <div className={cn('relative', className)}>
    {children}
    {loading && (
      <motion.div
        className="absolute inset-0 bg-surface/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div
            className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-sm text-text-secondary">Chargement...</p>
        </motion.div>
      </motion.div>
    )}
  </div>
);