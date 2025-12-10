'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GlassContainer } from '@/components/ui/glass-container';
import { entranceAnimations, microInteractions } from '@/lib/animations';
import {
  Sparkles,
  TrendingUp,
  Clock,
  Star,
  MapPin,
  ChevronRight,
  X
} from 'lucide-react';

interface ServiceSuggestion {
  id: string;
  name: string;
  category: string;
  reason: string;
  confidence: number; // 0-1
  estimatedPrice: number;
  estimatedDuration: string;
  popularity: number;
  icon: string;
}

interface ServiceSuggestionsProps {
  userId?: string;
  location?: string;
  maxSuggestions?: number;
  className?: string;
}

export const ServiceSuggestions: React.FC<ServiceSuggestionsProps> = ({
  userId,
  location = 'Casablanca',
  maxSuggestions = 3,
  className
}) => {
  const [suggestions, setSuggestions] = useState<ServiceSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set());

  // Mock suggestions based on user behavior
  useEffect(() => {
    const generateSuggestions = () => {
      const mockSuggestions: ServiceSuggestion[] = [
        {
          id: '1',
          name: 'Nettoyage complet',
          category: 'ménage',
          reason: 'Basé sur vos réservations précédentes',
          confidence: 0.85,
          estimatedPrice: 250,
          estimatedDuration: '3h',
          popularity: 92,
          icon: '/menageICONE.png'
        },
        {
          id: '2',
          name: 'Réparation électrique',
          category: 'électricité',
          reason: 'Service populaire dans votre quartier',
          confidence: 0.72,
          estimatedPrice: 180,
          estimatedDuration: '2h',
          popularity: 88,
          icon: '/electricitéICONE.png'
        },
        {
          id: '3',
          name: 'Jardinage saisonnier',
          category: 'jardinage',
          reason: 'Saison idéale pour ce service',
          confidence: 0.68,
          estimatedPrice: 320,
          estimatedDuration: '4h',
          popularity: 76,
          icon: '/jardinageICONE.png'
        }
      ];

      setSuggestions(mockSuggestions.slice(0, maxSuggestions));
      setLoading(false);
    };

    // Simulate API call
    setTimeout(generateSuggestions, 1000);
  }, [userId, location, maxSuggestions]);

  const handleDismiss = (suggestionId: string) => {
    setDismissedSuggestions(prev => new Set([...prev, suggestionId]));
  };

  const visibleSuggestions = suggestions.filter(s => !dismissedSuggestions.has(s.id));

  if (loading) {
    return (
      <GlassContainer className={`p-6 ${className}`} animated>
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 text-primary-600" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-text-primary">Suggestions personnalisées</h3>
            <p className="text-sm text-text-secondary">Analyse de vos besoins...</p>
          </div>
        </div>

        <div className="space-y-3">
          {[...Array(maxSuggestions)].map((_, i) => (
            <motion.div
              key={i}
              className="h-16 bg-surface/50 rounded-lg animate-pulse"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
      </GlassContainer>
    );
  }

  if (visibleSuggestions.length === 0) {
    return null;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassContainer className="p-6" animated>
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="font-bold text-lg text-text-primary">Suggestions pour vous</h3>
              <p className="text-sm text-text-secondary">Services adaptés à vos besoins</p>
            </div>
          </div>

          <motion.div
            className="flex items-center space-x-1 text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
          >
            <TrendingUp className="w-3 h-3" />
            <span className="font-medium">IA</span>
          </motion.div>
        </motion.div>

        {/* Suggestions */}
        <AnimatePresence>
          <motion.div
            className="space-y-3"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {visibleSuggestions.map((suggestion, index) => (
              <SuggestionCard
                key={suggestion.id}
                suggestion={suggestion}
                index={index}
                onDismiss={handleDismiss}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all link */}
        {visibleSuggestions.length >= 2 && (
          <motion.div
            className="mt-4 pt-4 border-t border-border-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link href="/services">
              <Button
                variant="ghost"
                className="w-full text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Voir tous les services
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        )}
      </GlassContainer>
    </motion.div>
  );
};

// Individual suggestion card component
interface SuggestionCardProps {
  suggestion: ServiceSuggestion;
  index: number;
  onDismiss: (id: string) => void;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  suggestion,
  index,
  onDismiss
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{
        opacity: 0,
        x: 20,
        scale: 0.95,
        transition: { duration: 0.3 }
      }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="relative overflow-hidden cursor-pointer group">
        {/* Background gradient animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-primary-500/5"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Dismiss button */}
        <motion.button
          className="absolute top-2 right-2 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onDismiss(suggestion.id);
          }}
        >
          <X className="w-3 h-3 text-text-secondary" />
        </motion.button>

        <div className="p-4">
          <div className="flex items-start space-x-3">
            {/* Service icon */}
            <motion.div
              className="relative flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center shadow-sm">
                <img
                  src={suggestion.icon}
                  alt={suggestion.name}
                  className="w-7 h-7 object-cover"
                />
              </div>

              {/* Confidence indicator */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-success-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 500 }}
              >
                {Math.round(suggestion.confidence * 100)}
              </motion.div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <motion.h4
                className="font-semibold text-text-primary truncate"
                whileHover={{ scale: 1.02 }}
              >
                {suggestion.name}
              </motion.h4>

              <p className="text-sm text-text-secondary mb-2">
                {suggestion.reason}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{suggestion.estimatedDuration}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-warning-500 fill-current" />
                    <span>{suggestion.popularity}%</span>
                  </div>
                </div>

                <motion.div
                  className="font-bold text-primary-600"
                  whileHover={{ scale: 1.05 }}
                >
                  {suggestion.estimatedPrice} DH
                </motion.div>
              </div>
            </div>
          </div>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 scale-x-0 group-hover:scale-x-100"
            transition={{ duration: 0.3 }}
          />
        </div>
      </Card>
    </motion.div>
  );
};