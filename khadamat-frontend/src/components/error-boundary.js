'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useErrorHandler = exports.ErrorBoundary = void 0;
const react_1 = __importDefault(require("react"));
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
class ErrorBoundary extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        if (process.env.NODE_ENV === 'production') {
        }
    }
    resetError = () => {
        this.setState({ hasError: false, error: undefined });
    };
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback;
                return <FallbackComponent error={this.state.error} resetError={this.resetError}/>;
            }
            return <DefaultErrorFallback error={this.state.error} resetError={this.resetError}/>;
        }
        return this.props.children;
    }
}
exports.ErrorBoundary = ErrorBoundary;
const DefaultErrorFallback = ({ error, resetError, }) => {
    return (<div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <lucide_react_1.AlertTriangle className="w-8 h-8 text-error-600"/>
        </div>

        <h1 className="text-h2 font-bold text-text-primary mb-4">
          Oups ! Une erreur est survenue
        </h1>

        <p className="text-text-secondary mb-6">
          Nous nous excusons pour la gêne occasionnée. Notre équipe a été notifiée et travaille à résoudre le problème.
        </p>

        {process.env.NODE_ENV === 'development' && error && (<details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-text-primary mb-2">
              Détails de l'erreur (développement)
            </summary>
            <pre className="text-xs bg-surface p-3 rounded border overflow-auto max-h-32">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>)}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button_1.Button onClick={resetError} className="flex items-center">
            <lucide_react_1.RefreshCw className="w-4 h-4 mr-2"/>
            Réessayer
          </button_1.Button>
          <button_1.Button variant="secondary" onClick={() => window.location.href = '/'}>
            Retour à l'accueil
          </button_1.Button>
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
    </div>);
};
const useErrorHandler = () => {
    return (error, errorInfo) => {
        console.error('Error handled by hook:', error, errorInfo);
        if (process.env.NODE_ENV === 'production') {
        }
    };
};
exports.useErrorHandler = useErrorHandler;
//# sourceMappingURL=error-boundary.js.map