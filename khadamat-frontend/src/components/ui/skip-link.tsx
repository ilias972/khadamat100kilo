'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ href, children, className, style }) => {
  return (
    <motion.a
      href={href}
      className={`skip-link ${className || ''}`}
      style={style}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onFocus={(e) => {
        // Ensure the link is visible when focused
        e.currentTarget.style.top = '6px';
      }}
      onBlur={(e) => {
        // Hide the link when not focused
        e.currentTarget.style.top = '-40px';
      }}
    >
      {children}
    </motion.a>
  );
};

// SkipLinks component for common navigation targets
interface SkipLinksProps {
  targets?: Array<{
    href: string;
    label: string;
  }>;
}

export const SkipLinks: React.FC<SkipLinksProps> = ({
  targets = [
    { href: '#main-content', label: 'Aller au contenu principal' },
    { href: '#navigation', label: 'Aller à la navigation' },
    { href: '#search', label: 'Aller à la recherche' }
  ]
}) => {
  return (
    <>
      {targets.map((target, index) => (
        <SkipLink
          key={target.href}
          href={target.href}
          style={{
            top: '-40px',
            left: '6px',
            transform: `translateY(${index * 4}px)`
          }}
        >
          {target.label}
        </SkipLink>
      ))}
    </>
  );
};