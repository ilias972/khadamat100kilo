'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { entranceAnimations, scrollAnimations } from '@/lib/animations';

interface GlassContainerProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  intensity?: 'light' | 'medium' | 'strong';
  animated?: boolean;
  reveal?: boolean;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className,
  padding = 'lg',
  intensity = 'medium',
  animated = false,
  reveal = false,
  ...motionProps
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  const intensityClasses = {
    light: 'bg-[rgba(250,247,242,0.6)] backdrop-blur-sm',
    medium: 'bg-[rgba(250,247,242,0.8)] backdrop-blur-md',
    strong: 'bg-[rgba(255,255,255,0.9)] backdrop-blur-lg'
  };

  // Animation props based on flags
  const getAnimationProps = () => {
    if (reveal) {
      return scrollAnimations.reveal;
    }

    if (animated) {
      return entranceAnimations.scaleIn;
    }

    return {};
  };

  return (
    <motion.div
      className={cn(
        'rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06),0_0_40px_rgba(249,123,34,0.1)] border border-white/20 relative overflow-hidden',
        intensityClasses[intensity],
        paddingClasses[padding],
        className
      )}
      {...getAnimationProps()}
      {...motionProps}
    >
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 rounded-[24px]" />

      {/* Premium shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};