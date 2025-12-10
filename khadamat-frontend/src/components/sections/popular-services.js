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
exports.PopularServices = void 0;
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const framer_motion_1 = require("framer-motion");
const glass_container_1 = require("@/components/ui/glass-container");
const lucide_react_1 = require("lucide-react");
const api_1 = require("@/lib/api");
const gsap_1 = require("gsap");
const ScrollTrigger_1 = require("gsap/ScrollTrigger");
gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
const iconMap = {
    'plomberie': '/plomberieICONE.png',
    'électricité': '/electricitéICONE.png',
    'ménage': '/menageICONE.png',
    'peinture': '/peintureICONE.png',
    'jardinage': '/jardinageICONE.png',
    'maçonnerie': '/maconnerieICONE.png',
    'photographie': '/photographieICONE.png',
    'déménagement': '/demenagementICONE.png',
    'default': '/plomberieICONE.png',
};
const colorMap = {
    'plomberie': 'text-primary-500',
    'électricité': 'text-secondary-500',
    'ménage': 'text-success-500',
    'peinture': 'text-warning-500',
    'jardinage': 'text-emerald-500',
    'maçonnerie': 'text-gray-600',
    'default': 'text-primary-500',
};
const PopularServices = () => {
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
    const sectionRef = (0, react_1.useRef)(null);
    const { scrollY } = (0, framer_motion_1.useScroll)();
    const parallaxY1 = (0, framer_motion_1.useTransform)(scrollY, [0, 1000], [0, -80]);
    const parallaxY2 = (0, framer_motion_1.useTransform)(scrollY, [0, 1000], [0, -40]);
    const parallaxY3 = (0, framer_motion_1.useTransform)(scrollY, [0, 1000], [0, -120]);
    const mockCategories = [
        { id: '1', name: 'Plomberie', description: 'Réparations et installations de plomberie', icon: 'Wrench', isActive: true },
        { id: '2', name: 'Électricité', description: 'Travaux électriques et installations', icon: 'Zap', isActive: true },
        { id: '3', name: 'Ménage', description: 'Services de nettoyage et entretien', icon: 'Home', isActive: true },
        { id: '4', name: 'Peinture', description: 'Peinture intérieure et extérieure', icon: 'Palette', isActive: true },
        { id: '5', name: 'Jardinage', description: 'Entretien d\'espaces verts', icon: 'Scissors', isActive: true },
        { id: '6', name: 'Maçonnerie', description: 'Travaux de maçonnerie et construction', icon: 'Hammer', isActive: true },
    ];
    (0, react_1.useEffect)(() => {
        const loadCategories = async () => {
            try {
                const data = await api_1.api.getCategories();
                const activeCategories = data.filter(cat => cat.isActive).slice(0, 6);
                setCategories(activeCategories);
                setError(false);
            }
            catch (error) {
                console.error('Failed to load categories:', error);
                setCategories(mockCategories);
                setError(false);
            }
            finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, []);
    (0, react_1.useEffect)(() => {
        if (sectionRef.current) {
            gsap_1.gsap.set('.services-parallax-1', { y: 0 });
            gsap_1.gsap.set('.services-parallax-2', { y: 0 });
            gsap_1.gsap.set('.services-parallax-3', { y: 0 });
            ScrollTrigger_1.ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap_1.gsap.set('.services-parallax-1', { y: progress * -80 });
                    gsap_1.gsap.set('.services-parallax-2', { y: progress * -40 });
                    gsap_1.gsap.set('.services-parallax-3', { y: progress * -120 });
                }
            });
        }
        return () => {
            ScrollTrigger_1.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);
    if (loading) {
        return (<section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <glass_container_1.GlassContainer>
            <div className="text-center mb-16">
              <div className="h-8 bg-surface rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-4 bg-surface rounded w-96 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (<div key={i} className="p-6 bg-white rounded-3xl animate-pulse">
                  <div className="w-16 h-16 bg-surface rounded-3xl mx-auto mb-4"></div>
                  <div className="h-6 bg-surface rounded w-24 mx-auto mb-2"></div>
                  <div className="h-4 bg-surface rounded w-32 mx-auto"></div>
                </div>))}
            </div>
          </glass_container_1.GlassContainer>
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
    if (error) {
        return (<section ref={sectionRef} className="py-20 bg-surface relative overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none">
          
          <framer_motion_1.motion.div className="services-parallax-1 absolute top-20 left-10 opacity-5" style={{ y: parallaxY1 }}>
            <svg width="180" height="180" viewBox="0 0 200 200" className="text-primary-600">
              <defs>
                <pattern id="services-arabesque" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M25 5 Q35 5 35 15 Q35 25 25 25 Q15 25 15 15 Q15 5 25 5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6"/>
                  <circle cx="25" cy="15" r="1" fill="currentColor" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="180" height="180" fill="url(#services-arabesque)"/>
            </svg>
          </framer_motion_1.motion.div>
  
          
          <framer_motion_1.motion.div className="services-parallax-2 absolute top-40 right-20 opacity-8" style={{ y: parallaxY2 }}>
            <svg width="140" height="140" viewBox="0 0 150 150" className="text-secondary-600">
              <defs>
                <pattern id="services-geometric" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <polygon points="15,3 25,13 15,23 5,13" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.5"/>
                  <circle cx="15" cy="13" r="1.5" fill="currentColor" opacity="0.6"/>
                </pattern>
              </defs>
              <rect width="140" height="140" fill="url(#services-geometric)"/>
            </svg>
          </framer_motion_1.motion.div>
  
          
          <framer_motion_1.motion.div className="services-parallax-3 absolute bottom-20 left-1/3 opacity-6" style={{ y: parallaxY3 }}>
            <svg width="100" height="100" viewBox="0 0 100 100" className="text-primary-500">
              <defs>
                <pattern id="services-star" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                  <polygon points="12.5,2.5 15.5,8.5 21.5,8.5 16.5,13.5 18.5,19.5 12.5,15.5 6.5,19.5 8.5,13.5 3.5,8.5 9.5,8.5" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#services-star)"/>
            </svg>
          </framer_motion_1.motion.div>
        </div>
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <glass_container_1.GlassContainer>
            <div className="text-center mb-16">
              <h2 className="text-h2 font-semibold text-text-primary mb-4">
                Services populaires
              </h2>
              <p className="text-body text-text-secondary max-w-2xl mx-auto">
                Découvrez nos services les plus demandés.
              </p>
            </div>
            <EmptyState title="Service temporairement indisponible" description="Nous rencontrons un problème technique. Nos services reviennent bientôt." icon={lucide_react_1.Wrench} ctaText="Voir tous les services" ctaLink="/services"/>
          </glass_container_1.GlassContainer>
        </div>
      </section>);
    }
    return (<section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <framer_motion_1.motion.h2 className="text-h2 font-semibold text-text-primary mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            Services populaires
          </framer_motion_1.motion.h2>
          <framer_motion_1.motion.p className="text-body text-text-secondary max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
            Découvrez nos services les plus demandés. Cliquez sur un service pour explorer les professionnels disponibles.
          </framer_motion_1.motion.p>
        </div>

        {categories.length === 0 ? (<EmptyState title="Les services arrivent bientôt" description="Nous préparons une sélection de services pour votre région. Revenez bientôt !" icon={lucide_react_1.Home} ctaText="Voir tous les services" ctaLink="/services"/>) : (<>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
              {categories.map((category, index) => {
                const iconSrc = iconMap[category.name.toLowerCase()] || iconMap.default;
                return (<framer_motion_1.motion.div key={category.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut"
                    }} viewport={{ once: true }} className="flex flex-col items-center">
                    <link_1.default href={`/search?categoryId=${category.id}`} className="group block text-center cursor-pointer">
                      
                      <framer_motion_1.motion.div className="w-24 h-24 bg-orange-50/50 rounded-[2rem] ring-1 ring-white/50 flex items-center justify-center mb-4 transition-all duration-300" whileHover={{
                        y: -8,
                        boxShadow: "0 10px 25px rgba(249, 123, 34, 0.2)",
                        transition: { duration: 0.3, ease: "easeOut" }
                    }}>
                        <img src={iconSrc} alt={`${category.name} icon`} className="w-full h-full object-contain p-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300"/>
                      </framer_motion_1.motion.div>

                      
                      <h3 className="text-lg font-medium text-gray-800 group-hover:text-primary-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                    </link_1.default>
                  </framer_motion_1.motion.div>);
            })}
            </div>

            <framer_motion_1.motion.div className="text-center mt-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} viewport={{ once: true }}>
              <link_1.default href="/services">
                <framer_motion_1.motion.button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-3xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105" whileHover={{
                boxShadow: "0 20px 40px rgba(249, 123, 34, 0.3)",
                scale: 1.05
            }} whileTap={{ scale: 0.95 }}>
                  Explorer tous les services
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </framer_motion_1.motion.button>
              </link_1.default>
            </framer_motion_1.motion.div>
          </>)}
      </div>
    </section>);
};
exports.PopularServices = PopularServices;
//# sourceMappingURL=popular-services.js.map