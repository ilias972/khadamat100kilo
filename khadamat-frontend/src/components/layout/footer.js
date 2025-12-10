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
exports.Footer = void 0;
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const toast_context_1 = require("@/lib/toast-context");
const Footer = () => {
    const [email, setEmail] = (0, react_1.useState)('');
    const { success } = (0, toast_context_1.useToast)();
    const currentYear = new Date().getFullYear();
    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            success('Merci de votre inscription à notre newsletter !');
            setEmail('');
        }
    };
    const footerLinks = {
        services: [
            { name: 'Plomberie', href: '/services?service=Plomberie' },
            { name: 'Électricité', href: '/services?service=Électricité' },
            { name: 'Ménage', href: '/services?service=Ménage' },
            { name: 'Peinture', href: '/services?service=Peinture' },
            { name: 'Jardinage', href: '/services?service=Jardinage' },
            { name: 'Réparation', href: '/services?service=Réparation' },
        ],
        company: [
            { name: 'À propos', href: '/about' },
            { name: 'Comment ça marche', href: '/how-it-works' },
            { name: 'Devenir pro', href: '/devenir-pro' },
            { name: 'Carrières', href: '/careers' },
        ],
        support: [
            { name: 'Centre d\'aide', href: '/help' },
            { name: 'FAQ', href: '/faq' },
            { name: 'Contact', href: '/contact' },
            { name: 'Signaler un problème', href: '/report' },
        ],
        legal: [
            { name: 'Conditions générales', href: '/terms' },
            { name: 'Politique de confidentialité', href: '/privacy' },
            { name: 'Sécurité', href: '/security' },
        ],
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (<footer className="bg-gray-900 text-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          <div className="lg:col-span-2">
            <link_1.default href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-20"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-heading">Khadamat</span>
                <span className="text-sm text-gray-400 font-body">Services à domicile</span>
              </div>
            </link_1.default>

            <p className="text-gray-300 mb-8 max-w-sm leading-relaxed font-body">
              La première plateforme marocaine de mise en relation avec des artisans de confiance.
              Réservez vos services à domicile en toute sécurité et simplicité.
              <span className="block text-sm text-primary-300 mt-2 font-arabic" dir="rtl">
                أول منصة مغربية للربط مع الحرفيين الموثوقين
              </span>
            </p>

            
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Artisans vérifiés</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Paiement sécurisé</span>
              </div>
            </div>

            
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <lucide_react_1.Phone className="w-4 h-4 text-blue-400"/>
                <span>+212 6XX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <lucide_react_1.Mail className="w-4 h-4 text-purple-400"/>
                <span>contact@khadamat.ma</span>
              </div>
              <div className="flex items-center space-x-3">
                <lucide_react_1.MapPin className="w-4 h-4 text-green-400"/>
                <span>Casablanca, Maroc</span>
              </div>
            </div>
          </div>

          
          <div>
            <h3 className="font-semibold text-white mb-6 font-heading">Services populaires</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (<li key={link.name}>
                  <link_1.default href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </link_1.default>
                </li>))}
            </ul>
          </div>

          
          <div>
            <h3 className="font-semibold text-white mb-6 font-heading">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (<li key={link.name}>
                  <link_1.default href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-body">
                    {link.name}
                  </link_1.default>
                </li>))}
            </ul>
          </div>

          
          <div>
            <h3 className="font-semibold text-white mb-6 font-heading">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (<li key={link.name}>
                  <link_1.default href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    {link.name}
                  </link_1.default>
                </li>))}
            </ul>
          </div>

          
          <div>
            <h3 className="font-semibold text-white mb-6 font-heading">Restez connecté</h3>
            <p className="text-gray-400 text-sm mb-4">
              Recevez nos dernières actualités et offres exclusives.
            </p>

            
            <div className="mb-6">
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input type="email" placeholder="Votre email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:border-blue-500 focus:outline-none text-white text-sm placeholder-gray-400"/>
                <button type="submit" disabled={!email.trim()} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                  <lucide_react_1.Mail className="w-4 h-4"/>
                </button>
              </form>
            </div>

            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200" aria-label="Facebook">
                <lucide_react_1.Facebook className="w-5 h-5"/>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200" aria-label="Instagram">
                <lucide_react_1.Instagram className="w-5 h-5"/>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200" aria-label="Twitter">
                <lucide_react_1.Twitter className="w-5 h-5"/>
              </a>
            </div>
          </div>
        </div>

        
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-400">
              <span>© {currentYear} Khadamat. Tous droits réservés.</span>
              <span className="hidden sm:block">•</span>
              <span>Fait avec <lucide_react_1.Heart className="w-4 h-4 inline text-red-500 mx-1"/> au Maroc</span>
            </div>

            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {footerLinks.legal.map((link) => (<link_1.default key={link.name} href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                  {link.name}
                </link_1.default>))}
            </div>

            
            <button onClick={scrollToTop} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              <lucide_react_1.ArrowUp className="w-4 h-4"/>
              Retour en haut
            </button>
          </div>
        </div>
      </div>
    </footer>);
};
exports.Footer = Footer;
//# sourceMappingURL=footer.js.map