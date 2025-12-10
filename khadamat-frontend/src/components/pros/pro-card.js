'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProCard = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const ProCard = ({ professional }) => {
    const handleContactClick = () => {
        alert('La messagerie arrive bientôt ! Connectez-vous pour contacter cet artisan.');
    };
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };
    return (<card_1.Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.02] border-0 flex flex-col h-full">
      <div className="flex flex-col h-full">
        
        <div className="flex-1 space-y-4">
          
          <div className="flex items-start space-x-3">
            <div className="relative">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-lg">
                  {getInitials(professional.fullName)}
                </span>
              </div>
              {professional.isVerified && (<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                  <lucide_react_1.Shield className="w-3 h-3 text-white"/>
                </div>)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-h3 font-semibold text-text-primary truncate">
                  {professional.fullName}
                </h3>
                {professional.isVerified && (<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                    Vérifié
                  </span>)}
              </div>

              <p className="text-body font-medium text-primary-600 mb-2">
                {professional.title}
              </p>

              
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (<lucide_react_1.Star key={i} className={`w-4 h-4 ${i < Math.floor(professional.rating)
                ? 'text-warning-500 fill-current'
                : 'text-border-medium'}`}/>))}
                </div>
                <span className="text-small font-medium text-text-primary">
                  {professional.rating}
                </span>
                <span className="text-small text-text-muted">
                  ({professional.reviewCount} avis)
                </span>
              </div>

              
              <div className="flex items-center text-small text-text-muted">
                <lucide_react_1.MapPin className="w-4 h-4 mr-1"/>
                <span className="truncate">{professional.cityName || professional.cityId}</span>
              </div>
            </div>
          </div>

          
          {professional.isPremium && (<div className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-warning-50 to-warning-100 rounded-lg border border-warning-200">
              <lucide_react_1.Crown className="w-4 h-4 text-warning-600 mr-2"/>
              <span className="text-sm font-medium text-warning-700">Artisan Premium</span>
            </div>)}

          
          {professional.shortBio && (<p className="text-small text-text-secondary line-clamp-2">
              {professional.shortBio}
            </p>)}

          
          <div className="text-center text-small text-text-muted">
            À partir de {professional.startingPrice} MAD • {professional.experienceYears} ans d'expérience
          </div>

          
          <div className="text-center text-small text-text-muted">
            {professional.responseTime}
          </div>

          
          {professional.badgeLabels && professional.badgeLabels.length > 0 && (<div className="flex flex-wrap gap-1 justify-center">
              {professional.badgeLabels.map((badge, index) => (<span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 truncate max-w-full">
                  {badge}
                </span>))}
            </div>)}
        </div>

        
        <div className="flex space-x-2 pt-4 mt-auto">
          <link_1.default href={`/pro/${professional.id}`} className="flex-1">
            <button_1.Button className="w-full bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] py-2 font-semibold transition-all duration-200">
              Voir le profil
            </button_1.Button>
          </link_1.default>
          <button_1.Button onClick={handleContactClick} className="flex-1 bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] py-2 font-semibold transition-all duration-200 hover:shadow-lg">
            <lucide_react_1.MessageCircle className="w-4 h-4 mr-1"/>
            Contacter
          </button_1.Button>
        </div>
      </div>
    </card_1.Card>);
};
exports.ProCard = ProCard;
//# sourceMappingURL=pro-card.js.map