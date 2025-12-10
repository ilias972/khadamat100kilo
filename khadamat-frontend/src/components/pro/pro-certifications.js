'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProCertifications = void 0;
const react_1 = __importDefault(require("react"));
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const ProCertifications = ({ professional }) => {
    return (<card_1.Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <h3 className="text-h3 font-semibold text-text-primary mb-4 font-heading flex items-center">
        <lucide_react_1.Award className="w-5 h-5 mr-2"/>
        Certifications
      </h3>
      <div className="space-y-3">
        {professional.certifications.map((cert) => (<div key={cert.id} className="border-l-2 border-primary-300 pl-4">
            <h4 className="font-medium text-text-primary">{cert.title}</h4>
            <p className="text-sm text-text-muted">{cert.issuer} • {cert.year}</p>
            {cert.description && (<p className="text-sm text-text-secondary mt-1">{cert.description}</p>)}
          </div>))}
      </div>
    </card_1.Card>);
};
exports.ProCertifications = ProCertifications;
//# sourceMappingURL=pro-certifications.js.map