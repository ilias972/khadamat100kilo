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
exports.LanguageToggle = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
const LanguageToggle = () => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [currentLanguage, setCurrentLanguage] = (0, react_1.useState)('fr');
    const languages = [
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'ar', label: 'العربية', flag: '🇸🇦' }
    ];
    const handleLanguageChange = (languageCode) => {
        setCurrentLanguage(languageCode);
        setIsOpen(false);
    };
    return (<div className="relative">
      
      <framer_motion_1.motion.button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary hover:bg-orange-50 hover:text-primary-600 rounded-lg transition-all duration-200" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} aria-label="Changer de langue">
        <lucide_react_1.Globe className="w-4 h-4"/>
        <span className="uppercase tracking-wide">
          {currentLanguage === 'fr' ? 'FR' : 'AR'}
        </span>
      </framer_motion_1.motion.button>

      
      <framer_motion_1.AnimatePresence>
        {isOpen && (<>
            
            <framer_motion_1.motion.div className="fixed inset-0 z-40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)}/>

            
            <framer_motion_1.motion.div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50" initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.15, ease: "easeOut" }}>
              {languages.map((language) => (<button key={language.code} onClick={() => handleLanguageChange(language.code)} className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center gap-3">
                    <span className="text-base">{language.flag}</span>
                    <span className={language.code === 'ar' ? 'font-arabic' : ''}>
                      {language.label}
                    </span>
                  </div>
                  {currentLanguage === language.code && (<lucide_react_1.Check className="w-4 h-4 text-primary-600"/>)}
                </button>))}
            </framer_motion_1.motion.div>
          </>)}
      </framer_motion_1.AnimatePresence>
    </div>);
};
exports.LanguageToggle = LanguageToggle;
//# sourceMappingURL=language-toggle.js.map