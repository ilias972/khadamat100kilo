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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedProfessionals = void 0;
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const api_1 = require("@/lib/api");
const FeaturedProfessionals = () => {
    const router = (0, navigation_1.useRouter)();
    const [professionals, setProfessionals] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
    const [currentIndex, setCurrentIndex] = (0, react_1.useState)(0);
    const [isAutoScrolling, setIsAutoScrolling] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchProfessionals = async () => {
            try {
                const response = await api_1.api.getPros({
                    rating: 4.5,
                    isVerified: true,
                    limit: 10
                });
                setProfessionals(response.professionals.slice(0, 6));
                setError(false);
            }
            catch (error) {
                console.error('Failed to load professionals:', error);
                setError(true);
                setProfessionals([
                    {
                        id: '1',
                        name: 'Ahmed Bennani',
                        profession: 'Plombier',
                        rating: 4.9,
                        reviewCount: 127,
                        city: 'Casablanca',
                        isVerified: true,
                        completedJobs: 89,
                    },
                    {
                        id: '2',
                        name: 'Fatima Alaoui',
                        profession: 'Femme de ménage',
                        rating: 4.8,
                        reviewCount: 95,
                        city: 'Rabat',
                        isVerified: true,
                        completedJobs: 156,
                    },
                    {
                        id: '3',
                        name: 'Youssef Tazi',
                        profession: 'Électricien',
                        rating: 4.7,
                        reviewCount: 73,
                        city: 'Marrakech',
                        isVerified: true,
                        completedJobs: 64,
                    },
                ]);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProfessionals();
    }, []);
    const itemsPerView = 3;
    const maxIndex = Math.max(0, professionals.length - itemsPerView);
    (0, react_1.useEffect)(() => {
        if (!isAutoScrolling || professionals.length <= itemsPerView)
            return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % (professionals.length - itemsPerView + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [professionals.length, isAutoScrolling, itemsPerView]);
    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };
    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };
    const visibleProfessionals = professionals.slice(currentIndex, currentIndex + itemsPerView);
    if (loading) {
        return (<section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">
              Artisans recommandés
            </h2>
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              Découvrez nos professionnels les mieux notés et les plus actifs.
              Tous vérifiés et assurés pour votre tranquillité d'esprit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (<card_1.Card key={i} className="p-6 animate-pulse">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-surface rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-surface rounded w-24"></div>
                      <div className="h-3 bg-surface rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-surface rounded w-full"></div>
                    <div className="h-4 bg-surface rounded w-3/4"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-surface rounded w-16"></div>
                    <div className="h-8 bg-surface rounded w-20"></div>
                  </div>
                </div>
              </card_1.Card>))}
          </div>
        </div>
      </section>);
    }
    const EmptyState = ({ title, description, icon: Icon, ctaText, ctaLink }) => (<div className="text-center py-12">
      <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-12 h-12 text-primary-600"/>
      </div>
      <h3 className="text-h3 font-semibold text-text-primary mb-3">{title}</h3>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">{description}</p>
      <link_1.default href={ctaLink}>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-3xl transition-colors">
          {ctaText}
        </button>
      </link_1.default>
    </div>);
    return (<section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-semibold text-text-primary mb-4">
            Profils Stars - Nos Super-Héros du Quotidien
          </h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Découvrez nos professionnels d'exception, sélectionnés pour leur excellence.
            Tous vérifiés et assurés pour votre tranquillité d'esprit.
          </p>
        </div>

          {professionals.length === 0 ? (<EmptyState title="Pas encore d'artisans mis en avant" description="Nous préparons une sélection d'artisans premium pour votre région. Découvrez tous nos professionnels disponibles." icon={lucide_react_1.Users} ctaText="Voir tous les artisans" ctaLink="/pros"/>) : (<div className="relative" onMouseEnter={() => setIsAutoScrolling(false)} onMouseLeave={() => setIsAutoScrolling(true)}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 transition-all duration-500 ease-in-out">
                {visibleProfessionals.map((pro, index) => (<div key={pro.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group overflow-hidden" onClick={() => router.push(`/pros/${pro.id}`)}>
                    
                    <div className="h-20 bg-orange-100 relative" style={{
                    backgroundImage: `url('/arabesque-pattern.svg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.15
                }}>
                      <div className="absolute inset-0 bg-orange-100"></div>
                    </div>

                    <div className="px-6 pb-6">
                      
                      <div className="flex justify-center -mt-10 mb-6">
                        <div className="relative">
                          <img src={`https://images.unsplash.com/photo-${1500000000 + index * 100000}?w=160&h=160&fit=crop&crop=face&auto=format&q=80`} alt={`Portrait de ${pro.name}`} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"/>
                          
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                            <lucide_react_1.Crown className="w-4 h-4 text-white"/>
                          </div>
                        </div>
                      </div>

                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {pro.name}
                          </h3>
                          {pro.isVerified && (<lucide_react_1.Shield className="w-5 h-5 text-green-500 ml-2"/>)}
                        </div>

                        <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-2">
                          {pro.profession}
                        </p>

                        
                        <div className="flex items-center justify-center text-xs text-gray-400 mb-4">
                          <lucide_react_1.MapPin className="w-3 h-3 mr-1"/>
                          <span>{pro.city}</span>
                        </div>

                        
                        <div className="border-b border-gray-200 mb-6"></div>

                        
                        <div className="grid grid-cols-3 gap-0 divide-x divide-gray-200 mb-6">
                          <div className="text-center px-2">
                            <div className="text-2xl font-bold text-gray-900">{pro.rating}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Note</div>
                          </div>
                          <div className="text-center px-2">
                            <div className="text-2xl font-bold text-gray-900">{pro.reviewCount}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Avis</div>
                          </div>
                          <div className="text-center px-2">
                            <div className="text-2xl font-bold text-gray-900">{pro.completedJobs}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide">Missions</div>
                          </div>
                        </div>

                        
                        <button className="w-full py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                          Contacter ce Pro
                        </button>
                      </div>
                    </div>
                  </div>))}
              </div>

              
              <div className="flex items-center justify-center space-x-4">
                <button onClick={prevSlide} disabled={currentIndex === 0} className="p-2 rounded-full bg-surface hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Previous professionals">
                  <lucide_react_1.ChevronLeft className="w-5 h-5"/>
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: Math.ceil(professionals.length / itemsPerView) }, (_, i) => (<button key={i} onClick={() => setCurrentIndex(i * itemsPerView)} className={`w-2 h-2 rounded-full transition-colors ${Math.floor(currentIndex / itemsPerView) === i
                    ? 'bg-primary-500'
                    : 'bg-border-medium'}`} aria-label={`Go to slide ${i + 1}`}/>))}
                </div>

                <button onClick={nextSlide} disabled={currentIndex >= maxIndex} className="p-2 rounded-full bg-surface hover:bg-surface/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" aria-label="Next professionals">
                  <lucide_react_1.ChevronRight className="w-5 h-5"/>
                </button>
              </div>

              <div className="text-center mt-12">
                <link_1.default href="/pros">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-3xl transition-colors">
                    Voir tous les artisans
                    <lucide_react_1.ChevronRight className="w-4 h-4"/>
                  </button>
                </link_1.default>
              </div>
            </div>)}
      </div>
    </section>);
};
exports.FeaturedProfessionals = FeaturedProfessionals;
//# sourceMappingURL=featured-professionals.js.map