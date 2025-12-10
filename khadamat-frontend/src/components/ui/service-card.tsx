'use client';

import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { microInteractions, entranceAnimations } from '@/lib/animations';

// Icon mapping for categories (PNG files)
const iconMap: Record<string, string> = {
  'plomberie': '/plomberieICONE.png',
  'électricité': '/electricitéICONE.png',
  'ménage': '/menageICONE.png',
  'peinture': '/peintureICONE.png',
  'jardinage': '/jardinageICONE.png',
  'déménagement': '/demenagementICONE.png',
  'maçonnerie': '/maconnerieICONE.png',
  'photographie': '/photographieICONE.png',
  'default': '/plomberieICONE.png',
};

// Color mapping for categories
const colorMap: Record<string, string> = {
  'plomberie': 'text-primary-500',
  'électricité': 'text-secondary-500',
  'ménage': 'text-success-500',
  'peinture': 'text-warning-500',
  'jardinage': 'text-emerald-500',
  'maçonnerie': 'text-gray-600',
  'déménagement': 'text-blue-500',
  'photographie': 'text-purple-500',
  'default': 'text-primary-500',
};

interface ServiceCardProps {
  category: any;
  index: number;
  isSelected?: boolean;
  cityId?: string;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  category,
  index,
  isSelected = false,
  cityId,
  className
}) => {
  const router = useRouter();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D tilt effect based on mouse position
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const iconSrc = iconMap[category.name.toLowerCase()] || iconMap.default;
  const colorClass = colorMap[category.name.toLowerCase()] || colorMap.default;

  const handleClick = () => {
    const params = new URLSearchParams();
    params.set('category', category.id);
    if (cityId) params.set('cityId', cityId);
    router.push(`/pros?${params.toString()}`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      whileHover={{ y: -8 }}
      className={`group cursor-pointer ${isSelected ? 'ring-2 ring-primary-500 ring-offset-2' : ''} ${className}`}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      data-testid="service-card"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <Card
          className="relative overflow-hidden h-full"
          interactive
          premium
          glow={isSelected}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-500/10 opacity-0 group-hover:opacity-100"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Floating particles effect */}
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-primary-500/30 rounded-full opacity-0 group-hover:opacity-100"
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          <motion.div
            className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary-500/40 rounded-full opacity-0 group-hover:opacity-100"
            animate={{
              y: [0, 8, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-6 flex flex-col items-center justify-center space-y-4 text-center">

            {/* Icon with premium animations */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Glow effect behind icon */}
              <motion.div
                className="absolute inset-0 bg-primary-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 ${isSelected ? 'shadow-primary-500/30' : ''}`}
                whileHover={{
                  boxShadow: "0 20px 40px rgba(249, 123, 34, 0.15)"
                }}
              >
                <motion.img
                  src={iconSrc}
                  alt={`${category.name} icon`}
                  className={`w-12 h-12 object-cover ${colorClass} group-hover:scale-110 transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Title with premium typography */}
            <motion.h3
              className={`text-lg font-bold text-text-primary group-hover:text-primary-600 transition-colors duration-300 ${isSelected ? 'text-primary-600' : ''}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {category.name}
            </motion.h3>

            {/* Description */}
            {category.description && (
              <motion.p
                className="text-sm text-text-secondary line-clamp-2 leading-relaxed"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {category.description}
              </motion.p>
            )}

            {/* Selection badge */}
            {isSelected && (
              <motion.div
                className="px-3 py-1 bg-primary-500/10 border border-primary-500/20 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <span className="text-xs font-medium text-primary-600">Sélectionné</span>
              </motion.div>
            )}

            {/* Hover indicator */}
            <motion.div
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary-500/30 rounded-full opacity-0 group-hover:opacity-100"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

// Grid component with staggered animations
interface ServiceCardGridProps {
  categories: any[];
  selectedCategoryId?: string;
  cityId?: string;
  className?: string;
}

export const ServiceCardGrid: React.FC<ServiceCardGridProps> = ({
  categories,
  selectedCategoryId,
  cityId,
  className
}) => {
  return (
    <motion.div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 ${className}`}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
      initial="hidden"
      animate="show"
    >
      {categories.map((category, index) => (
        <ServiceCard
          key={category.id}
          category={category}
          index={index}
          isSelected={selectedCategoryId === category.id}
          cityId={cityId}
        />
      ))}
    </motion.div>
  );
};