'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '@/lib/design-tokens/colors';
import { motion as motionTokens } from '@/lib/design-tokens/motion';

interface WarmGradientMeshProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  animated?: boolean;
  children?: React.ReactNode;
}

export const WarmGradientMesh: React.FC<WarmGradientMeshProps> = ({
  className = '',
  intensity = 'medium',
  animated = true,
  children
}) => {
  // Define gradient configurations based on intensity
  const gradients = {
    subtle: {
      primary: `radial-gradient(circle at 20% 50%, ${colors.primary[100]}20 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, ${colors.secondary[500]}15 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, ${colors.primary[50]}10 0%, transparent 50%)`,
      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
    },
    medium: {
      primary: `radial-gradient(circle at 20% 50%, ${colors.primary[100]}30 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, ${colors.secondary[500]}25 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, ${colors.primary[200]}20 0%, transparent 50%),
                radial-gradient(circle at 60% 10%, #C3E6F515 0%, transparent 50%)`,
      backgroundPosition: ['0% 0%', '50% 50%', '100% 100%', '0% 0%']
    },
    strong: {
      primary: `radial-gradient(circle at 20% 50%, ${colors.primary[200]}40 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, ${colors.secondary[500]}35 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, ${colors.primary[100]}30 0%, transparent 50%),
                radial-gradient(circle at 60% 10%, #C3E6F525 0%, transparent 50%),
                radial-gradient(circle at 10% 90%, ${colors.primary[50]}20 0%, transparent 50%)`,
      backgroundPosition: ['0% 0%', '25% 25%', '50% 50%', '75% 75%', '100% 100%', '0% 0%']
    }
  };

  const config = gradients[intensity];

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: config.primary,
        backgroundSize: '200% 200%'
      }}
      animate={animated ? { backgroundPosition: config.backgroundPosition } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {/* Additional animated mesh layer for depth */}
      {animated && (
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${colors.primary[500]}10 0%, transparent 40%),
                        radial-gradient(circle at 30% 70%, ${colors.secondary[500]}08 0%, transparent 40%)`,
            backgroundSize: '150% 150%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
        />
      )}

      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default WarmGradientMesh;