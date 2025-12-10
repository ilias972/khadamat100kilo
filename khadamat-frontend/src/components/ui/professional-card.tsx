'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { microInteractions, entranceAnimations } from '@/lib/animations';
import { Star, MapPin, Clock, Award, MessageCircle, Heart } from 'lucide-react';

interface Professional {
  id: string;
  fullName: string;
  title: string;
  rating: number;
  reviewCount: number;
  location: string;
  avatar?: string;
  verified: boolean;
  completedJobs: number;
  responseTime: string;
  startingPrice?: number;
  badges?: string[];
  isFavorite?: boolean;
  distance?: string;
}

interface ProfessionalCardProps {
  professional: Professional;
  index: number;
  variant?: 'default' | 'compact' | 'featured';
  showActions?: boolean;
  className?: string;
  onFavoriteToggle?: (id: string) => void;
  onMessage?: (id: string) => void;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  index,
  variant = 'default',
  showActions = true,
  className,
  onFavoriteToggle,
  onMessage
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: i * 0.1, type: "spring", stiffness: 500 }}
      >
        <Star
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? 'text-warning-500 fill-current'
              : 'text-border-medium'
          }`}
        />
      </motion.div>
    ));
  };

  const cardVariants = {
    default: 'p-6',
    compact: 'p-4',
    featured: 'p-8 border-2 border-primary-200'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      whileHover={{ y: -6 }}
      className={className}
    >
      <Card
        className={`relative overflow-hidden h-full ${cardVariants[variant]}`}
        interactive
        premium={variant === 'featured'}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-full opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.8 }}
        />

        {/* Floating badge for verified professionals */}
        {professional.verified && (
          <motion.div
            className="absolute top-3 right-3 z-20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
          >
            <div className="w-8 h-8 bg-success-500 rounded-full flex items-center justify-center shadow-lg">
              <Award className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        )}

        {/* Favorite button */}
        {showActions && (
          <motion.button
            className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              onFavoriteToggle?.(professional.id);
            }}
          >
            <motion.div
              animate={{ scale: professional.isFavorite ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <Heart
                className={`w-4 h-4 ${
                  professional.isFavorite
                    ? 'text-error-500 fill-current'
                    : 'text-text-secondary'
                }`}
              />
            </motion.div>
          </motion.button>
        )}

        {/* Main content */}
        <div className="relative z-10">
          {/* Header with avatar and basic info */}
          <div className="flex items-start space-x-4 mb-4">
            <motion.div
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {professional.avatar ? (
                <img
                  src={professional.avatar}
                  alt={professional.fullName}
                  className="w-16 h-16 rounded-2xl object-cover shadow-md"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">
                    {getInitials(professional.fullName)}
                  </span>
                </div>
              )}

              {/* Online indicator */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 border-2 border-white rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="flex-1 min-w-0">
              <motion.h3
                className="font-bold text-lg text-text-primary truncate"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {professional.fullName}
              </motion.h3>

              <p className="text-primary-600 font-medium text-sm truncate">
                {professional.title}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center space-x-1">
                  {renderStars(professional.rating)}
                </div>
                <motion.span
                  className="text-sm font-medium text-text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {professional.rating}
                </motion.span>
                <span className="text-sm text-text-secondary">
                  ({professional.reviewCount})
                </span>
              </div>
            </div>
          </div>

          {/* Location and stats */}
          <div className="space-y-3 mb-4">
            <motion.div
              className="flex items-center text-sm text-text-secondary"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <MapPin className="w-4 h-4 mr-2 text-primary-500" />
              <span className="truncate">
                {professional.location}
                {professional.distance && (
                  <span className="text-primary-600 font-medium ml-1">
                    • {professional.distance}
                  </span>
                )}
              </span>
            </motion.div>

            <motion.div
              className="flex items-center justify-between text-sm"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center text-text-secondary">
                <Clock className="w-4 h-4 mr-2 text-success-500" />
                <span>{professional.responseTime}</span>
              </div>

              <motion.div
                className="text-right"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-xs text-text-secondary">À partir de</div>
                <div className="font-bold text-primary-600">
                  {professional.startingPrice} DH
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Actions */}
          {showActions && (
            <motion.div
              className="flex space-x-2"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.preventDefault();
                  // Navigate to booking
                }}
              >
                Réserver
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  onMessage?.(professional.id);
                }}
                className="px-3"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 scale-x-0 group-hover:scale-x-100"
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};