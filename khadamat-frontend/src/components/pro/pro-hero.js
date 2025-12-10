'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProHero = void 0;
const react_1 = __importDefault(require("react"));
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const ProHero = ({ professional, }) => {
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };
    return (<section className="relative py-12 md:py-16">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-primary-300/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-br from-secondary-300/20 to-primary-500/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-[length:24px_24px] opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-6 space-y-6 md:space-y-0">
              
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-3xl">
                    {getInitials(professional.fullName)}
                  </span>
                </div>
                {professional.isVerified && (<div className="absolute -bottom-2 -right-2 w-10 h-10 bg-success-500 rounded-full flex items-center justify-center">
                    <lucide_react_1.Shield className="w-5 h-5 text-white"/>
                  </div>)}
              </div>

              
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-h1 font-bold text-text-primary font-heading">
                      {professional.fullName}
                    </h1>
                    {professional.isPremium && (<badge_1.Badge variant="warning" className="flex items-center space-x-1">
                        <lucide_react_1.Crown className="w-3 h-3"/>
                        <span>Premium</span>
                      </badge_1.Badge>)}
                  </div>
                  <p className="text-h3 text-primary-600 font-medium">{professional.title}</p>
                </div>

                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (<lucide_react_1.Star key={i} className={`w-5 h-5 ${i < Math.floor(professional.rating)
                ? 'text-warning-500 fill-current'
                : 'text-border-medium'}`}/>))}
                    </div>
                    <span className="text-lg font-semibold text-text-primary">
                      {professional.rating}
                    </span>
                    <span className="text-text-muted">
                      ({professional.reviewCount} avis)
                    </span>
                  </div>
                </div>

                
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
                  <div className="flex items-center space-x-1">
                    <lucide_react_1.MapPin className="w-4 h-4"/>
                    <span>{professional.cityName}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <lucide_react_1.Users className="w-4 h-4"/>
                    <span>{professional.completedJobs} missions</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <lucide_react_1.Clock className="w-4 h-4"/>
                    <span>{professional.responseTime}</span>
                  </div>
                </div>

                
                {professional.badgeLabels && professional.badgeLabels.length > 0 && (<div className="flex flex-wrap gap-2">
                    {professional.badgeLabels.map((badge, index) => (<badge_1.Badge key={index} variant="default" className="text-xs">
                        {badge}
                      </badge_1.Badge>))}
                  </div>)}

                
                <p className="text-body text-text-secondary leading-relaxed">
                  {professional.shortBio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);
};
exports.ProHero = ProHero;
//# sourceMappingURL=pro-hero.js.map