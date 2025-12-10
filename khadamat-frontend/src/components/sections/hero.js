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
exports.Hero = void 0;
const react_1 = __importStar(require("react"));
const navigation_1 = require("next/navigation");
const framer_motion_1 = require("framer-motion");
const toast_1 = require("@/components/ui/toast");
const moroccan_pattern_1 = require("@/components/motion/moroccan-pattern");
const lucide_react_1 = require("lucide-react");
const api_1 = require("@/lib/api");
const framer_motion_2 = require("framer-motion");
const Hero = () => {
    const router = (0, navigation_1.useRouter)();
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [locationQuery, setLocationQuery] = (0, react_1.useState)('');
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [cities, setCities] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
    const [toast, setToast] = (0, react_1.useState)(null);
    const shouldReduceMotion = (0, framer_motion_2.useReducedMotion)();
    const heroRef = (0, react_1.useRef)(null);
    const { scrollY } = (0, framer_motion_1.useScroll)();
    const parallaxY1 = (0, framer_motion_1.useTransform)(scrollY, shouldReduceMotion ? [0, 0] : [0, 1000], shouldReduceMotion ? [0, 0] : [0, -100]);
    (0, react_1.useEffect)(() => {
        const loadData = async () => {
            try {
                const [categoriesData, citiesData] = await Promise.all([
                    api_1.api.getCategories(),
                    api_1.api.getCities()
                ]);
                setCategories(categoriesData.filter(cat => cat.isActive));
                setCities(citiesData.filter(city => city.isActive));
                setError(false);
            }
            catch (error) {
                console.error('Failed to load search data:', error);
                setError(true);
                setCategories([
                    { id: '1', name: 'Plomberie', isActive: true, slug: 'plomberie' },
                    { id: '2', name: 'Électricité', isActive: true, slug: 'electricite' },
                    { id: '3', name: 'Ménage', isActive: true, slug: 'menage' },
                    { id: '4', name: 'Peinture', isActive: true, slug: 'peinture' },
                ]);
                setCities([
                    { id: '1', name: 'Casablanca', isActive: true },
                    { id: '2', name: 'Rabat', isActive: true },
                    { id: '3', name: 'Marrakech', isActive: true },
                ]);
            }
            finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setToast({ message: 'Veuillez sélectionner un service', type: 'error' });
            return;
        }
        if (!locationQuery.trim()) {
            setToast({ message: 'Veuillez sélectionner une ville', type: 'error' });
            return;
        }
        try {
            const category = categories.find(cat => cat.id === searchQuery);
            const term = category ? category.name : searchQuery;
            router.push(`/search?search=${encodeURIComponent(term)}`);
        }
        catch (error) {
            console.error('Navigation error:', error);
            setToast({ message: 'Une erreur est survenue lors de la navigation. Veuillez réessayer.', type: 'error' });
        }
    };
    return (<section ref={heroRef} className="relative min-h-[85vh] overflow-hidden animate-fade-in" role="banner">

      
      <div className="absolute inset-0">
        
        <div className="absolute inset-0 opacity-20">
          <moroccan_pattern_1.MoroccanPattern patternType="arabesque" opacity={0.15} animated={false} color="#F97B22" className="w-full h-full"/>
        </div>

        
        <div className="absolute inset-0 bg-radial-gradient from-white via-white/80 to-transparent"></div>
      </div>

      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        <framer_motion_1.motion.div className="hero-parallax-1 absolute top-10 right-20" style={{ y: parallaxY1 }}>
          <moroccan_pattern_1.MoroccanPattern patternType="arabesque" opacity={0.08} animated={false} color="#F97B22" className="w-[200px] h-[200px]"/>
        </framer_motion_1.motion.div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 lg:pt-24 pb-40">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh]">
          
          <div className="max-w-[640px] mx-auto lg:mx-0">
            
            <h1 className="text-6xl font-bold text-gray-900 leading-tight tracking-tight font-heading text-left mb-8">
              Trouvez un artisan de confiance, près de chez vous.
              <span className="block text-xl font-medium text-orange-700 mt-4 font-arabic" dir="rtl">
                ابحث عن حرفي موثوق به قرب منزلك
              </span>
            </h1>
            <p className="text-body text-text-secondary leading-relaxed font-body text-left mb-8">
              Plombiers, électriciens, femmes de ménage, peintres et bien plus…
              Des professionnels certifiés, locaux et évalués par des clients vérifiés.
            </p>

            
            <div className="mb-8 lg:mb-12">
              <form onSubmit={handleSearch} role="search" aria-label="Rechercher un service">
                
                <div className="block md:hidden space-y-3">
                  <div className="relative">
                    <lucide_react_1.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted"/>
                    <select value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} disabled={loading} className="w-full pl-12 pr-4 py-4 bg-white border-0 rounded-2xl text-text-primary text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200 disabled:opacity-50 shadow-lg" aria-label="Service recherché" required>
                      <option value="">
                        {loading ? 'Chargement...' : error ? 'Erreur de chargement' : 'Quel service ?'}
                      </option>
                      {categories.map((category) => (<option key={category.id} value={category.id}>
                          {category.name}
                        </option>))}
                    </select>
                  </div>
                  <div className="relative">
                    <lucide_react_1.MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted"/>
                    <select value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} disabled={loading} className="w-full pl-12 pr-4 py-4 bg-white border-0 rounded-2xl text-text-primary text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200 disabled:opacity-50 shadow-lg" aria-label="Ville de recherche" required>
                      <option value="">
                        {loading ? 'Chargement...' : error ? 'Erreur de chargement' : 'Quelle ville ?'}
                      </option>
                      {cities.map((city) => (<option key={city.id} value={city.id}>
                          {city.name}
                        </option>))}
                    </select>
                  </div>
                  <button type="submit" disabled={loading || error} className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-2xl font-bold transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed" aria-label="Lancer la recherche">
                    <lucide_react_1.Search className="w-5 h-5 inline mr-2"/>
                    {loading ? 'Chargement...' : 'Chercher'}
                  </button>
                </div>

                
                <div className="hidden md:flex items-center bg-white shadow-2xl shadow-orange-500/10 rounded-full p-2 max-w-4xl">
                  
                  <div className="w-[45%] relative group">
                    <lucide_react_1.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary-500 transition-colors"/>
                    <select value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} disabled={loading} className="w-full pl-12 pr-4 py-4 bg-transparent border-0 text-text-primary text-base font-medium focus:outline-none focus:ring-0 transition-all duration-200 disabled:opacity-50" aria-label="Service recherché" required>
                      <option value="">
                        {loading ? 'Chargement...' : error ? 'Erreur de chargement' : 'Quel service ?'}
                      </option>
                      {categories.map((category) => (<option key={category.id} value={category.id}>
                          {category.name}
                        </option>))}
                    </select>
                  </div>

                  
                  <div className="w-px h-8 bg-gray-200 mx-2"></div>

                  
                  <div className="w-[40%] relative group">
                    <lucide_react_1.MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary-500 transition-colors"/>
                    <select value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} disabled={loading} className="w-full pl-12 pr-4 py-4 bg-transparent border-0 text-text-primary text-base font-medium focus:outline-none focus:ring-0 transition-all duration-200 disabled:opacity-50" aria-label="Ville de recherche" required>
                      <option value="">
                        {loading ? 'Chargement...' : error ? 'Erreur de chargement' : 'Quelle ville ?'}
                      </option>
                      {cities.map((city) => (<option key={city.id} value={city.id}>
                          {city.name}
                        </option>))}
                    </select>
                  </div>

                  
                  <button type="submit" disabled={loading || error} className="w-[15%] flex items-center justify-center py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-full font-bold transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:hover:shadow-none relative overflow-hidden" aria-label="Lancer la recherche">
                    <lucide_react_1.Search className="w-5 h-5"/>
                  </button>
                </div>
                {error && (<p className="text-sm text-error-500 mt-2 text-center">
                    Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.
                  </p>)}
              </form>
            </div>

            
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <lucide_react_1.Users className="w-6 h-6 text-blue-600"/>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">+1800</div>
                    <div className="text-sm text-gray-600">Clients satisfaits</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <lucide_react_1.Shield className="w-6 h-6 text-green-600"/>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">+450</div>
                    <div className="text-sm text-gray-600">Professionnels vérifiés</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <lucide_react_1.Star className="w-6 h-6 text-yellow-600 fill-current"/>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.8</div>
                    <div className="text-sm text-gray-600">Note moyenne</div>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <lucide_react_1.Clock className="w-6 h-6 text-orange-600"/>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">30 min</div>
                    <div className="text-sm text-gray-600">Réponse moyenne</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="relative flex justify-center lg:justify-end p-6 lg:p-8 lg:overflow-visible">
            
            <div className="absolute inset-0 pointer-events-none">
              
              <framer_motion_1.motion.div className="absolute top-4 left-4 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-lg z-10" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <lucide_react_1.Shield className="w-6 h-6 text-orange-600"/>
              </framer_motion_1.motion.div>

              
              <framer_motion_1.motion.div className="absolute top-1/2 -left-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow-lg z-10" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <lucide_react_1.CheckCircle className="w-8 h-8 text-blue-600"/>
              </framer_motion_1.motion.div>

              
              <framer_motion_1.motion.div className="absolute bottom-10 left-4 w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shadow-lg z-10" animate={{ x: [0, 5, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                <lucide_react_1.Clock className="w-7 h-7 text-green-600"/>
              </framer_motion_1.motion.div>
            </div>

            
            <div className="relative z-0 lg:translate-x-8">
              <img src="/illustrationHOME.png" alt="Illustration de l'accueil Khadamat - Trouvez un artisan de confiance" className="w-[90%] sm:w-[100%] max-w-[600px] h-auto object-contain drop-shadow-2xl" loading="eager"/>
            </div>
          </div>
        </div>

      </div>

      {toast && (<toast_1.Toast message={toast.message} type={toast.type} onClose={() => setToast(null)}/>)}
    </section>);
};
exports.Hero = Hero;
//# sourceMappingURL=hero.js.map