'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedErrorBoundary = void 0;
exports.withErrorBoundary = withErrorBoundary;
exports.useErrorHandler = useErrorHandler;
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
class EnhancedErrorBoundary extends react_1.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            errorId: ''
        };
    }
    static getDerivedStateFromError(error) {
        const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        return {
            hasError: true,
            error,
            errorInfo: null,
            errorId
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Error Boundary caught an error:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
        if (process.env.NODE_ENV === 'production') {
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
            if (this.props.fallback) {
                return this.props.fallback;
            }
            return this.getErrorUI();
        }
        return this.props.children;
    }
    getErrorUI() {
        const { level = 'component' } = this.props;
        const { error, errorId, errorInfo } = this.state;
        const showDetails = this.props.showDetails || process.env.NODE_ENV === 'development';
        const baseClasses = "bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-8 text-center max-w-lg mx-auto";
        if (level === 'page') {
            return (<div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className={baseClasses}>
            
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <lucide_react_1.AlertTriangle className="w-8 h-8 text-red-500"/>
            </div>

            
            <h1 className="text-2xl font-bold text-text-primary mb-4 font-heading">
              Oups ! Une erreur s'est produite
            </h1>
            
            <p className="text-text-secondary mb-6 leading-relaxed">
              Nous nous excusons pour ce désagrément. Notre équipe a été automatiquement notifiée 
              et travaille à résoudre le problème.
            </p>

            
            <div className="bg-[#EDEEEF] rounded-lg p-3 mb-6">
              <p className="text-xs text-text-muted mb-1">ID de référence</p>
              <code className="text-sm font-mono text-text-secondary">{errorId}</code>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3">
              <button_1.Button onClick={this.handleRetry} className="flex-1 bg-[#F97B22] hover:bg-[#e66a1f] text-white">
                <lucide_react_1.RefreshCw className="w-4 h-4 mr-2"/>
                Réessayer
              </button_1.Button>
              
              <button_1.Button variant="outline" onClick={this.handleReload} className="flex-1 border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10">
                Recharger la page
              </button_1.Button>
            </div>

            <div className="mt-4">
              <button_1.Button variant="ghost" onClick={this.handleGoHome} className="text-text-secondary hover:text-text-primary">
                <lucide_react_1.Home className="w-4 h-4 mr-2"/>
                Retour à l'accueil
              </button_1.Button>
            </div>

            
            {showDetails && error && (<details className="mt-6 text-left">
                <summary className="text-sm text-text-muted cursor-pointer hover:text-text-secondary">
                  Détails techniques
                </summary>
                <div className="mt-3 p-4 bg-[#EDEEEF] rounded-lg">
                  <p className="text-sm font-medium text-text-primary mb-2">Message d'erreur:</p>
                  <p className="text-sm text-text-secondary mb-4">{error.message}</p>
                  
                  {error.stack && (<>
                      <p className="text-sm font-medium text-text-primary mb-2">Stack trace:</p>
                      <pre className="text-xs text-text-muted overflow-auto max-h-32 whitespace-pre-wrap">
                        {error.stack}
                      </pre>
                    </>)}
                  
                  {errorInfo && (<>
                      <p className="text-sm font-medium text-text-primary mb-2 mt-4">Component Stack:</p>
                      <pre className="text-xs text-text-muted overflow-auto max-h-32 whitespace-pre-wrap">
                        {errorInfo.componentStack}
                      </pre>
                    </>)}
                </div>
              </details>)}
          </div>
        </div>);
        }
        return (<div className={baseClasses}>
        <div className="flex items-center justify-center mb-4">
          <lucide_react_1.AlertTriangle className="w-6 h-6 text-red-500 mr-2"/>
          <span className="text-sm font-medium text-text-primary">
            {level === 'section' ? 'Section indisponible' : 'Composant indisponible'}
          </span>
        </div>
        
        <p className="text-sm text-text-secondary mb-4">
          {level === 'section'
                ? 'Cette section ne peut pas être affichée pour le moment.'
                : 'Ce composant a rencontré une erreur.'}
        </p>

        <div className="flex gap-2">
          <button_1.Button size="sm" onClick={this.handleRetry} className="bg-[#F97B22] hover:bg-[#e66a1f] text-white">
            <lucide_react_1.RefreshCw className="w-3 h-3 mr-1"/>
            Réessayer
          </button_1.Button>
          
          {showDetails && (<details className="inline-block">
              <summary className="text-xs text-text-muted cursor-pointer hover:text-text-secondary">
                Détails
              </summary>
              {error && (<div className="mt-2 p-2 bg-[#EDEEEF] rounded text-xs text-text-muted">
                  {error.message}
                </div>)}
            </details>)}
        </div>
      </div>);
    }
}
exports.EnhancedErrorBoundary = EnhancedErrorBoundary;
function withErrorBoundary(Component, errorBoundaryProps) {
    const WrappedComponent = (props) => (<EnhancedErrorBoundary {...errorBoundaryProps}>
      <Component {...props}/>
    </EnhancedErrorBoundary>);
    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
    return WrappedComponent;
}
function useErrorHandler() {
    return react_1.default.useCallback((error, errorInfo) => {
        console.error('Manual error report:', error, errorInfo);
        if (process.env.NODE_ENV === 'production') {
        }
    }, []);
}
//# sourceMappingURL=error-boundary-enhanced.js.map