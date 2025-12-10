'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingCard = BookingCard;
const react_1 = __importDefault(require("react"));
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
function BookingCard({ professional, onBookNow, onContact }) {
    return (<card_1.Card className="p-6 sticky top-24">
      <div className="space-y-4">
        
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">
            À partir de {professional.startingPrice} DH
          </div>
          <div className="text-sm text-text-secondary">Prix indicatif</div>
        </div>

        
        <div className="flex items-center justify-center space-x-2">
          <div className="flex items-center">
            <lucide_react_1.Star className="w-4 h-4 fill-yellow-400 text-yellow-400"/>
            <span className="ml-1 font-medium">{professional.rating}</span>
          </div>
          <span className="text-text-secondary">
            ({professional.reviewCount} avis)
          </span>
        </div>

        
        <div className="flex items-center justify-center space-x-2 text-sm text-text-secondary">
          <lucide_react_1.Clock className="w-4 h-4"/>
          <span>{professional.responseTime}</span>
        </div>

        
        {professional.isVerified && (<div className="flex items-center justify-center space-x-2 text-sm text-green-600">
            <lucide_react_1.CheckCircle className="w-4 h-4"/>
            <span>Professionnel vérifié</span>
          </div>)}

        
        <div className="space-y-3">
          <button_1.Button onClick={onBookNow} className="w-full bg-primary-600 hover:bg-primary-700 text-white" size="lg">
            <lucide_react_1.Calendar className="w-4 h-4 mr-2"/>
            Réserver maintenant
          </button_1.Button>

          <button_1.Button onClick={onContact} variant="outline" className="w-full" size="lg">
            Contacter
          </button_1.Button>
        </div>

        
        <div className="text-xs text-text-secondary text-center space-y-1">
          <div>Réservation gratuite • Paiement sécurisé</div>
          <div>Annulation gratuite jusqu'à 24h avant</div>
        </div>
      </div>
    </card_1.Card>);
}
//# sourceMappingURL=booking-card.js.map