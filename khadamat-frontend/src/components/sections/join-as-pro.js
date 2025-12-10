'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinAsPro = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const button_1 = require("@/components/ui/button");
const glass_container_1 = require("@/components/ui/glass-container");
const lucide_react_1 = require("lucide-react");
const JoinAsPro = () => {
    const benefits = [
        {
            icon: lucide_react_1.Eye,
            title: 'Gagnez en visibilité',
            description: 'Apparaissez en tête des recherches dans votre région',
            color: 'text-primary-500',
            bgColor: 'bg-primary-100',
        },
        {
            icon: lucide_react_1.Users,
            title: 'Recevez plus de missions',
            description: 'Accès à des milliers de clients actifs chaque jour',
            color: 'text-secondary-500',
            bgColor: 'bg-secondary-100',
        },
        {
            icon: lucide_react_1.CheckCircle,
            title: 'Devenez vérifié',
            description: 'Obtenez le badge Pro Vérifié pour plus de crédibilité',
            color: 'text-success-500',
            bgColor: 'bg-success-100',
        },
        {
            icon: lucide_react_1.Briefcase,
            title: 'Gérez facilement vos clients',
            description: 'Outils intégrés pour organiser vos missions et paiements',
            color: 'text-warning-500',
            bgColor: 'bg-warning-100',
        },
    ];
    return (<section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <glass_container_1.GlassContainer>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <h2 className="text-h2 font-semibold text-text-primary">
                Rejoignez la plateforme #1 des artisans au Maroc
              </h2>

              <p className="text-body text-text-secondary leading-relaxed">
                Développez votre activité, gagnez en visibilité et recevez des missions qualifiées.
                Rejoignez notre communauté d'artisans de confiance.
              </p>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (<div key={index} className="flex items-start gap-3 p-4 bg-white/50 rounded-2xl hover:bg-white/70 transition-colors">
                    <div className={`w-10 h-10 ${benefit.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <benefit.icon className={`w-5 h-5 ${benefit.color}`}/>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-sm mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-text-secondary text-xs leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>))}
              </div>

              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <link_1.default href="/devenir-pro">
                  <button_1.Button size="lg" className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-bold shadow-xl hover:shadow-2xl px-8 py-3 rounded-3xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto">
                    Devenir Pro
                  </button_1.Button>
                </link_1.default>
                <button_1.Button variant="outline" size="lg" className="border-2 border-primary-200 text-primary-700 hover:bg-primary-50 px-8 py-3 rounded-3xl w-full sm:w-auto">
                  En savoir plus
                </button_1.Button>
              </div>
            </div>

            
            <div className="bg-white rounded-3xl p-8 shadow-card">
              <div className="text-center mb-8">
                <h3 className="text-h3 font-semibold text-text-primary mb-2">
                  Rejoignez nos 15,000+ artisans
                </h3>
                <p className="text-text-secondary">
                  Ils ont déjà choisi Khadamat pour développer leur business
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">4.9/5</div>
                  <p className="text-sm text-text-secondary">Note moyenne des pros</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-success-600 mb-2">98%</div>
                  <p className="text-sm text-text-secondary">Taux de satisfaction</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-warning-600 mb-2">50K+</div>
                  <p className="text-sm text-text-secondary">Missions réalisées</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">24/7</div>
                  <p className="text-sm text-text-secondary">Support disponible</p>
                </div>
              </div>
            </div>
          </div>
        </glass_container_1.GlassContainer>
      </div>
    </section>);
};
exports.JoinAsPro = JoinAsPro;
//# sourceMappingURL=join-as-pro.js.map