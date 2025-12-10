'use client';

import React, { useState } from 'react';
import { 
  Edit, 
  X, 
  GripVertical, 
  Plus,
  TrendingUp,
  Calendar,
  DollarSign,
  Star,
  Users,
  BarChart3,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Widget {
  id: string;
  title: string;
  component: string;
  size: 'small' | 'medium' | 'large';
  description: string;
  icon: React.ElementType;
}

interface DashboardLayout {
  widgets: Widget[];
}

interface CustomizableDashboardProps {
  initialLayout?: DashboardLayout;
  onLayoutChange?: (layout: DashboardLayout) => void;
}

export const CustomizableDashboard: React.FC<CustomizableDashboardProps> = ({
  initialLayout,
  onLayoutChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [layout, setLayout] = useState<DashboardLayout>(
    initialLayout || {
      widgets: [
        {
          id: 'revenue-chart',
          title: 'Graphique de revenus',
          component: 'RevenueChart',
          size: 'large',
          description: 'Visualisez vos revenus dans le temps',
          icon: DollarSign
        },
        {
          id: 'booking-stats',
          title: 'Statistiques de réservations',
          component: 'BookingStats',
          size: 'medium',
          description: 'Aperçu de vos réservations',
          icon: Calendar
        },
        {
          id: 'client-satisfaction',
          title: 'Satisfaction client',
          component: 'ClientSatisfaction',
          size: 'small',
          description: 'Votre note moyenne et avis',
          icon: Star
        },
        {
          id: 'upcoming-bookings',
          title: 'Prochaines réservations',
          component: 'UpcomingBookings',
          size: 'medium',
          description: 'Vos réservations à venir',
          icon: Clock
        }
      ]
    }
  );

  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);

  const availableWidgets: Widget[] = [
    {
      id: 'revenue-chart',
      title: 'Graphique de revenus',
      component: 'RevenueChart',
      size: 'large',
      description: 'Visualisez vos revenus dans le temps',
      icon: DollarSign
    },
    {
      id: 'booking-stats',
      title: 'Statistiques de réservations',
      component: 'BookingStats',
      size: 'medium',
      description: 'Aperçu de vos réservations',
      icon: Calendar
    },
    {
      id: 'client-satisfaction',
      title: 'Satisfaction client',
      component: 'ClientSatisfaction',
      size: 'small',
      description: 'Votre note moyenne et avis',
      icon: Star
    },
    {
      id: 'upcoming-bookings',
      title: 'Prochaines réservations',
      component: 'UpcomingBookings',
      size: 'medium',
      description: 'Vos réservations à venir',
      icon: Clock
    },
    {
      id: 'performance-metrics',
      title: 'Métriques de performance',
      component: 'PerformanceMetrics',
      size: 'medium',
      description: 'Suivez vos KPIs',
      icon: TrendingUp
    },
    {
      id: 'client-list',
      title: 'Liste des clients',
      component: 'ClientList',
      size: 'large',
      description: 'Gérez vos clients',
      icon: Users
    },
    {
      id: 'analytics-overview',
      title: 'Vue d\'ensemble analytique',
      component: 'AnalyticsOverview',
      size: 'large',
      description: 'Analyse complète de votre activité',
      icon: BarChart3
    },
    {
      id: 'completion-rate',
      title: 'Taux de complétion',
      component: 'CompletionRate',
      size: 'small',
      description: 'Projets terminés avec succès',
      icon: CheckCircle
    }
  ];

  const handleSaveLayout = () => {
    setIsEditing(false);
    onLayoutChange?.(layout);
    // In production, save to backend
    localStorage.setItem('dashboard-layout', JSON.stringify(layout));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Restore from localStorage or initial layout
    const saved = localStorage.getItem('dashboard-layout');
    if (saved) {
      setLayout(JSON.parse(saved));
    }
  };

  const handleRemoveWidget = (widgetId: string) => {
    setLayout({
      ...layout,
      widgets: layout.widgets.filter(w => w.id !== widgetId)
    });
  };

  const handleAddWidget = (widget: Widget) => {
    if (!layout.widgets.find(w => w.id === widget.id)) {
      setLayout({
        ...layout,
        widgets: [...layout.widgets, widget]
      });
    }
  };

  const handleDragStart = (widgetId: string) => {
    setDraggedWidget(widgetId);
  };

  const handleDragOver = (e: React.DragEvent, targetWidgetId: string) => {
    e.preventDefault();
    if (!draggedWidget || draggedWidget === targetWidgetId) return;

    const draggedIndex = layout.widgets.findIndex(w => w.id === draggedWidget);
    const targetIndex = layout.widgets.findIndex(w => w.id === targetWidgetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newWidgets = [...layout.widgets];
    const [removed] = newWidgets.splice(draggedIndex, 1);
    newWidgets.splice(targetIndex, 0, removed);

    setLayout({ ...layout, widgets: newWidgets });
  };

  const handleDragEnd = () => {
    setDraggedWidget(null);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Controls */}
      <Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#3B3B3B] font-heading">
              Mon tableau de bord
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              {isEditing ? 'Personnalisez votre tableau de bord' : 'Vue d\'ensemble de votre activité'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className="border-[#F97B22] text-[#F97B22] hover:bg-[#F97B22] hover:text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Personnaliser
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSaveLayout}
                  className="bg-[#F97B22] hover:bg-[#e66a1f] text-white"
                >
                  Sauvegarder
                </Button>
                <Button variant="outline" onClick={handleCancelEdit}>
                  Annuler
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Edit Mode Instructions */}
        {isEditing && (
          <div className="mt-4 p-4 bg-[#F97B22]/10 border border-[#F97B22]/20 rounded-xl">
            <p className="text-sm text-[#3B3B3B]">
              💡 <strong>Mode édition :</strong> Glissez-déposez les widgets pour les réorganiser, 
              cliquez sur <X className="inline w-3 h-3" /> pour les supprimer, 
              ou ajoutez de nouveaux widgets depuis la bibliothèque ci-dessous.
            </p>
          </div>
        )}
      </Card>

      {/* Widget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {layout.widgets.map((widget) => (
          <DraggableWidget
            key={widget.id}
            widget={widget}
            isEditing={isEditing}
            isDragging={draggedWidget === widget.id}
            onRemove={handleRemoveWidget}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>

      {/* Widget Library (shown in edit mode) */}
      {isEditing && (
        <Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] p-6">
          <h3 className="text-lg font-semibold text-[#3B3B3B] mb-4 font-heading">
            Bibliothèque de widgets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {availableWidgets.map((widget) => {
              const isAdded = layout.widgets.some(w => w.id === widget.id);
              const Icon = widget.icon;
              
              return (
                <button
                  key={widget.id}
                  onClick={() => !isAdded && handleAddWidget(widget)}
                  disabled={isAdded}
                  className={cn(
                    'p-4 rounded-xl border-2 border-dashed text-left transition-all',
                    isAdded
                      ? 'border-[#EDEEEF] bg-[#EDEEEF]/50 cursor-not-allowed opacity-50'
                      : 'border-[#F97B22]/30 hover:border-[#F97B22] hover:bg-[#F97B22]/5 cursor-pointer'
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={cn(
                      'w-5 h-5 flex-shrink-0',
                      isAdded ? 'text-[#6B7280]' : 'text-[#F97B22]'
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#3B3B3B] mb-1">
                        {widget.title}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {widget.description}
                      </p>
                      {isAdded && (
                        <p className="text-xs text-[#F97B22] mt-2">
                          ✓ Déjà ajouté
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

interface DraggableWidgetProps {
  widget: Widget;
  isEditing: boolean;
  isDragging: boolean;
  onRemove: (widgetId: string) => void;
  onDragStart: (widgetId: string) => void;
  onDragOver: (e: React.DragEvent, widgetId: string) => void;
  onDragEnd: () => void;
}

const DraggableWidget: React.FC<DraggableWidgetProps> = ({
  widget,
  isEditing,
  isDragging,
  onRemove,
  onDragStart,
  onDragOver,
  onDragEnd
}) => {
  const Icon = widget.icon;

  return (
    <div
      draggable={isEditing}
      onDragStart={() => onDragStart(widget.id)}
      onDragOver={(e) => onDragOver(e, widget.id)}
      onDragEnd={onDragEnd}
      className={cn(
        'relative bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] border border-[#EDEEEF] shadow-card transition-all',
        isEditing && 'cursor-move border-2 border-dashed border-[#F97B22]/30 hover:border-[#F97B22]',
        isDragging && 'opacity-50 scale-95',
        widget.size === 'large' && 'col-span-1 md:col-span-2 lg:col-span-3',
        widget.size === 'medium' && 'col-span-1 md:col-span-2',
        widget.size === 'small' && 'col-span-1'
      )}
    >
      {/* Edit Mode Controls */}
      {isEditing && (
        <>
          {/* Drag Handle */}
          <div className="absolute top-2 left-2 w-8 h-8 bg-[#F97B22] rounded-lg cursor-move flex items-center justify-center z-10">
            <GripVertical className="w-4 h-4 text-white" />
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(widget.id)}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Widget Content */}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#F97B22]/10 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#F97B22]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#3B3B3B]">
              {widget.title}
            </h3>
            <p className="text-xs text-[#6B7280]">{widget.description}</p>
          </div>
        </div>

        {/* Widget Component Placeholder */}
        <WidgetContent component={widget.component} size={widget.size} />
      </div>
    </div>
  );
};

// Widget Content Component (renders actual widget based on type)
const WidgetContent: React.FC<{ component: string; size: string }> = ({ component, size }) => {
  // This would render the actual widget component
  // For now, showing placeholder content
  
  const placeholderContent = {
    RevenueChart: (
      <div className="space-y-2">
        <div className="flex items-end space-x-2 h-32">
          {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-[#F97B22] to-[#F97B22]/50 rounded-t"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <p className="text-2xl font-bold text-[#3B3B3B]">18,500 DH</p>
        <p className="text-sm text-green-600">+15.2% ce mois</p>
      </div>
    ),
    BookingStats: (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#6B7280]">Total</span>
          <span className="text-2xl font-bold text-[#3B3B3B]">127</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">Confirmées</span>
            <span className="font-medium text-green-600">45</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">En attente</span>
            <span className="font-medium text-yellow-600">12</span>
          </div>
        </div>
      </div>
    ),
    ClientSatisfaction: (
      <div className="text-center space-y-2">
        <div className="text-4xl font-bold text-[#3B3B3B]">4.9</div>
        <div className="flex items-center justify-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-sm text-[#6B7280]">156 avis</p>
      </div>
    ),
    UpcomingBookings: (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
            <Calendar className="w-4 h-4 text-[#F97B22]" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[#3B3B3B]">Service {i}</p>
              <p className="text-xs text-[#6B7280]">Demain à 10:00</p>
            </div>
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className="min-h-[120px]">
      {placeholderContent[component as keyof typeof placeholderContent] || (
        <div className="flex items-center justify-center h-32 text-[#6B7280]">
          Widget: {component}
        </div>
      )}
    </div>
  );
};
