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
exports.ServicesByCity = void 0;
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const glass_container_1 = require("@/components/ui/glass-container");
const api_1 = require("@/lib/api");
const ServicesByCity = () => {
    const [cities, setCities] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const getCityMapImage = (cityName) => {
        const imageMap = {
            'Oujda': '/oujdaMAP.jpeg',
            'Agadir': '/agadirMAP.jpeg',
            'Casablanca': '/casablancaMAP.jpeg',
            'Rabat': '/rabatMAP.jpeg',
            'Marrakech': '/marrakechMAP.jpeg',
            'Fès': '/fesMAP.jpeg',
            'Meknès': '/meknesMAP.jpeg',
            'Tanger': '/tangerMAP.jpeg',
        };
        return imageMap[cityName] || '/casablancaMAP.jpeg';
    };
    (0, react_1.useEffect)(() => {
        const loadCities = async () => {
            try {
                const data = await api_1.api.getCities();
                const citiesWithImages = data
                    .filter(city => city.isActive)
                    .map(city => ({
                    ...city,
                    imageSrc: getCityMapImage(city.name)
                }));
                setCities(citiesWithImages);
            }
            catch (error) {
                console.error('Failed to load cities:', error);
                setCities([
                    { id: 'casablanca', name: 'Casablanca', isActive: true, imageSrc: '/casablancaMAP.jpeg' },
                    { id: 'rabat', name: 'Rabat', isActive: true, imageSrc: '/rabatMAP.jpeg' },
                    { id: 'marrakech', name: 'Marrakech', isActive: true, imageSrc: '/marrakechMAP.jpeg' },
                    { id: 'fes', name: 'Fès', isActive: true, imageSrc: '/fesMAP.jpeg' },
                    { id: 'tanger', name: 'Tanger', isActive: true, imageSrc: '/tangerMAP.jpeg' },
                    { id: 'agadir', name: 'Agadir', isActive: true, imageSrc: '/agadirMAP.jpeg' },
                    { id: 'meknes', name: 'Meknès', isActive: true, imageSrc: '/meknesMAP.jpeg' },
                    { id: 'oujda', name: 'Oujda', isActive: true, imageSrc: '/oujdaMAP.jpeg' },
                ]);
            }
            finally {
                setLoading(false);
            }
        };
        loadCities();
    }, []);
    if (loading) {
        return (<section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <glass_container_1.GlassContainer>
            <div className="text-center mb-16">
              <div className="h-8 bg-surface rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-surface rounded w-96 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (<div key={i} className="p-6 bg-white rounded-3xl animate-pulse">
                  <div className="w-12 h-12 bg-surface rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-surface rounded w-24 mx-auto mb-2"></div>
                  <div className="h-4 bg-surface rounded w-16 mx-auto"></div>
                </div>))}
            </div>
          </glass_container_1.GlassContainer>
        </div>
      </section>);
    }
    return (<section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <glass_container_1.GlassContainer>
          <div className="text-center mb-16">
            <h2 className="text-h2 font-semibold text-text-primary mb-4">
              Services par ville
            </h2>
            <p className="text-body text-text-secondary max-w-2xl mx-auto">
              Trouvez des artisans qualifiés dans votre ville. Des milliers de professionnels
              vous attendent partout au Maroc.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {cities.map((city) => (<link_1.default key={city.id} href={`/pros?cityId=${city.id}`} className="group block">
                <div className="relative h-64 rounded-3xl overflow-hidden cursor-pointer ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-white/20">
                  
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{
                backgroundImage: `url(${city.imageSrc || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center'})`,
                imageRendering: 'auto',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}/>

                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>

                  
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                    
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <lucide_react_1.MapPin className="w-6 h-6 text-gray-700"/>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                      {city.name}
                    </h3>
                    <p className="text-sm text-gray-200 drop-shadow-md">
                      Services disponibles
                    </p>
                  </div>
                </div>
              </link_1.default>))}
          </div>

          <div className="text-center">
            <link_1.default href="/services">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-3xl transition-colors">
                Voir toutes les villes
                <lucide_react_1.ArrowRight className="w-4 h-4"/>
              </button>
            </link_1.default>
          </div>
        </glass_container_1.GlassContainer>
      </div>
    </section>);
};
exports.ServicesByCity = ServicesByCity;
//# sourceMappingURL=services-by-city.js.map