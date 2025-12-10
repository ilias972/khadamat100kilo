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
exports.SearchBar = void 0;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const SearchBar = ({ value, onChange, placeholder = 'Rechercher...', className = '', }) => {
    const [localValue, setLocalValue] = (0, react_1.useState)(value);
    const handleSubmit = (e) => {
        e.preventDefault();
        onChange(localValue);
    };
    const handleClear = () => {
        setLocalValue('');
        onChange('');
    };
    const handleChange = (e) => {
        setLocalValue(e.target.value);
    };
    return (<div className={`relative ${className}`}>
      <div className="relative">
        <input type="text" value={localValue} onChange={handleChange} placeholder={placeholder} className="w-full pl-12 pr-12 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-[#F97B22]/30 transition-all duration-200 shadow-inner"/>
        <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted"/>
        {localValue && (<button type="button" onClick={handleClear} className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[#F97B22]/10 rounded-full transition-colors" aria-label="Effacer la recherche">
            <lucide_react_1.X className="w-4 h-4 text-text-muted"/>
          </button>)}
      </div>
    </div>);
};
exports.SearchBar = SearchBar;
//# sourceMappingURL=search-bar.js.map