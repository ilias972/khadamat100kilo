'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogAstuces = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const BlogAstuces = () => {
    const tips = [
        {
            image: '/plomberieBLOG.jpeg',
            title: 'Maintenance plomberie',
            description: '5 gestes simples pour éviter les pannes',
            category: 'Astuces',
        },
        {
            image: '/menageBLOG.jpeg',
            title: 'Nettoyage de printemps',
            description: 'Guide complet pour un ménage efficace',
            category: 'Guide',
        },
        {
            image: '/peintureBLOG.jpeg',
            title: 'Peinture intérieure',
            description: 'Choisir la bonne couleur pour chaque pièce',
            category: 'Conseils',
        },
    ];
    return (<section className="py-20 bg-orange-50/30" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,237,213,0.6) 0%, rgba(248,250,252,0) 70%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-semibold text-text-primary mb-4">
            Blog & Astuces
          </h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Découvrez nos conseils d'experts, guides pratiques et astuces pour
            entretenir votre maison et réaliser vos projets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tips.map((tip, index) => (<link_1.default key={index} href="/blog" className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer block">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${tip.image})` }}/>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent transition-all duration-700"/>
              <div className="absolute top-4 left-4">
                <div className="bg-white/20 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                  {tip.category}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-lg mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                  {tip.description}
                </p>
                <div className="flex justify-end">
                  <div className="bg-orange-500 text-white rounded-full p-2">
                    <lucide_react_1.ArrowRight className="w-4 h-4"/>
                  </div>
                </div>
              </div>
            </link_1.default>))}
        </div>

        <div className="text-center">
          <link_1.default href="/blog">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-3xl transition-colors">
              <lucide_react_1.BookOpen className="w-4 h-4"/>
              Voir tous les articles
              <lucide_react_1.ArrowRight className="w-4 h-4"/>
            </button>
          </link_1.default>
        </div>
      </div>
    </section>);
};
exports.BlogAstuces = BlogAstuces;
//# sourceMappingURL=blog-astuces.js.map