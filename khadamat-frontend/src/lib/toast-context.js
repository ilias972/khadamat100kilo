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
exports.ToastProvider = ToastProvider;
exports.useToast = useToast;
const react_1 = __importStar(require("react"));
const toast_1 = require("@/components/ui/toast");
const ToastContext = (0, react_1.createContext)(undefined);
function ToastProvider({ children }) {
    const [toasts, setToasts] = (0, react_1.useState)([]);
    const showToast = (message, type = 'info', duration = 5000) => {
        const id = Date.now().toString();
        const toast = { id, message, type, duration };
        setToasts(prev => [...prev, toast]);
    };
    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };
    const success = (message, duration = 5000) => showToast(message, 'success', duration);
    const error = (message, duration = 5000) => showToast(message, 'error', duration);
    const warning = (message, duration = 5000) => showToast(message, 'warning', duration);
    const info = (message, duration = 5000) => showToast(message, 'info', duration);
    const value = {
        showToast,
        success,
        error,
        warning,
        info,
    };
    return (<ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (<toast_1.Toast key={toast.id} message={toast.message} type={toast.type} duration={toast.duration} onClose={() => removeToast(toast.id)}/>))}
      </div>
    </ToastContext.Provider>);
}
function useToast() {
    const context = (0, react_1.useContext)(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
//# sourceMappingURL=toast-context.js.map