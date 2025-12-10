'use client';

import { useMemo } from 'react';

// Cache for validation results to avoid redundant computations
const validationCache = new Map<string, boolean>();

/**
 * Memoized email validation with caching
 */
export const validateEmail = (email: string): boolean => {
  const cacheKey = `email:${email}`;

  if (validationCache.has(cacheKey)) {
    return validationCache.get(cacheKey)!;
  }

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  validationCache.set(cacheKey, isValid);
  return isValid;
};

/**
 * Memoized phone validation with caching
 */
export const validatePhone = (phone: string): boolean => {
  const cacheKey = `phone:${phone}`;

  if (validationCache.has(cacheKey)) {
    return validationCache.get(cacheKey)!;
  }

  const isValid = /^(\+212|0)[6-7]\d{8}$/.test(phone.replace(/\s/g, ''));
  validationCache.set(cacheKey, isValid);
  return isValid;
};

/**
 * Memoized password validation with caching
 */
export const validatePassword = (password: string): boolean => {
  const cacheKey = `password:${password}`;

  if (validationCache.has(cacheKey)) {
    return validationCache.get(cacheKey)!;
  }

  const isValid = password.length >= 8;
  validationCache.set(cacheKey, isValid);
  return isValid;
};

/**
 * Memoized password confirmation validation with caching
 */
export const validatePasswordConfirmation = (password: string, confirmPassword: string): boolean => {
  const cacheKey = `confirm:${password}:${confirmPassword}`;

  if (validationCache.has(cacheKey)) {
    return validationCache.get(cacheKey)!;
  }

  const isValid = password === confirmPassword;
  validationCache.set(cacheKey, isValid);
  return isValid;
};

/**
 * Clear validation cache - useful when form resets
 */
export const clearValidationCache = () => {
  validationCache.clear();
};

/**
 * Hook for cached validation
 */
export const useCachedValidation = () => {
  return useMemo(() => ({
    validateEmail,
    validatePhone,
    validatePassword,
    validatePasswordConfirmation,
    clearValidationCache
  }), []);
};