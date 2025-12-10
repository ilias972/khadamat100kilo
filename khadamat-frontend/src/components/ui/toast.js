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
exports.Toast = void 0;
const react_1 = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
    const [visible, setVisible] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setVisible(false);
                onClose?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);
    if (!visible)
        return null;
    const typeClasses = {
        success: 'bg-success-500 text-white',
        error: 'bg-error-500 text-white',
        warning: 'bg-warning-500 text-white',
        info: 'bg-primary-500 text-white',
    };
    return (<div className={(0, utils_1.cn)('fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg max-w-sm animate-fade-in', typeClasses[type])} role="alert" aria-live="assertive">
      <span className="flex-1">{message}</span>
      {onClose && (<button onClick={() => {
                setVisible(false);
                onClose();
            }} className="ml-4 text-current opacity-75 hover:opacity-100 transition-opacity" aria-label="Close notification">
          ✕
        </button>)}
    </div>);
};
exports.Toast = Toast;
//# sourceMappingURL=toast.js.map