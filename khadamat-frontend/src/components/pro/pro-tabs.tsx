'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

const tabs = [
  { id: 'presentation', label: 'Présentation' },
  { id: 'realisations', label: 'Réalisations' },
  { id: 'avis', label: 'Avis' },
];

export function ProTabs({ activeTab, onChange }: ProTabsProps) {
  return (
    <div className="border-b border-border-light">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border-light'
            )}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}