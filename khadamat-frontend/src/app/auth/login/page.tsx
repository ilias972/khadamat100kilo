'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('🚀 Tentative de connexion avec:', data.email);
      const result = await login(data.email, data.password);

      toast.success('Connexion réussie !');

      console.log('🔄 Redirection vers /dashboard déclenchée');

      // Redirect to dashboard based on role
      const user = result; // result is already the User object
      const dashboardPath = user?.role === 'PRO' ? '/dashboard/pro' : '/dashboard';
      router.push(dashboardPath);
    } catch (error: unknown) {
      console.error('Login error:', error);
      if (error && typeof error === 'object' && 'status' in error && (error as any).status === 401) {
        toast.error('Email ou mot de passe incorrect.');
      } else if (error && typeof error === 'object' && !('response' in error)) {
        toast.error('Erreur de connexion. Vérifiez votre connexion internet.');
      } else {
        const message = error && typeof error === 'object' && 'message' in error
          ? (error as any).message
          : 'Erreur de connexion. Veuillez réessayer.';
        toast.error(message);
      }
    }
  };

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

        {/* Login Card */}
        <Card className="p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">K</span>
            </div>
            <h1 className="text-h2 font-semibold text-text-primary mb-2">
              Bienvenue sur Khadamat
            </h1>
            <p className="text-text-secondary">
              Connectez-vous pour accéder à votre compte
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <Input
              type="email"
              label="Email"
              placeholder="votre@email.com"
              {...register('email')}
              error={errors.email?.message}
              startIcon={<Mail className="w-4 h-4" />}
              required
              data-testid="login-email-input"
            />
    
            {/* Password Input */}
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Mot de passe"
                placeholder="Votre mot de passe"
                {...register('password')}
                error={errors.password?.message}
                startIcon={<Lock className="w-4 h-4" />}
                required
                data-testid="login-password-input"
              />
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#F97B22] hover:bg-[#F97B22]/90"
              size="lg"
              disabled={isLoading}
              data-testid="login-submit-button"
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-8 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-light" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-text-muted">ou</span>
              </div>
            </div>
          </div>

          {/* Social Login (Future) */}
          <div className="space-y-3">
            <Button variant="secondary" className="w-full" disabled>
              Continuer avec Google (Bientôt disponible)
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-text-secondary">
              Pas encore de compte ?{' '}
              <Link
                href="/auth/signup"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-small text-text-muted">
          <p>
            En vous connectant, vous acceptez nos{' '}
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