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
exports.LoadingCard = exports.LoadingSkeleton = exports.Loading = void 0;
const react_1 = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
const Loading = ({ size = 'md', text, className, fullScreen = false, }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };
    const spinner = (<div className={(0, utils_1.cn)('flex flex-col items-center justify-center space-y-4', className)}>
      <div className={(0, utils_1.cn)('animate-spin rounded-full border-2 border-primary-200 border-t-primary-600', sizeClasses[size])} role="status" aria-label="Chargement">
        <span className="sr-only">Chargement...</span>
      </div>
      {text && (<p className="text-sm text-text-secondary animate-pulse">
          {text}
        </p>)}
    </div>);
    if (fullScreen) {
        return (<div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>);
    }
    return spinner;
};
exports.Loading = Loading;
const LoadingSkeleton = ({ className, lines = 3 }) => {
    const widths = (0, react_1.useMemo)(() => Array.from({ length: lines }, () => Math.random() * 40 + 60), [lines]);
    return (<div className={(0, utils_1.cn)('space-y-3', className)}>
      {widths.map((width, i) => (<div key={i} className="h-4 bg-surface rounded animate-pulse" style={{
                width: `${width}%`,
                animationDelay: `${i * 0.1}s`,
            }}/>))}
    </div>);
};
exports.LoadingSkeleton = LoadingSkeleton;
const LoadingCard = ({ className }) => {
    return (<div className={(0, utils_1.cn)('p-6 border border-border-light rounded-lg', className)}>
      <div className="animate-pulse space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-surface rounded-full"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-surface rounded w-3/4"></div>
            <div className="h-3 bg-surface rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-surface rounded"></div>
          <div className="h-3 bg-surface rounded w-5/6"></div>
        </div>
      </div>
    </div>);
};
exports.LoadingCard = LoadingCard;
//# sourceMappingURL=loading.js.map