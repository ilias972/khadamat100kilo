'use client';

import React, { useState, lazy, Suspense, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Briefcase, Users } from 'lucide-react';
import { useRegister } from '@/hooks/useAuth';
import { useToast } from '@/lib/toast-context';
import { getCacheHeaders } from '@/lib/cache-strategy';

// Lazy load Input component with optimized loading
const Input = lazy(() => import('@/components/ui/input').then(module => ({ default: module.Input })));

// Memoized validation functions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+212|0)[6-7]\d{8}$/;

// Initialize caching strategy
const cacheHeaders = getCacheHeaders('static');

type UserRole = 'client' | 'pro';

interface SignupFormData {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  profession?: string;
  bio?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const registerMutation = useRegister();
  const { error: showError } = useToast();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'client',
    firstName: '',
    lastName: '',
    profession: '',
    bio: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
  };

  // Memoized validation functions for performance
  const validateStep1 = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Numéro de téléphone requis';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Format de numéro marocain invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmation du mot de passe requise';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Memoized validation functions for performance
  const validateStep2 = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Prénom requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nom requis';
    }

    if (formData.role === 'pro' && !formData.profession?.trim()) {
      newErrors.profession = 'Profession requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    const signupData = {
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role.toUpperCase() as 'CLIENT' | 'PRO',
      firstName: formData.firstName,
      lastName: formData.lastName,
      profession: formData.role === 'pro' ? formData.profession : undefined,
      bio: formData.role === 'pro' ? formData.bio : undefined,
    };

    try {
      const response = await registerMutation.mutateAsync(signupData);

      // ✅ Stocker les tokens correctement
      localStorage.setItem('khadamat_access_token', response.access_token);
      localStorage.setItem('khadamat_refresh_token', response.refresh_token);

      // ✅ Redirection EXPLICITE avec vérification
      if (formData.role === 'pro') {
        router.push('/dashboard/pro');
      } else {
        router.push('/dashboard/client');
      }

      // ✅ Attendre la navigation complète
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error: unknown) {
      console.error('Signup error:', error);
      if (error && typeof error === 'object' && 'status' in error && (error as any).status === 409) {
        showError('Un compte avec cet email ou numéro de téléphone existe déjà.');
      } else if (error && typeof error === 'object' && 'status' in error && (error as any).status === 0) {
        showError('Erreur de connexion. Vérifiez votre connexion internet.');
      } else {
        const message = error && typeof error === 'object' && 'message' in error
          ? (error as any).message
          : 'Erreur lors de l\'inscription. Veuillez réessayer.';
        showError(message);
      }
    }
  };

  // Memoized form components to prevent unnecessary re-renders
  const FormStep1 = useMemo(() => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary text-center mb-4">
        Informations de connexion
      </h3>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Je suis...
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleRoleSelect('client')}
            className={`p-4 border rounded-lg text-center transition-all ${
              formData.role === 'client'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-border-light bg-surface text-text-primary hover:border-primary-300'
            }`}
            data-testid="register-role-client-button"
          >
            <Users className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Client</div>
            <div className="text-xs text-text-muted mt-1">
              Je cherche des services
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('pro')}
            className={`p-4 border rounded-lg text-center transition-all ${
              formData.role === 'pro'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-border-light bg-surface text-text-primary hover:border-primary-300'
            }`}
            data-testid="register-role-provider-button"
          >
            <Briefcase className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Professionnel</div>
            <div className="text-xs text-text-muted mt-1">
              Je propose des services
            </div>
          </button>
        </div>
      </div>

      {/* Email */}
      <Suspense fallback={<div className="h-14 bg-surface rounded-lg animate-pulse" />}>
        <Input
          type="email"
          label="Email"
          placeholder="votre@email.com"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
          startIcon={<Mail className="w-4 h-4" />}
          required
          data-testid="register-email-input"
        />
      </Suspense>

      {/* Phone */}
      <Suspense fallback={<div className="h-14 bg-surface rounded-lg animate-pulse" />}>
        <Input
          type="tel"
          label="Numéro de téléphone"
          placeholder="+212XXXXXXXXX"
          value={formData.phone}
          onChange={handleInputChange('phone')}
          error={errors.phone}
          startIcon={<Phone className="w-4 h-4" />}
          required
          data-testid="register-phone-input"
        />
      </Suspense>

      {/* Password */}
      <div className="relative">
        <Suspense fallback={<div className="h-14 bg-surface rounded-lg animate-pulse" />}>
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Mot de passe"
            placeholder="Au moins 8 caractères"
            value={formData.password}
            onChange={handleInputChange('password')}
            error={errors.password}
            startIcon={<Lock className="w-4 h-4" />}
            required
            data-testid="register-password-input"
          />
        </Suspense>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-text-muted hover:text-text-primary transition-colors"
          aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Suspense fallback={<div className="h-14 bg-surface rounded-lg animate-pulse" />}>
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirmer le mot de passe"
            placeholder="Répétez votre mot de passe"
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            error={errors.confirmPassword}
            startIcon={<Lock className="w-4 h-4" />}
            required
            data-testid="register-password-confirm-input"
          />
        </Suspense>
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-text-muted hover:text-text-primary transition-colors"
          aria-label={showConfirmPassword ? 'Masquer la confirmation' : 'Afficher la confirmation'}
        >
          {showConfirmPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Continuer
      </Button>
    </div>
  ), [formData, errors, showPassword, showConfirmPassword]);

  const FormStep2 = useMemo(() => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-text-primary text-center mb-4">
        Informations personnelles
      </h3>

      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-3">
        <Suspense fallback={<div className="h-14 bg-surface rounded-lg animate-pulse" />}>
          <Input
            type="text"
            label="Prénom"
            placeholder="Votre prénom"
            value={formData.firstName}
            onChange={handleInputChange('firstName')}
            error={errors.firstName}
            startIcon={<User className="w-4 h-4" />}
            required
            data-testid="register-firstname-input"
          />
        </Suspense>
        <Suspense fallback={<div className="h-14 bg-surface rounded-lg animate-pulse" />}>
          <Input
            type="text"
            label="Nom"
            placeholder="Votre nom"
            value={formData.lastName}
            onChange={handleInputChange('lastName')}
            error={errors.lastName}
            required
            data-testid="register-lastname-input"
          />
        </Suspense>
      </div>

      {/* Profession (Pro only) */}
      {formData.role === 'pro' && (
        <Suspense fallback={<div className="h-14 bg-surface rounded-lg animate-pulse" />}>
          <Input
            type="text"
            label="Profession"
            placeholder="Ex: Plombier, Électricien..."
            value={formData.profession}
            onChange={handleInputChange('profession')}
            error={errors.profession}
            startIcon={<Briefcase className="w-4 h-4" />}
            required
            data-testid="register-profession-input"
          />
        </Suspense>
      )}

      {/* Bio (Pro only) */}
      {formData.role === 'pro' && (
        <div className="space-y-1">
          <label className="block text-sm font-medium text-text-primary">
            Biographie (optionnel)
          </label>
          <textarea
            placeholder="Décrivez brièvement votre expérience et vos spécialités..."
            value={formData.bio}
            onChange={handleInputChange('bio')}
            className="block w-full rounded-lg border border-border-light bg-surface px-3 py-2 text-text-primary placeholder-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
            rows={3}
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={handleBack}
          className="flex-1"
        >
          Retour
        </Button>
        <Button
          type="submit"
          className="flex-1"
          size="lg"
          disabled={registerMutation.isPending}
          data-testid="register-submit-button"
        >
          {registerMutation.isPending ? 'Inscription...' : 'Créer mon compte'}
        </Button>
      </div>
    </div>
  ), [formData, errors, registerMutation.isPending]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-text-muted hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>

        {/* Signup Card */}
        <Card className="p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">K</span>
            </div>
            <h1 className="text-h2 font-semibold text-text-primary mb-2">
              Rejoignez Khadamat
            </h1>
            <p className="text-text-secondary">
              Créez votre compte en quelques étapes
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-primary-500 text-white' : 'bg-surface text-text-muted'
              }`}>
                1
              </div>
              <div className={`w-12 h-0.5 mx-2 ${
                currentStep >= 2 ? 'bg-primary-500' : 'bg-border-light'
              }`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-primary-500 text-white' : 'bg-surface text-text-muted'
              }`}>
                2
              </div>
            </div>
          </div>

          {/* Error Message */}
          {(errors.general || registerMutation.error) && (
            <div className="mb-6 p-4 bg-error-50 border border-error-200 rounded-lg">
              <p className="text-error-600 text-sm">
                {errors.general || (registerMutation.error && typeof registerMutation.error === 'object' && 'message' in registerMutation.error ? (registerMutation.error as { message: string }).message : 'Une erreur est survenue')}
              </p>
            </div>
          )}

          <form onSubmit={currentStep === 1 ? (e) => { e.preventDefault(); handleNext(); } : handleSubmit}>
            {currentStep === 1 ? FormStep1 : FormStep2}
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-text-secondary">
              Déjà un compte ?{' '}
              <Link
                href="/auth/login"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-small text-text-muted">
          <p>
            En vous inscrivant, vous acceptez nos{' '}
            <Link href="/terms" className="text-primary-600 hover:text-primary-700">
              Conditions d'utilisation
            </Link>{' '}
            et notre{' '}
            <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}