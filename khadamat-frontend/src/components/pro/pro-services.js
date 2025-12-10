'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProServices = void 0;
const react_1 = __importDefault(require("react"));
const card_1 = require("@/components/ui/card");
const ProServices = ({ professional }) => {
    return (<card_1.Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <h2 className="text-h2 font-semibold text-text-primary mb-6 font-heading">Services & Tarifs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {professional.services.map((service) => (<div key={service.id} className="bg-surface rounded-lg p-4 border border-border-light">
            <h3 className="font-semibold text-text-primary mb-2">{service.name}</h3>
            <p className="text-sm text-text-secondary mb-3">{service.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-primary-600">{service.price} MAD</span>
              <span className="text-sm text-text-muted">{service.duration}</span>
            </div>
          </div>))}
      </div>
    </card_1.Card>);
};
exports.ProServices = ProServices;
//# sourceMappingURL=pro-services.js.map