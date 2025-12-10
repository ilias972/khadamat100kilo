import React from 'react';
interface ReportConfig {
    dateRange: string;
    metrics: string[];
    format: 'pdf' | 'excel' | 'csv';
    includeCharts: boolean;
    includeInsights: boolean;
    schedule: 'none' | 'daily' | 'weekly' | 'monthly';
    emailRecipients?: string[];
}
interface AdvancedReportingProps {
    onGenerateReport?: (config: ReportConfig) => Promise<void>;
    onScheduleReport?: (config: ReportConfig) => Promise<void>;
}
export declare const AdvancedReporting: React.FC<AdvancedReportingProps>;
export {};
