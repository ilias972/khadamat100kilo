'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, MessageSquare } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'page' | 'component' | 'section';
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

export class EnhancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorInfo: null,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console and external service
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error,
      errorInfo
    });
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // In production, you would send this to your error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry, LogRocket, etc.
      // this.reportError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI based on level
      return this.getErrorUI();
    }

    return this.props.children;
  }

  private getErrorUI() {
    const { level = 'component' } = this.props;
    const { error, errorId, errorInfo } = this.state;
    const showDetails = this.props.showDetails || process.env.NODE_ENV === 'development';

    const baseClasses = "bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-8 text-center max-w-lg mx-auto";
    
    if (level === 'page') {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className={baseClasses}>
            {/* Error Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-text-primary mb-4 font-heading">
              Oups ! Une erreur s'est produite
            </h1>
            
            <p className="text-text-secondary mb-6 leading-relaxed">
              Nous nous excusons pour ce désagrément. Notre équipe a été automatiquement notifiée 
              et travaille à résoudre le problème.
            </p>

            {/* Error ID for support */}
            <div className="bg-[#EDEEEF] rounded-lg p-3 mb-6">
              <p className="text-xs text-text-muted mb-1">ID de référence</p>
              <code className="text-sm font-mono text-text-secondary">{errorId}</code>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={this.handleRetry}
                className="flex-1 bg-[#F97B22] hover:bg-[#e66a1f] text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Réessayer
              </Button>
              
              <Button 
                variant="outline" 
                onClick={this.handleReload}
                className="flex-1 border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10"
              >
                Recharger la page
              </Button>
            </div>

            <div className="mt-4">
              <Button 
                variant="ghost" 
                onClick={this.handleGoHome}
                className="text-text-secondary hover:text-text-primary"
              >
                <Home className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </div>

            {/* Error Details (Development/Show Details Mode) */}
            {showDetails && error && (
              <details className="mt-6 text-left">
                <summary className="text-sm text-text-muted cursor-pointer hover:text-text-secondary">
                  Détails techniques
                </summary>
                <div className="mt-3 p-4 bg-[#EDEEEF] rounded-lg">
                  <p className="text-sm font-medium text-text-primary mb-2">Message d'erreur:</p>
                  <p className="text-sm text-text-secondary mb-4">{error.message}</p>
                  
                  {error.stack && (
                    <>
                      <p className="text-sm font-medium text-text-primary mb-2">Stack trace:</p>
                      <pre className="text-xs text-text-muted overflow-auto max-h-32 whitespace-pre-wrap">
                        {error.stack}
                      </pre>
                    </>
                  )}
                  
                  {errorInfo && (
                    <>
                      <p className="text-sm font-medium text-text-primary mb-2 mt-4">Component Stack:</p>
                      <pre className="text-xs text-text-muted overflow-auto max-h-32 whitespace-pre-wrap">
                        {errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    // Component or Section level error UI
    return (
      <div className={baseClasses}>
        <div className="flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
          <span className="text-sm font-medium text-text-primary">
            {level === 'section' ? 'Section indisponible' : 'Composant indisponible'}
          </span>
        </div>
        
        <p className="text-sm text-text-secondary mb-4">
          {level === 'section' 
            ? 'Cette section ne peut pas être affichée pour le moment.'
            : 'Ce composant a rencontré une erreur.'
          }
        </p>

        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={this.handleRetry}
            className="bg-[#F97B22] hover:bg-[#e66a1f] text-white"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Réessayer
          </Button>
          
          {showDetails && (
            <details className="inline-block">
              <summary className="text-xs text-text-muted cursor-pointer hover:text-text-secondary">
                Détails
              </summary>
              {error && (
                <div className="mt-2 p-2 bg-[#EDEEEF] rounded text-xs text-text-muted">
                  {error.message}
                </div>
              )}
            </details>
          )}
        </div>
      </div>
    );
  }
}

// HOC for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <EnhancedErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </EnhancedErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// Hook for manual error reporting
export function useErrorHandler() {
  return React.useCallback((error: Error, errorInfo?: string) => {
    console.error('Manual error report:', error, errorInfo);
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: { errorInfo } });
    }
  }, []);
}