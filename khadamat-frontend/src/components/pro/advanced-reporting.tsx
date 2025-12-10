'use client';

import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Calendar, 
  DollarSign, 
  Star, 
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle,
  FileSpreadsheet,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ReportConfig {
  dateRange: string;
  metrics: string[];
  format: 'pdf' | 'excel' | 'csv';
  includeCharts: boolean;
  includeInsights: boolean;
  schedule: 'none' | 'daily' | 'weekly' | 'monthly';
  emailRecipients?: string[];
}

interface RecentReport {
  id: string;
  name: string;
  date: string;
  format: string;
  size: string;
  downloadUrl: string;
}

interface AdvancedReportingProps {
  onGenerateReport?: (config: ReportConfig) => Promise<void>;
  onScheduleReport?: (config: ReportConfig) => Promise<void>;
}

export const AdvancedReporting: React.FC<AdvancedReportingProps> = ({
  onGenerateReport,
  onScheduleReport
}) => {
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    dateRange: '30days',
    metrics: ['revenue', 'bookings', 'satisfaction'],
    format: 'pdf',
    includeCharts: true,
    includeInsights: true,
    schedule: 'none',
    emailRecipients: []
  });

  const [generating, setGenerating] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const dateRangeOptions = [
    { value: '7days', label: '7 derniers jours' },
    { value: '30days', label: '30 derniers jours' },
    { value: '90days', label: '90 derniers jours' },
    { value: '1year', label: 'Dernière année' },
    { value: 'custom', label: 'Période personnalisée' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF', icon: FileText, description: 'Document formaté avec graphiques' },
    { value: 'excel', label: 'Excel', icon: FileSpreadsheet, description: 'Feuille de calcul avec données brutes' },
    { value: 'csv', label: 'CSV', icon: FileText, description: 'Données tabulaires simples' }
  ];

  const availableMetrics = [
    { id: 'revenue', label: 'Revenus', icon: DollarSign, color: 'text-green-500' },
    { id: 'bookings', label: 'Réservations', icon: Calendar, color: 'text-blue-500' },
    { id: 'satisfaction', label: 'Satisfaction', icon: Star, color: 'text-yellow-500' },
    { id: 'growth', label: 'Croissance', icon: TrendingUp, color: 'text-purple-500' },
    { id: 'performance', label: 'Performance', icon: BarChart3, color: 'text-orange-500' },
    { id: 'response-time', label: 'Temps de réponse', icon: Clock, color: 'text-indigo-500' },
    { id: 'completion-rate', label: 'Taux de complétion', icon: CheckCircle, color: 'text-teal-500' }
  ];

  const scheduleOptions = [
    { value: 'none', label: 'Une seule fois' },
    { value: 'daily', label: 'Quotidien' },
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'monthly', label: 'Mensuel' }
  ];

  const recentReports: RecentReport[] = [
    {
      id: '1',
      name: 'Rapport mensuel - Janvier 2024',
      date: '2024-01-31',
      format: 'PDF',
      size: '2.3 MB',
      downloadUrl: '#'
    },
    {
      id: '2',
      name: 'Analyse trimestrielle Q4 2023',
      date: '2023-12-31',
      format: 'Excel',
      size: '1.8 MB',
      downloadUrl: '#'
    },
    {
      id: '3',
      name: 'Rapport hebdomadaire',
      date: '2024-01-28',
      format: 'PDF',
      size: '1.2 MB',
      downloadUrl: '#'
    }
  ];

  const toggleMetric = (metricId: string) => {
    setReportConfig(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metricId)
        ? prev.metrics.filter(m => m !== metricId)
        : [...prev.metrics, metricId]
    }));
  };

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      await onGenerateReport?.(reportConfig);
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Rapport généré avec succès !');
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleScheduleReport = async () => {
    try {
      await onScheduleReport?.(reportConfig);
      alert('Rapport programmé avec succès !');
    } catch (error) {
      console.error('Error scheduling report:', error);
    }
  };

  const addEmailRecipient = () => {
    if (emailInput && emailInput.includes('@')) {
      setReportConfig(prev => ({
        ...prev,
        emailRecipients: [...(prev.emailRecipients || []), emailInput]
      }));
      setEmailInput('');
    }
  };

  const removeEmailRecipient = (email: string) => {
    setReportConfig(prev => ({
      ...prev,
      emailRecipients: prev.emailRecipients?.filter(e => e !== email)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#3B3B3B] font-heading mb-2">
          Rapports avancés
        </h2>
        <p className="text-sm text-[#6B7280]">
          Générez des rapports détaillés sur votre activité et programmez des envois automatiques
        </p>
      </div>

      {/* Configuration Card */}
      <Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] p-6">
        <h3 className="text-lg font-semibold text-[#3B3B3B] mb-6 font-heading">
          Configuration du rapport
        </h3>

        <div className="space-y-6">
          {/* Date Range & Format */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#3B3B3B] mb-2">
                Période
              </label>
              <select
                value={reportConfig.dateRange}
                onChange={(e) => setReportConfig({ ...reportConfig, dateRange: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[#EDEEEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent"
              >
                {dateRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3B3B3B] mb-2">
                Format d'export
              </label>
              <div className="grid grid-cols-3 gap-2">
                {formatOptions.map(format => {
                  const Icon = format.icon;
                  return (
                    <button
                      key={format.value}
                      onClick={() => setReportConfig({ ...reportConfig, format: format.value as any })}
                      className={cn(
                        'p-3 rounded-xl border-2 transition-all text-center',
                        reportConfig.format === format.value
                          ? 'bg-[#F97B22] text-white border-[#F97B22]'
                          : 'bg-white text-[#6B7280] border-[#EDEEEF] hover:border-[#F97B22]'
                      )}
                      title={format.description}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-xs font-medium">{format.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Metrics Selection */}
          <div>
            <label className="block text-sm font-medium text-[#3B3B3B] mb-3">
              Métriques à inclure
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {availableMetrics.map((metric) => {
                const Icon = metric.icon;
                const isSelected = reportConfig.metrics.includes(metric.id);
                
                return (
                  <button
                    key={metric.id}
                    onClick={() => toggleMetric(metric.id)}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-3 rounded-xl border-2 transition-all',
                      isSelected
                        ? 'bg-[#F97B22] text-white border-[#F97B22]'
                        : 'bg-white text-[#6B7280] border-[#EDEEEF] hover:border-[#F97B22]'
                    )}
                  >
                    <Icon className={cn('w-4 h-4', isSelected ? 'text-white' : metric.color)} />
                    <span className="text-sm font-medium">{metric.label}</span>
                    {isSelected && (
                      <CheckCircle className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Include Options */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-[#3B3B3B]">
              Options supplémentaires
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EDEEEF] cursor-pointer hover:border-[#F97B22] transition-colors">
                <input
                  type="checkbox"
                  checked={reportConfig.includeCharts}
                  onChange={(e) => setReportConfig({ ...reportConfig, includeCharts: e.target.checked })}
                  className="w-5 h-5 text-[#F97B22] border-[#EDEEEF] rounded focus:ring-[#F97B22]"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-[#3B3B3B]">Inclure les graphiques</span>
                  <p className="text-xs text-[#6B7280]">Visualisations des données</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-[#EDEEEF] cursor-pointer hover:border-[#F97B22] transition-colors">
                <input
                  type="checkbox"
                  checked={reportConfig.includeInsights}
                  onChange={(e) => setReportConfig({ ...reportConfig, includeInsights: e.target.checked })}
                  className="w-5 h-5 text-[#F97B22] border-[#EDEEEF] rounded focus:ring-[#F97B22]"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-[#3B3B3B]">Inclure les insights IA</span>
                  <p className="text-xs text-[#6B7280]">Recommandations personnalisées</p>
                </div>
              </label>
            </div>
          </div>

          {/* Schedule Options */}
          <div>
            <label className="block text-sm font-medium text-[#3B3B3B] mb-2">
              Programmation (optionnel)
            </label>
            <select
              value={reportConfig.schedule}
              onChange={(e) => setReportConfig({ ...reportConfig, schedule: e.target.value as any })}
              className="w-full px-4 py-3 bg-white border border-[#EDEEEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent"
            >
              {scheduleOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Email Recipients (if scheduled) */}
          {reportConfig.schedule !== 'none' && (
            <div>
              <label className="block text-sm font-medium text-[#3B3B3B] mb-2">
                Destinataires email
              </label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addEmailRecipient()}
                    placeholder="email@exemple.com"
                    className="flex-1 px-4 py-2 bg-white border border-[#EDEEEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent"
                  />
                  <Button
                    onClick={addEmailRecipient}
                    variant="outline"
                    className="border-[#F97B22] text-[#F97B22]"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>
                
                {reportConfig.emailRecipients && reportConfig.emailRecipients.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {reportConfig.emailRecipients.map((email, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-[#F97B22]/10 text-[#F97B22] pr-1"
                      >
                        {email}
                        <button
                          onClick={() => removeEmailRecipient(email)}
                          className="ml-2 hover:bg-[#F97B22]/20 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-[#EDEEEF]">
          <Button
            onClick={handleGenerateReport}
            disabled={generating || reportConfig.metrics.length === 0}
            className="flex-1 bg-[#F97B22] hover:bg-[#e66a1f] text-white"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Génération en cours...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Générer le rapport
              </>
            )}
          </Button>
          
          {reportConfig.schedule !== 'none' && (
            <Button
              variant="outline"
              onClick={handleScheduleReport}
              className="flex-1 border-[#F97B22] text-[#F97B22]"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Programmer
            </Button>
          )}
        </div>
      </Card>

      {/* Recent Reports */}
      <Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] p-6">
        <h3 className="text-lg font-semibold text-[#3B3B3B] mb-4 font-heading">
          Rapports récents
        </h3>
        <div className="space-y-3">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-[#EDEEEF] hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#F97B22]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#F97B22]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#3B3B3B]">
                    {report.name}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-[#6B7280]">
                    <span>{new Date(report.date).toLocaleDateString('fr-FR')}</span>
                    <span>•</span>
                    <span>{report.format}</span>
                    <span>•</span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
