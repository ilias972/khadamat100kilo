'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProSimilarProfessionals = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const professional_card_1 = require("@/components/ui/professional-card");
const services_mocks_1 = require("@/lib/mocks/services-mocks");
const ProSimilarProfessionals = ({ currentProfessional, }) => {
    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };
    const similarProfessionals = Object.values(services_mocks_1.mockProfessionalDetails)
        .filter(p => p.id !== currentProfessional.id && p.serviceCategoryId === currentProfessional.serviceCategoryId)
        .slice(0, 3);
    return (<section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-h2 font-semibold text-text-primary mb-4 font-heading">
            Autres professionnels similaires
          </h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Découvrez d'autres professionnels dans le même domaine près de chez vous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProfessionals.map((similarPro, index) => (<link_1.default key={similarPro.id} href={`/pro/${similarPro.id}`}>
              <professional_card_1.ProfessionalCard professional={{
                id: similarPro.id,
                fullName: similarPro.fullName,
                title: similarPro.title,
                rating: similarPro.rating,
                reviewCount: similarPro.reviewCount || 0,
                location: 'Casablanca',
                verified: similarPro.isVerified || false,
                completedJobs: 0,
                responseTime: '< 1h',
                startingPrice: 150,
                isFavorite: false
            }} index={index} variant="compact" showActions={false}/>
            </link_1.default>))}
        </div>
      </div>
    </section>);
};
exports.ProSimilarProfessionals = ProSimilarProfessionals;
//# sourceMappingURL=pro-similar-professionals.js.map