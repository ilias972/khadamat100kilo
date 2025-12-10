'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProTabs = ProTabs;
const react_1 = __importDefault(require("react"));
const utils_1 = require("@/lib/utils");
const tabs = [
    { id: 'presentation', label: 'Présentation' },
    { id: 'realisations', label: 'Réalisations' },
    { id: 'avis', label: 'Avis' },
];
function ProTabs({ activeTab, onChange }) {
    return (<div className="border-b border-border-light">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (<button key={tab.id} onClick={() => onChange(tab.id)} className={(0, utils_1.cn)('whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200', activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-light')} aria-current={activeTab === tab.id ? 'page' : undefined}>
            {tab.label}
          </button>))}
      </nav>
    </div>);
}
//# sourceMappingURL=pro-tabs.js.map