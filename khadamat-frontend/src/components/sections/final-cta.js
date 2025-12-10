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
exports.FinalCta = void 0;
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const framer_motion_1 = require("framer-motion");
const button_1 = require("@/components/ui/button");
const glass_container_1 = require("@/components/ui/glass-container");
const lucide_react_1 = require("lucide-react");
const gsap_1 = require("gsap");
const ScrollTrigger_1 = require("gsap/ScrollTrigger");
gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
const FinalCta = () => {
    const sectionRef = (0, react_1.useRef)(null);
    const { scrollY } = (0, framer_motion_1.useScroll)();
    const parallaxY1 = (0, framer_motion_1.useTransform)(scrollY, [0, 1000], [0, -70]);
    const parallaxY2 = (0, framer_motion_1.useTransform)(scrollY, [0, 1000], [0, -35]);
    (0, react_1.useEffect)(() => {
        if (sectionRef.current) {
            gsap_1.gsap.set('.finalcta-parallax-1', { y: 0 });
            gsap_1.gsap.set('.finalcta-parallax-2', { y: 0 });
            ScrollTrigger_1.ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap_1.gsap.set('.finalcta-parallax-1', { y: progress * -70 });
                    gsap_1.gsap.set('.finalcta-parallax-2', { y: progress * -35 });
                }
            });
        }
        return () => {
            ScrollTrigger_1.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);
    return (<section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        
        <framer_motion_1.motion.div className="finalcta-parallax-1 absolute top-10 left-10 opacity-8" style={{ y: parallaxY1 }}>
          <svg width="140" height="140" viewBox="0 0 200 200" className="text-primary-400">
            <defs>
              <pattern id="finalcta-arabesque" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
                <path d="M17.5 5 Q25 5 25 12.5 Q25 20 17.5 20 Q10 20 10 12.5 Q10 5 17.5 5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
                <circle cx="17.5" cy="12.5" r="1" fill="currentColor" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="140" height="140" fill="url(#finalcta-arabesque)"/>
          </svg>
        </framer_motion_1.motion.div>

        
        <framer_motion_1.motion.div className="finalcta-parallax-2 absolute bottom-10 right-10 opacity-6" style={{ y: parallaxY2 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-secondary-400">
            <defs>
              <pattern id="finalcta-star" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <polygon points="10,2 12.5,7.5 18,7.5 13.5,11.5 15,17 10,14 5,17 6.5,11.5 2,7.5 7.5,7.5" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#finalcta-star)"/>
          </svg>
        </framer_motion_1.motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <glass_container_1.GlassContainer className="text-center p-12">
          <h2 className="text-h1 font-bold text-text-primary mb-4">
            Prêt à trouver un artisan de confiance ?
          </h2>

          <p className="text-body text-text-secondary mb-8 max-w-2xl mx-auto">
            Gratuit, sans engagement, artisans vérifiés. Commencez dès maintenant et trouvez
            le professionnel qu'il vous faut pour tous vos travaux.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <link_1.default href="/auth/signup">
              <button_1.Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white font-bold shadow-xl hover:shadow-2xl px-12 py-4 rounded-3xl transform hover:scale-105 transition-all duration-200 text-lg">
                Commencer maintenant
                <lucide_react_1.ArrowRight className="w-5 h-5 ml-2"/>
              </button_1.Button>
            </link_1.default>
            <link_1.default href="/services">
              <button_1.Button variant="outline" size="lg" className="border-2 border-primary-200 text-primary-700 hover:bg-primary-50 px-12 py-4 rounded-3xl text-lg">
                Explorer les services
              </button_1.Button>
            </link_1.default>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <lucide_react_1.CheckCircle className="w-4 h-4 text-success-500"/>
              <span>Gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <lucide_react_1.CheckCircle className="w-4 h-4 text-primary-500"/>
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <lucide_react_1.CheckCircle className="w-4 h-4 text-warning-500"/>
              <span>Artisans vérifiés</span>
            </div>
          </div>
        </glass_container_1.GlassContainer>
      </div>
    </section>);
};
exports.FinalCta = FinalCta;
//# sourceMappingURL=final-cta.js.map