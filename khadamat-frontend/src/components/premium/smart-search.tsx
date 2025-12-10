'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { entranceAnimations, microInteractions } from '@/lib/animations';
import {
  Search,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  Users,
  Calendar,
  Filter,
  X,
  ChevronRight,
  Sparkles,
  Loader2
} from 'lucide-react';

export interface SearchResult {
  id: string;
  type: 'service' | 'professional' | 'location' | 'category';
  title: string;
  subtitle?: string;
  image?: string;
  rating?: number;
  price?: number;
  distance?: number;
  availability?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

interface SmartSearchProps {
  placeholder?: string;
  onSearch?: (query: string, filters: SearchFilters) => void;
  onResultSelect?: (result: SearchResult) => void;
  recentSearches?: string[];
  popularSearches?: string[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'premium' | 'minimal';
}

export interface SearchFilters {
  location?: string;
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  availability?: string;
  distance?: number;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
  placeholder = "Rechercher un service, un professionnel...",
  onSearch,
  onResultSelect,
  recentSearches = [],
  popularSearches = [],
  className,
  size = 'md',
  variant = 'default'
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock search results - in real app, this would come from API
  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'service',
      title: 'Plomberie d\'urgence',
      subtitle: 'Service disponible 24/7',
      rating: 4.8,
      price: 150,
      distance: 2.3,
      availability: 'Disponible maintenant',
      tags: ['urgence', 'plomberie']
    },
    {
      id: '2',
      type: 'professional',
      title: 'Ahmed Bennani',
      subtitle: 'Plombier certifié',
      image: '/api/placeholder/40/40',
      rating: 4.9,
      price: 80,
      distance: 1.5,
      availability: 'Libre demain',
      tags: ['certifié', 'expérimenté']
    },
    {
      id: '3',
      type: 'category',
      title: 'Électricité',
      subtitle: '12 professionnels disponibles',
      tags: ['électricité', 'dépannage']
    }
  ];

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));

      const filteredResults = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
        result.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      setResults(filteredResults);
      setIsLoading(false);
      setSelectedIndex(-1);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultSelect(results[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [isOpen, results, selectedIndex]);

  const handleResultSelect = (result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    setSelectedIndex(-1);
    onResultSelect?.(result);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query, filters);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-6 text-lg'
  };

  const variantClasses = {
    default: 'border-border-light focus:ring-primary-500',
    premium: 'border-primary-200 focus:ring-primary-500 bg-gradient-to-r from-white to-primary-50/30',
    minimal: 'border-transparent focus:ring-primary-500 bg-gray-50'
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {/* Search Input */}
      <div className="relative">
        <motion.div
          className={cn(
            'relative flex items-center rounded-2xl border bg-white transition-all duration-200',
            'focus-within:ring-2 focus-within:ring-offset-2',
            sizeClasses[size],
            variantClasses[variant]
          )}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {/* Search Icon */}
          <motion.div
            className="flex items-center justify-center w-5 h-5 ml-3 text-gray-400"
            animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.5, repeat: isLoading ? Infinity : 0, ease: "linear" }}
          >
            {isLoading ? <Loader2 className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </motion.div>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-0 outline-none placeholder-gray-400 text-gray-900"
          />

          {/* Actions */}
          <div className="flex items-center space-x-2 mr-3">
            {query && (
              <motion.button
                onClick={clearSearch}
                className="flex items-center justify-center w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}

            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center justify-center w-5 h-5 transition-colors',
                showFilters ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Filter className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Premium glow effect */}
        {variant === 'premium' && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/10 to-primary-600/10 opacity-0"
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: 'none' }}
          />
        )}
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 p-4 bg-white rounded-xl border border-gray-200 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Localisation
                </label>
                <input
                  type="text"
                  placeholder="Ville, quartier..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={filters.location || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              {/* Category filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={filters.category || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Toutes les catégories</option>
                  <option value="plomberie">Plomberie</option>
                  <option value="electricite">Électricité</option>
                  <option value="menage">Ménage</option>
                </select>
              </div>

              {/* Rating filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note minimum
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={filters.rating || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) || undefined }))}
                >
                  <option value="">Toutes les notes</option>
                  <option value="4.5">4.5+ étoiles</option>
                  <option value="4">4+ étoiles</option>
                  <option value="3">3+ étoiles</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Dropdown */}
      <AnimatePresence>
        {isOpen && (query || results.length > 0 || recentSearches.length > 0 || popularSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-xl z-50 max-h-96 overflow-hidden"
          >
            {/* Search Results */}
            {results.length > 0 && (
              <div className="max-h-80 overflow-y-auto">
                {results.map((result, index) => (
                  <motion.div
                    key={result.id}
                    className={cn(
                      'flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors',
                      selectedIndex === index && 'bg-primary-50'
                    )}
                    onClick={() => handleResultSelect(result)}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    {/* Result Icon/Type Indicator */}
                    <div className="flex-shrink-0 w-10 h-10 mr-3">
                      {result.type === 'professional' && result.image ? (
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center',
                          result.type === 'service' && 'bg-blue-100 text-blue-600',
                          result.type === 'professional' && 'bg-green-100 text-green-600',
                          result.type === 'category' && 'bg-purple-100 text-purple-600',
                          result.type === 'location' && 'bg-orange-100 text-orange-600'
                        )}>
                          {result.type === 'service' && <Sparkles className="w-5 h-5" />}
                          {result.type === 'professional' && <Users className="w-5 h-5" />}
                          {result.type === 'category' && <TrendingUp className="w-5 h-5" />}
                          {result.type === 'location' && <MapPin className="w-5 h-5" />}
                        </div>
                      )}
                    </div>

                    {/* Result Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </h4>
                        {result.rating && (
                          <div className="flex items-center ml-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 ml-1">
                              {result.rating}
                            </span>
                          </div>
                        )}
                      </div>

                      {result.subtitle && (
                        <p className="text-sm text-gray-500 truncate">
                          {result.subtitle}
                        </p>
                      )}

                      {/* Metadata */}
                      <div className="flex items-center space-x-3 mt-1">
                        {result.price && (
                          <span className="text-sm font-medium text-primary-600">
                            {result.price} DH
                          </span>
                        )}
                        {result.distance && (
                          <span className="text-xs text-gray-400 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {result.distance} km
                          </span>
                        )}
                        {result.availability && (
                          <span className="text-xs text-green-600 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {result.availability}
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-gray-400 ml-3 flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {query === '' && recentSearches.length > 0 && (
              <div className="border-t border-gray-100">
                <div className="px-4 py-2">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Recherches récentes
                  </h4>
                </div>
                {recentSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    className="w-full flex items-center px-4 py-2 hover:bg-gray-50 text-left"
                    onClick={() => setQuery(search)}
                    whileHover={{ x: 4 }}
                  >
                    <Clock className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-700">{search}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {query === '' && popularSearches.length > 0 && (
              <div className="border-t border-gray-100">
                <div className="px-4 py-2">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Tendances
                  </h4>
                </div>
                <div className="px-4 pb-3">
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                        onClick={() => setQuery(search)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {query && !isLoading && results.length === 0 && (
              <div className="px-4 py-8 text-center">
                <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Aucun résultat pour "{query}"
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Essayez avec des termes différents
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};