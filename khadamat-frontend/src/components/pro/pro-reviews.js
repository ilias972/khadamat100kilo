'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProReviews = void 0;
const react_1 = __importDefault(require("react"));
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const ProReviews = ({ professional }) => {
    return (<card_1.Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <h2 className="text-h2 font-semibold text-text-primary mb-6 font-heading">Avis clients</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {professional.reviews.map((review) => (<div key={review.id} className="bg-surface rounded-lg p-6 border border-border-light">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-semibold text-sm">
                  {review.clientName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-text-primary">{review.clientName}</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (<lucide_react_1.Star key={i} className={`w-4 h-4 ${i < review.rating
                    ? 'text-warning-500 fill-current'
                    : 'text-border-medium'}`}/>))}
                  </div>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  {new Date(review.date).toLocaleDateString('fr-FR')}
                </p>
                <badge_1.Badge variant="default" className="text-xs">{review.serviceName}</badge_1.Badge>
              </div>
            </div>
            <p className="text-body text-text-secondary leading-relaxed">{review.comment}</p>
          </div>))}
      </div>
    </card_1.Card>);
};
exports.ProReviews = ProReviews;
//# sourceMappingURL=pro-reviews.js.map