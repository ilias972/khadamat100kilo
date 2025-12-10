'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '@/lib/design-tokens/colors';
import { motion as motionTokens } from '@/lib/design-tokens/motion';
import { respectReducedMotion } from '@/lib/animations';

interface MoroccanPatternProps {
  className?: string;
  opacity?: number;
  animated?: boolean;
  patternType?: 'geometric' | 'star' | 'arabesque';
  color?: string;
}

export const MoroccanPattern: React.FC<MoroccanPatternProps> = ({
  className = '',
  opacity = 0.12,
  animated = true,
  patternType = 'arabesque',
  color = '#EDEEEF'
}) => {
  const patternId = `moroccan-pattern-${patternType}`;

  const renderPattern = () => {
    switch (patternType) {
      case 'star':
        return (
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Moroccan star pattern */}
            <g transform="translate(30,30)">
              {/* Central star */}
              <path
                d="M0,-15 L4,-5 L15,-5 L6,2 L9,12 L0,6 L-9,12 L-6,2 L-15,-5 L-4,-5 Z"
                fill={color}
                opacity={opacity}
              />
              {/* Corner decorations */}
              <circle cx="20" cy="-20" r="2" fill={color} opacity={opacity * 0.7} />
              <circle cx="-20" cy="-20" r="2" fill={color} opacity={opacity * 0.7} />
              <circle cx="20" cy="20" r="2" fill={color} opacity={opacity * 0.7} />
              <circle cx="-20" cy="20" r="2" fill={color} opacity={opacity * 0.7} />
            </g>
          </pattern>
        );

      case 'arabesque':
        return (
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Islamic geometric arabesque pattern with interlocking lines, stars, and hexagons */}
            <g transform="translate(40,40)">
              {/* Central interlocking hexagon */}
              <path
                d="M0,-15 L13,-7.5 L13,7.5 L0,15 L-13,7.5 L-13,-7.5 Z"
                fill="none"
                stroke={color}
                strokeWidth="1"
                opacity={opacity}
              />

              {/* Interlocking stars around hexagon */}
              <g transform="rotate(30)">
                <path
                  d="M20,-10 L23,-3 L30,-3 L25,2 L28,9 L20,5 L12,9 L15,2 L10,-3 L17,-3 Z"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.8"
                  opacity={opacity * 0.8}
                />
              </g>
              <g transform="rotate(90)">
                <path
                  d="M20,-10 L23,-3 L30,-3 L25,2 L28,9 L20,5 L12,9 L15,2 L10,-3 L17,-3 Z"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.8"
                  opacity={opacity * 0.8}
                />
              </g>
              <g transform="rotate(150)">
                <path
                  d="M20,-10 L23,-3 L30,-3 L25,2 L28,9 L20,5 L12,9 L15,2 L10,-3 L17,-3 Z"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.8"
                  opacity={opacity * 0.8}
                />
              </g>

              {/* Interlocking lines connecting elements */}
              <path
                d="M0,-25 L0,-15 M13,-7.5 L20,-10 M-13,-7.5 L-20,-10 M0,15 L0,25 M13,7.5 L20,10 M-13,7.5 L-20,10"
                fill="none"
                stroke={color}
                strokeWidth="0.6"
                opacity={opacity * 0.6}
              />

              {/* Corner hexagons */}
              <g transform="translate(30,-20)">
                <path
                  d="M0,-6 L5,-3 L5,3 L0,6 L-5,3 L-5,-3 Z"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.7"
                  opacity={opacity * 0.7}
                />
              </g>
              <g transform="translate(-30,-20)">
                <path
                  d="M0,-6 L5,-3 L5,3 L0,6 L-5,3 L-5,-3 Z"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.7"
                  opacity={opacity * 0.7}
                />
              </g>
              <g transform="translate(30,20)">
                <path
                  d="M0,-6 L5,-3 L5,3 L0,6 L-5,3 L-5,-3 Z"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.7"
                  opacity={opacity * 0.7}
                />
              </g>
              <g transform="translate(-30,20)">
                <path
                  d="M0,-6 L5,-3 L5,3 L0,6 L-5,3 L-5,-3 Z"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.7"
                  opacity={opacity * 0.7}
                />
              </g>

              {/* Decorative dots at intersections */}
              <circle cx="0" cy="-15" r="1" fill={color} opacity={opacity * 0.5} />
              <circle cx="13" cy="-7.5" r="1" fill={color} opacity={opacity * 0.5} />
              <circle cx="-13" cy="-7.5" r="1" fill={color} opacity={opacity * 0.5} />
              <circle cx="0" cy="15" r="1" fill={color} opacity={opacity * 0.5} />
              <circle cx="13" cy="7.5" r="1" fill={color} opacity={opacity * 0.5} />
              <circle cx="-13" cy="7.5" r="1" fill={color} opacity={opacity * 0.5} />
            </g>
          </pattern>
        );

      case 'geometric':
      default:
        return (
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            {/* Moroccan geometric tile pattern */}
            <g transform="translate(25,25)">
              {/* Central hexagon */}
              <path
                d="M0,-12 L10,-6 L10,6 L0,12 L-10,6 L-10,-6 Z"
                fill={color}
                opacity={opacity * 0.3}
              />
              {/* Corner triangles */}
              <path
                d="M10,-6 L15,0 L10,6 Z"
                fill={color}
                opacity={opacity * 0.5}
              />
              <path
                d="M-10,-6 L-15,0 L-10,6 Z"
                fill={color}
                opacity={opacity * 0.5}
              />
              {/* Decorative dots */}
              <circle cx="0" cy="-8" r="1" fill={color} opacity={opacity * 0.7} />
              <circle cx="8" cy="0" r="1" fill={color} opacity={opacity * 0.7} />
              <circle cx="0" cy="8" r="1" fill={color} opacity={opacity * 0.7} />
              <circle cx="-8" cy="0" r="1" fill={color} opacity={opacity * 0.7} />
            </g>
          </pattern>
        );
    }
  };

  const animationVariants = animated ? respectReducedMotion({
    animate: {
      opacity: [opacity * 0.7, opacity, opacity * 0.7],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }) : {};

  return (
    <motion.div
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
          <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(40,40)">
              <path d="M0,-15 L13,-7.5 L13,7.5 L0,15 L-13,7.5 L-13,-7.5 Z" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>
              <circle cx="0" cy="-15" r="1" fill="${color}" opacity="${opacity * 0.5}"/>
              <circle cx="13" cy="-7.5" r="1" fill="${color}" opacity="${opacity * 0.5}"/>
              <circle cx="-13" cy="-7.5" r="1" fill="${color}" opacity="${opacity * 0.5}"/>
              <circle cx="0" cy="15" r="1" fill="${color}" opacity="${opacity * 0.5}"/>
              <circle cx="13" cy="7.5" r="1" fill="${color}" opacity="${opacity * 0.5}"/>
              <circle cx="-13" cy="7.5" r="1" fill="${color}" opacity="${opacity * 0.5}"/>
            </g>
          </svg>
        `)}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '80px 80px'
      }}
      {...animationVariants}
    />
  );
};

export default MoroccanPattern;