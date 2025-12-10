'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { motion as motionTokens } from '@/lib/design-tokens/motion';

interface FadeInStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
  triggerOnce?: boolean;
}

export const FadeInStagger: React.FC<FadeInStaggerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  direction = 'up',
  distance = 20,
  duration = 300,
  once = true,
  triggerOnce = true
}) => {
  // Calculate initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
      case 'none':
      default:
        return {};
    }
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      }
    }
  };

  // Child animation
  const childVariants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition()
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: triggerOnce,
        margin: once ? "-50px" : "0px"
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={childVariants}
          style={{
            // Ensure proper stacking context
            position: 'relative'
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Specialized stagger components for common use cases
export const FadeInStaggerUp: React.FC<Omit<FadeInStaggerProps, 'direction'>> = (props) => (
  <FadeInStagger {...props} direction="up" />
);

export const FadeInStaggerDown: React.FC<Omit<FadeInStaggerProps, 'direction'>> = (props) => (
  <FadeInStagger {...props} direction="down" />
);

export const FadeInStaggerLeft: React.FC<Omit<FadeInStaggerProps, 'direction'>> = (props) => (
  <FadeInStagger {...props} direction="left" />
);

export const FadeInStaggerRight: React.FC<Omit<FadeInStaggerProps, 'direction'>> = (props) => (
  <FadeInStagger {...props} direction="right" />
);

// Grid stagger for card layouts
export const FadeInStaggerGrid: React.FC<FadeInStaggerProps & {
  columns?: number;
  rows?: number;
}> = ({
  children,
  columns = 3,
  rows,
  staggerDelay = 0.05,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);
  const totalItems = childrenArray.length;
  const actualRows = rows || Math.ceil(totalItems / columns);

  return (
    <motion.div
      className={props.className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: props.triggerOnce,
        margin: props.once ? "-50px" : "0px"
      }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          }
        }
      }}
    >
      {childrenArray.map((child, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;

        return (
          <motion.div
            key={index}
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.9
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: props.duration ? props.duration / 1000 : 0.3,
                  ease: "easeOut",
                  delay: (row * 0.1) + (col * 0.05) // Stagger by row then column
                }
              }
            }}
            style={{
              position: 'relative'
            }}
          >
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FadeInStagger;