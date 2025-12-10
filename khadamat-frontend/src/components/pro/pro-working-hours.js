'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProWorkingHours = void 0;
const react_1 = __importDefault(require("react"));
const card_1 = require("@/components/ui/card");
const lucide_react_1 = require("lucide-react");
const ProWorkingHours = ({ professional }) => {
    const days = [
        { key: 'monday', label: 'Lundi' },
        { key: 'tuesday', label: 'Mardi' },
        { key: 'wednesday', label: 'Mercredi' },
        { key: 'thursday', label: 'Jeudi' },
        { key: 'friday', label: 'Vendredi' },
        { key: 'saturday', label: 'Samedi' },
        { key: 'sunday', label: 'Dimanche' },
    ];
    return (<card_1.Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <h3 className="text-h3 font-semibold text-text-primary mb-4 font-heading flex items-center">
        <lucide_react_1.Clock className="w-5 h-5 mr-2"/>
        Horaires de travail
      </h3>
      <div className="space-y-2">
        {days.map((day) => (<div key={day.key} className="flex justify-between items-center">
            <span className="text-sm text-text-primary">{day.label}</span>
            <span className="text-sm text-text-muted">
              {professional.workingHours[day.key]}
            </span>
          </div>))}
      </div>
    </card_1.Card>);
};
exports.ProWorkingHours = ProWorkingHours;
//# sourceMappingURL=pro-working-hours.js.map