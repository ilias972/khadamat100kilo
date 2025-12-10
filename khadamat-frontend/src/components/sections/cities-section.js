'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitiesSection = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const framer_motion_1 = require("framer-motion");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const api_1 = require("@/lib/api");
const services_mocks_1 = require("@/lib/mocks/services-mocks");
const CitiesSection = ({ onCitySelect, selectedCityId }) => {
    const [cities, setCities] = react_1.default.useState([]);
    const [loading, setLoading] = react_1.default.useState(true);
    react_1.default.useEffect(() => {
        const loadCities = async () => {
            try {
                const citiesData = await api_1.api.getCities();
                setCities(citiesData.filter(city => city.isActive));
            }
            catch (err) {
                setCities(services_mocks_1.mockCities);
            }
            finally {
                setLoading(false);
            }
        };
        loadCities();
    }, []);
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
    if (loading) {
        return (<section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-surface rounded w-64 mx-auto animate-pulse mb-4"></div>
            <div className="h-4 bg-surface rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (<div key={i} className="bg-surface rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-surface-secondary"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-surface-secondary rounded"></div>
                  <div className="h-4 bg-surface-secondary rounded w-3/4"></div>
                  <div className="h-4 bg-surface-secondary rounded w-1/2"></div>
                </div>
              </div>))}
          </div>
        </div>
      </section>);
    }
    return (<section className="py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-h2 font-bold text-text-primary mb-4 font-heading">
            Services par ville
          </h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto font-body">
            Découvrez les artisans disponibles dans votre ville. Chaque destination raconte une histoire unique du Maroc.
          </p>
        </framer_motion_1.motion.div>

        
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city, index) => (<framer_motion_1.motion.div key={city.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 * index }} whileHover={{ y: -8 }} className="group">
              <card_1.Card className={`overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-0 ${city.id === selectedCityId ? 'ring-2 ring-primary-500 bg-primary-50' : ''}`}>
                
                <div className="relative h-48 overflow-hidden">
                  <img src={getCityMapImage(city.name)} alt={`Carte de ${city.name}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold font-heading mb-1">
                      {city.name}
                    </h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <lucide_react_1.MapPin className="w-4 h-4 mr-1"/>
                      <span>{city.region || 'Maroc'}</span>
                    </div>
                  </div>
                </div>

                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-text-secondary">
                      <lucide_react_1.Users className="w-4 h-4 mr-1"/>
                      <span>{Math.floor(Math.random() * 500) + 100} artisans</span>
                    </div>
                    <div className="flex items-center text-sm text-text-secondary">
                      <lucide_react_1.Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400"/>
                      <span>4.{Math.floor(Math.random() * 3) + 7}</span>
                    </div>
                  </div>

                  
                  <link_1.default href={`/services?cityId=${city.id}`}>
                    <button_1.Button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg group-hover:shadow-xl" onClick={() => onCitySelect?.(city.id)}>
                      Explorer {city.name}
                    </button_1.Button>
                  </link_1.default>
                </div>
              </card_1.Card>
            </framer_motion_1.motion.div>))}
        </framer_motion_1.motion.div>

        
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center mt-12">
          <div className="bg-gradient-to-br from-[rgba(249,123,34,0.1)] to-[rgba(249,123,34,0.05)] backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-h3 font-semibold text-text-primary mb-3 font-heading">
              Votre ville n'est pas listée ?
            </h3>
            <p className="text-body text-text-secondary mb-6 font-body">
              Nous étendons continuellement notre couverture. Contactez-nous pour ajouter votre ville.
            </p>
            <link_1.default href="/contact">
              <button_1.Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-xl px-8 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
                Nous contacter
              </button_1.Button>
            </link_1.default>
          </div>
        </framer_motion_1.motion.div>
      </div>
    </section>);
};
exports.CitiesSection = CitiesSection;
//# sourceMappingURL=cities-section.js.map