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
exports.ProPortfolio = void 0;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const ProPortfolio = ({ images, proName }) => {
    const [isLightboxOpen, setIsLightboxOpen] = (0, react_1.useState)(false);
    const [currentImageIndex, setCurrentImageIndex] = (0, react_1.useState)(0);
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
    };
    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };
    const goToPrevious = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
    const goToNext = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    (0, react_1.useEffect)(() => {
        const handleKeyDown = (event) => {
            if (!isLightboxOpen)
                return;
            switch (event.key) {
                case 'ArrowLeft':
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    goToNext();
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen]);
    if (!images || images.length === 0) {
        return (<div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-surface rounded-full flex items-center justify-center">
          <lucide_react_1.X className="w-8 h-8 text-text-muted"/>
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">
          Aucune réalisation disponible
        </h3>
        <p className="text-text-secondary">
          {proName} n'a pas encore ajouté de photos de ses réalisations.
        </p>
      </div>);
    }
    return (<>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 group">
        {images.map((image, index) => (<div key={index} className="aspect-[4/3] relative rounded-lg overflow-hidden bg-surface cursor-pointer hover:scale-105 transition-transform duration-200" onClick={() => openLightbox(index)}>
            <img src={image} alt={`Réalisation ${index + 1} de ${proName}`} className="w-full h-full object-cover"/>
          </div>))}
      </div>

      
      {isLightboxOpen && (<div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center" onClick={closeLightbox}>
          <div className="relative max-w-4xl max-h-full p-4">
            
            <button onClick={closeLightbox} className="absolute top-2 right-2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors">
              <lucide_react_1.X className="w-6 h-6"/>
            </button>

            
            {images.length > 1 && (<>
                <button onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                }} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors">
                  <lucide_react_1.ChevronLeft className="w-6 h-6"/>
                </button>
                <button onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                }} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors">
                  <lucide_react_1.ChevronRight className="w-6 h-6"/>
                </button>
              </>)}

            
            <img src={images[currentImageIndex]} alt={`Réalisation ${currentImageIndex + 1} de ${proName}`} className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()}/>

            
            {images.length > 1 && (<div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>)}
          </div>
        </div>)}
    </>);
};
exports.ProPortfolio = ProPortfolio;
//# sourceMappingURL=pro-portfolio.js.map