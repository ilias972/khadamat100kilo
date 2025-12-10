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
exports.MiniFaq = void 0;
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const MiniFaq = () => {
    const [openItems, setOpenItems] = (0, react_1.useState)([]);
    const toggleItem = (index) => {
        setOpenItems(prev => prev.includes(index)
            ? prev.filter(i => i !== index)
            : [...prev, index]);
    };
    const faqs = [
        {
            question: "Comment être sûr que l'artisan est fiable ?",
            answer: "Tous nos artisans sont vérifiés via un processus rigoureux : contrôle d'identité, vérification des qualifications, et validation des références. Chaque professionnel reçoit un badge 'Pro Vérifié' après validation."
        },
        {
            question: "Comment fonctionne le paiement ?",
            answer: "Le paiement est sécurisé et ne se déclenche qu'après validation du travail par vos soins. Vous ne payez que si vous êtes satisfait du service rendu. Nous acceptons les cartes bancaires et les virements."
        },
        {
            question: "Et si le travail n'est pas satisfaisant ?",
            answer: "Notre garantie satisfaction vous protège. Si le travail ne correspond pas à vos attentes, contactez notre support dans les 48h. Nous trouverons une solution : correction gratuite ou remboursement."
        },
        {
            question: "Êtes-vous disponibles dans toutes les villes du Maroc ?",
            answer: "Oui ! Khadamat couvre l'ensemble du territoire marocain. De Casablanca à Ouarzazate, en passant par Marrakech, Rabat, Fès et toutes les villes intermédiaires, vous trouverez des artisans qualifiés près de chez vous."
        },
        {
            question: "Combien de temps faut-il pour trouver un artisan ?",
            answer: "En moyenne, vous recevez les premières propositions dans l'heure suivant votre demande. Pour les urgences, nous avons un service prioritaire avec réponse garantie sous 30 minutes."
        }
    ];
    return (<section className="relative py-20 w-full bg-orange-50/30 overflow-hidden">
      
      <div className="absolute inset-0 opacity-5 mix-blend-multiply animate-pulse" style={{
            backgroundImage: `url('/arabesque-pattern.svg')`,
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
            animation: 'slowScroll 60s linear infinite'
        }}/>
      <style jsx>{`
        @keyframes slowScroll {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(-100px) translateY(-100px); }
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 lg:sticky lg:top-20">
            <div className="text-left lg:text-left">
              <h2 className="text-h2 font-semibold text-text-primary mb-4">
                Questions fréquentes
              </h2>
              <p className="text-body text-text-secondary mb-8">
                Tout ce que vous devez savoir avant de réserver votre artisan
              </p>

              <div className="space-y-4">
                <p className="text-text-secondary">
                  Vous avez d'autres questions ?
                </p>
                <div className="flex flex-col gap-4">
                  <link_1.default href="/faq">
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-3xl transition-colors shadow-lg shadow-orange-500/25">
                      <lucide_react_1.HelpCircle className="w-4 h-4"/>
                      Voir toutes les FAQ
                    </button>
                  </link_1.default>
                  <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-3xl transition-colors shadow-lg shadow-green-500/25">
                    <lucide_react_1.MessageCircle className="w-4 h-4"/>
                    Support WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (<div key={index} className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${openItems.includes(index) ? 'border border-orange-200' : ''}`}>
                  <button onClick={() => toggleItem(index)} className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors" aria-expanded={openItems.includes(index)} aria-controls={`faq-answer-${index}`}>
                    <span className="text-h4 font-semibold text-text-primary pr-4">
                      {faq.question}
                    </span>
                    <lucide_react_1.ChevronDown className={`w-5 h-5 text-text-secondary flex-shrink-0 transition-transform duration-300 ${openItems.includes(index) ? 'rotate-180' : ''}`}/>
                  </button>

                  {openItems.includes(index) && (<div id={`faq-answer-${index}`} className="px-6 pb-4 text-text-secondary leading-relaxed animate-fadeIn">
                      {faq.answer}
                    </div>)}
                </div>))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>);
};
exports.MiniFaq = MiniFaq;
//# sourceMappingURL=mini-faq.js.map