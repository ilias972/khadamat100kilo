'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

// Memoized ErrorBoundary to prevent unnecessary re-renders
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);

    // In production, send to error monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry, LogRocket, etc.
      // captureException(error, { extra: errorInfo });
    }
  }

  // Memoize resetError to prevent recreation
  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  // Optimize shouldComponentUpdate to prevent unnecessary re-renders
  shouldComponentUpdate(nextProps: ErrorBoundaryProps, nextState: ErrorBoundaryState) {
    // Only re-render if error state changes or children change
    return (
      this.state.hasError !== nextState.hasError ||
      this.props.children !== nextProps.children
    );
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      // Memoize the default fallback to prevent recreation
      return (
        <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />
      );
    }

    return this.props.children;
  }
}

// Memoized DefaultErrorFallback component
const DefaultErrorFallback: React.FC<{ error?: Error; resetError: () => void }> = React.memo(({
  error,
  resetError,
}) => {
  // Memoize error details to prevent recalculation
  const errorDetails = React.useMemo(() => {
    if (!error) return null;
    return `${error.message}\n\n${error.stack || ''}`;
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-error-600" />
        </div>

        <h1 className="text-h2 font-bold text-text-primary mb-4">
          Oups ! Une erreur est survenue
        </h1>

        <p className="text-text-secondary mb-6">
          Nous nous excusons pour la gêne occasionnée. Notre équipe a été notifiée et travaille à résoudre le problème.
        </p>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-text-primary mb-2">
              Détails de l'erreur (développement)
            </summary>
            <pre className="text-xs bg-surface p-3 rounded border overflow-auto max-h-32">
              {errorDetails}
            </pre>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={resetError} className="flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
          <Button variant="secondary" onClick={() => window.location.href = '/'}>
            Retour à l'accueil
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-border-light">
          <p className="text-small text-text-muted">
            Si le problème persiste, contactez notre{' '}
            <a href="mailto:support@khadamat.ma" className="text-primary-600 hover:text-primary-700">
              support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
});

// Error handler hook for functional components
export const useErrorHandler = () => {
  const handler = React.useCallback((error: Error, errorInfo?: { componentStack?: string }) => {
    console.error('Error handled by hook:', error, errorInfo);

    // In production, send to error monitoring
    if (process.env.NODE_ENV === 'production') {
      // captureException(error, { extra: errorInfo });
    }

    // Could trigger a toast notification or global error state
  }, []);

  return handler;
};