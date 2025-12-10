'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { componentAnimations, microInteractions } from '@/lib/animations';

interface CardProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  premium?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md',
  interactive = false,
  premium = false,
  glow = false,
  ...motionProps
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Animation variants based on card type
  const getAnimationProps = () => {
    if (premium) {
      return {
        whileHover: {
          scale: 1.02,
          y: -4,
          rotateX: 2,
          rotateY: 1,
          boxShadow: "0 20px 40px rgba(249, 123, 34, 0.15), 0 0 20px rgba(249, 123, 34, 0.1)"
        },
        whileTap: { scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 300, damping: 30 }
      };
    }

    if (interactive) {
      return microInteractions.cardTilt;
    }

    if (hover) {
      return componentAnimations.card;
    }

    return {};
  };

  const cardClasses = cn(
    'bg-surface rounded-3xl shadow-card relative overflow-hidden',
    hover && 'cursor-pointer',
    premium && 'border border-primary-100/50',
    glow && 'hover-glow',
    paddingClasses[padding],
    className
  );

  return (
    <motion.div
      className={cardClasses}
      {...getAnimationProps()}
      {...motionProps}
    >
      {/* Premium gradient border effect */}
      {premium && (
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/20 via-transparent to-primary-500/20 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Subtle shimmer effect for premium cards */}
      {premium && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
          animate={{
            translateX: ['0%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Content */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};