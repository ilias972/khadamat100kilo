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
exports.Input = void 0;
const react_1 = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
const Input = ({ label, error, helperText, startIcon, endIcon, className, ...props }) => {
    const [focused, setFocused] = (0, react_1.useState)(false);
    return (<div className="space-y-1">
      {label && (<label className="block text-sm font-medium text-text-primary">
          {label}
        </label>)}
      <div className="relative">
        {startIcon && (<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {startIcon}
          </div>)}
        <input className={(0, utils_1.cn)('block w-full rounded-3xl border bg-surface px-3 py-2 text-text-primary placeholder-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors', startIcon && 'pl-10', endIcon && 'pr-10', error && 'border-error-500 focus:border-error-500 focus:ring-error-500', className)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...props}/>
        {endIcon && (<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {endIcon}
          </div>)}
      </div>
      {error && (<p className="text-sm text-error-500" role="alert">
          {error}
        </p>)}
      {helperText && !error && (<p className="text-sm text-text-muted">
          {helperText}
        </p>)}
    </div>);
};
exports.Input = Input;
//# sourceMappingURL=input.js.map