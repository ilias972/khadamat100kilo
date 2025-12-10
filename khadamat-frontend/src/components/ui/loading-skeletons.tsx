'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Base skeleton component
interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'rectangular' | 'circular';
  animate?: boolean;
}

export function Skeleton({
  className,
  width,
  height,
  variant = 'rectangular',
  animate = true
}: SkeletonProps) {
  const baseClasses = cn(
    'bg-[#EDEEEF] rounded',
    {
      'text': 'h-4',
      'rectangular': '',
      'circular': 'rounded-full',
      'animate-pulse': animate
    },
    className
  );

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={baseClasses}
      style={style}
      aria-hidden="true"
    />
  );
}

// Animated skeleton with shimmer effect
interface ShimmerSkeletonProps extends SkeletonProps {
  shimmerColor?: string;
  backgroundColor?: string;
}

export function ShimmerSkeleton({
  className,
  shimmerColor = 'rgba(255, 255, 255, 0.4)',
  backgroundColor = '#EDEEEF',
  ...props
}: ShimmerSkeletonProps) {
  return (
    <div
      className={cn('relative overflow-hidden rounded', className)}
      style={{
        backgroundColor,
        backgroundImage: `linear-gradient(90deg, ${backgroundColor} 0%, ${shimmerColor} 50%, ${backgroundColor} 100%)`,
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }}
    >
      <div className="h-full w-full bg-transparent" />
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

// Booking card skeleton
export function BookingCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'mobile' }) {
  const isCompact = variant === 'compact' || variant === 'mobile';

  return (
    <div className={cn(
      'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6',
      isCompact && 'p-4'
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Skeleton variant="circular" width={isCompact ? 40 : 48} height={isCompact ? 40 : 48} />
          <div className="flex-1">
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <div className={cn('space-y-2 text-sm text-text-secondary', isCompact && 'space-y-1')}>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-3 w-40" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border-light">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

// Stats card skeleton
export function StatsCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'mobile' }) {
  const isCompact = variant === 'compact' || variant === 'mobile';

  return (
    <div className={cn(
      'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6',
      isCompact && 'p-4'
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton className="h-3 w-24 mb-2" />
          <Skeleton className="h-8 w-20 mb-2" />
          {!isCompact && <Skeleton className="h-3 w-32" />}
          
          {!isCompact && (
            <div className="mt-2">
              <Skeleton className="h-4 w-16" />
            </div>
          )}
        </div>
        <Skeleton variant="circular" width={isCompact ? 32 : 48} height={isCompact ? 32 : 48} />
      </div>
    </div>
  );
}

// Chart skeleton
export function ChartSkeleton({ height = 200 }: { height?: number }) {
  return (
    <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="text-right">
          <Skeleton className="h-6 w-16 mb-1" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      
      <div className="relative">
        <Skeleton height={height} className="w-full" />
        
        {/* Fake chart grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border-t border-border-light mx-2" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Message card skeleton
export function MessageCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6">
      <div className="flex items-start space-x-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-2 w-12" />
          </div>
          <Skeleton className="h-3 w-full mb-2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
    </div>
  );
}

// Dashboard skeleton for complete loading state
export function DashboardSkeleton({ type = 'client' }: { type?: 'client' | 'pro' }) {
  return (
    <div className="space-y-8">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-8">
        <div className="flex items-center space-x-6">
          <Skeleton variant="circular" width={80} height={80} />
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-64 mb-2" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <div className="text-right">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ChartSkeleton height={256} />
          <ChartSkeleton height={192} />
        </div>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6">
            <Skeleton className="h-5 w-32 mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <MessageCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Booking lists */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <BookingCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Pro dashboard specific skeleton
export function ProDashboardSkeleton() {
  return (
    <DashboardSkeleton type="pro" />
  );
}

// Client dashboard specific skeleton
export function ClientDashboardSkeleton() {
  return (
    <DashboardSkeleton type="client" />
  );
}

// Mobile dashboard skeleton
export function MobileDashboardSkeleton() {
  return (
    <div className="space-y-4">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton className="h-3 w-8" />
            </div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>

      {/* Mobile chart */}
      <ChartSkeleton height={160} />

      {/* Booking cards */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <BookingCardSkeleton key={i} variant="mobile" />
        ))}
      </div>
    </div>
  );
}

// Progressive loading skeleton - shows partial content while loading
interface ProgressiveSkeletonProps {
  loaded?: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ProgressiveSkeleton({
  loaded = false,
  fallback,
  children,
  className
}: ProgressiveSkeletonProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Loaded content */}
      <div className={cn('transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0 pointer-events-none')}>
        {children}
      </div>
      
      {/* Loading fallback */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          {fallback || <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F97B22]" />}
        </div>
      )}
    </div>
  );
}

// Skeleton list for loading multiple items
export function SkeletonList({
  count = 3,
  component: Component,
  className
}: {
  count?: number;
  component: React.ComponentType;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }, (_, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

// Table skeleton
export function TableSkeleton({
  rows = 5,
  columns = 4
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card overflow-hidden">
      <div className="p-6 border-b border-border-light">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="divide-y divide-border-light">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="p-6 flex items-center space-x-4">
            {Array.from({ length: columns }, (_, j) => (
              <Skeleton 
                key={j} 
                className="h-4 flex-1" 
                width={j === columns - 1 ? 60 : undefined}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Infinite loading skeleton
export function InfiniteLoadingSkeleton() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F97B22]" />
        <span className="text-sm text-text-secondary">Chargement...</span>
      </div>
    </div>
  );
}