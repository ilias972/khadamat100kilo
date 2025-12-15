'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, MapPin, MessageSquare, Heart, Star, TrendingUp, DollarSign, Users, CheckCircle, Edit, Trash2, Eye, EyeOff, Search, HelpCircle, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, Send, Mail, Phone } from 'lucide-react';
import { ClientBooking, ClientMessage, ClientFavorite, ProBooking, ProService, ProTransaction, SupportCategory, SupportArticle, FAQItem } from '@/lib/mocks/services-mocks';

interface StatusPillProps {
  status: ClientBooking['status'];
  className?: string;
}

export function StatusPill({ status, className }: StatusPillProps) {
  const statusConfig = {
    pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
    confirmed: { label: 'Confirmé', color: 'bg-blue-100 text-blue-800' },
    in_progress: { label: 'En cours', color: 'bg-orange-100 text-orange-800' },
    completed: { label: 'Terminé', color: 'bg-green-100 text-green-800' },
    cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800' },
  };

  const config = statusConfig[status];

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      config.color,
      className
    )}>
      {config.label}
    </span>
  );
}

interface BookingCardProps {
  booking: ClientBooking;
  onClick?: () => void;
  className?: string;
}

interface MessageCardProps {
  message: ClientMessage;
  onClick?: () => void;
  className?: string;
}

export function BookingCard({ booking, onClick, className }: BookingCardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.02] cursor-pointer',
        className
      )}
      onClick={onClick}
      data-testid="booking-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#EDEEEF] rounded-full flex items-center justify-center">
            {booking.professionalAvatar ? (
              <img
                src={booking.professionalAvatar}
                alt={booking.professionalName}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 bg-[#F97B22] rounded-full" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {booking.professionalName}
            </h3>
            <p className="text-sm text-text-secondary">{booking.serviceName}</p>
          </div>
        </div>
        <StatusPill status={booking.status} />
      </div>

      <div className="space-y-2 text-sm text-text-secondary">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(booking.scheduledDate).toLocaleDateString('fr-FR')} à {booking.scheduledTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{booking.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{booking.location}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border-light">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#F97B22]">
            {booking.price} DH
          </span>
          <span className="text-sm text-text-secondary">
            {new Date(booking.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>
      </div>
    </div>
  );
}

export function MessageCard({ message, onClick, className }: MessageCardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.02] cursor-pointer',
        !message.isRead && 'ring-2 ring-[#F97B22]/20',
        className
      )}
      onClick={onClick}
      data-testid="message-card"
    >
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-[#EDEEEF] rounded-full flex items-center justify-center flex-shrink-0">
          {message.professionalAvatar ? (
            <img
              src={message.professionalAvatar}
              alt={message.professionalName}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-5 h-5 bg-[#F97B22] rounded-full" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-text-primary truncate">
              {message.professionalName}
            </h3>
            <span className="text-xs text-text-secondary">
              {new Date(message.createdAt).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <p className="text-sm text-text-secondary line-clamp-2">
            {message.content}
          </p>
          {message.bookingId && (
            <p className="text-xs text-[#F97B22] mt-1">
              Concernant une réservation
            </p>
          )}
        </div>
        {!message.isRead && (
          <div className="w-2 h-2 bg-[#F97B22] rounded-full flex-shrink-0 mt-2" />
        )}
      </div>
    </div>
  );
}

// Pro-specific components
interface ProBookingCardProps {
   booking: ProBooking;
   onClick?: () => void;
   onStatusChange?: (status: ProBooking['status']) => void;
   onContact?: () => void;
   className?: string;
}

export function ProBookingCard({ booking, onClick, onStatusChange, onContact, className }: ProBookingCardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.02] cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#EDEEEF] rounded-full flex items-center justify-center">
            {booking.clientAvatar ? (
              <img
                src={booking.clientAvatar}
                alt={booking.clientName}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 bg-[#F97B22] rounded-full" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {booking.clientName}
            </h3>
            <p className="text-sm text-text-secondary">{booking.serviceName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <StatusPill status={booking.status} />
          {booking.unreadMessages > 0 && (
            <div className="w-2 h-2 bg-[#F97B22] rounded-full" />
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm text-text-secondary mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(booking.scheduledDate).toLocaleDateString('fr-FR')} à {booking.scheduledTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{booking.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{booking.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-[#F97B22]">
          {booking.price} DH
        </div>
        <div className="flex items-center space-x-2">
          {onContact && booking.status !== 'pending' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onContact();
              }}
              className="flex items-center space-x-1 px-3 py-1 bg-[#F97B22]/10 text-[#F97B22] rounded-lg text-sm font-medium hover:bg-[#F97B22]/20 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contacter</span>
            </button>
          )}
          {booking.status === 'pending' && onStatusChange && (
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange('confirmed');
                }}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
              >
                Accepter
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStatusChange('cancelled');
                }}
                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
              >
                Refuser
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Support-specific components
interface SupportSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SupportSearchBar({ value, onChange, placeholder = "Rechercher dans l'aide...", className }: SupportSearchBarProps) {
  return (
    <div className={cn(
      'relative max-w-2xl mx-auto',
      className
    )}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border border-border-light rounded-[24px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-[#F97B22]/20 focus:border-[#F97B22] transition-all duration-200 text-lg"
      />
    </div>
  );
}

interface SupportCategoryCardProps {
  category: SupportCategory;
  onClick?: () => void;
  className?: string;
}

export function SupportCategoryCard({ category, onClick, className }: SupportCategoryCardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.02] cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${category.color}20` }}
        >
          <HelpCircle className="w-6 h-6" style={{ color: category.color }} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-text-primary font-heading">
            {category.name}
          </h3>
          <p className="text-sm text-text-secondary">
            {category.articleCount} article{category.articleCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      <p className="text-text-secondary text-sm leading-relaxed">
        {category.description}
      </p>
    </div>
  );
}

interface SupportArticleCardProps {
  article: SupportArticle;
  onClick?: () => void;
  className?: string;
}

export const SupportArticleCard = React.memo(function SupportArticleCard({ article, onClick, className }: SupportArticleCardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.02] cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${article.categoryColor}20`,
            color: article.categoryColor
          }}
        >
          {article.categoryName}
        </span>
        <div className="flex items-center space-x-1 text-xs text-text-muted">
          <Eye className="w-3 h-3" />
          <span>{article.views}</span>
        </div>
      </div>

      <h3 className="text-lg font-bold text-text-primary mb-2 line-clamp-2 font-heading">
        {article.title}
      </h3>

      <p className="text-text-secondary text-sm mb-3 line-clamp-3">
        {article.excerpt}
      </p>

      <div className="flex items-center justify-between text-xs text-text-muted">
        <span>{article.author}</span>
        <span>{new Date(article.updatedAt).toLocaleDateString('fr-FR')}</span>
      </div>
    </div>
  );
});

interface SupportFAQAccordionProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function SupportFAQAccordion({ faq, isOpen, onToggle, className }: SupportFAQAccordionProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden',
        className
      )}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/20 transition-colors"
      >
        <h3 className="text-lg font-semibold text-text-primary pr-4 font-heading">
          {faq.question}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#F97B22] flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#F97B22] flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 pb-4">
          <div className="border-t border-border-light pt-4">
            <p className="text-text-secondary leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface FeedbackWidgetProps {
  onHelpful: () => void;
  onNotHelpful: () => void;
  className?: string;
}

export function FeedbackWidget({ onHelpful, onNotHelpful, className }: FeedbackWidgetProps) {
  return (
    <div className={cn(
      'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 text-center',
      className
    )}>
      <h3 className="text-lg font-bold text-text-primary mb-2 font-heading">
        Cet article vous a-t-il été utile ?
      </h3>
      <p className="text-text-secondary text-sm mb-4">
        Votre retour nous aide à améliorer notre aide.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onHelpful}
          className="flex items-center space-x-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Oui</span>
        </button>
        <button
          onClick={onNotHelpful}
          className="flex items-center space-x-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>Non</span>
        </button>
      </div>
    </div>
  );
}

interface SupportContactCardProps {
  className?: string;
}

export function SupportContactCard({ className }: SupportContactCardProps) {
  return (
    <div className={cn(
      'bg-gradient-to-br from-[#F97B22]/10 to-[#F97B22]/5 backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(249,123,34,0.1)] p-6',
      className
    )}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-text-primary mb-2 font-heading">
          Besoin d'aide supplémentaire ?
        </h3>
        <p className="text-text-secondary">
          Notre équipe est là pour vous accompagner
        </p>
      </div>

      <div className="space-y-3">
        <button className="w-full bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] py-3 font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
          <MessageSquare className="w-4 h-4" />
          <span>Contacter le support</span>
        </button>

        <div className="flex space-x-3">
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-border-light rounded-lg hover:bg-white/70 transition-colors">
            <Mail className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur-sm border border-border-light rounded-lg hover:bg-white/70 transition-colors">
            <Phone className="w-4 h-4" />
            <span className="text-sm">Téléphone</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface ServiceCardProps {
  service: ProService;
  onEdit?: () => void;
  onToggleStatus?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function ServiceCard({ service, onEdit, onToggleStatus, onDelete, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6',
        !service.isActive && 'opacity-60',
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-text-primary">
              {service.name}
            </h3>
            {!service.isActive && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                Désactivé
              </span>
            )}
          </div>
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {service.description}
          </p>
          <div className="flex items-center space-x-4 text-sm text-text-muted">
            <span>{service.category}</span>
            <span>{service.duration}</span>
            <span>{service.bookingCount} réservations</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-[#F97B22] mb-2">
            {service.price} DH
          </div>
          <div className="flex space-x-1">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 text-text-secondary hover:text-[#F97B22] hover:bg-[#F97B22]/10 rounded-lg transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
            {onToggleStatus && (
              <button
                onClick={onToggleStatus}
                className="p-2 text-text-secondary hover:text-[#F97B22] hover:bg-[#F97B22]/10 rounded-lg transition-colors"
              >
                {service.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TransactionCardProps {
  transaction: ProTransaction;
  className?: string;
}

export function TransactionCard({ transaction, className }: TransactionCardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#EDEEEF] rounded-full flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-[#F97B22]" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">
              {transaction.clientName}
            </h3>
            <p className="text-sm text-text-secondary">
              {transaction.serviceName}
            </p>
            <p className="text-xs text-text-muted">
              {new Date(transaction.createdAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-bold text-[#F97B22]">
            +{transaction.netAmount} DH
          </div>
          <div className="text-sm text-text-secondary">
            Frais: {transaction.fee} DH
          </div>
          <div className={cn(
            'text-sm font-medium',
            transaction.status === 'completed' ? 'text-green-600' :
            transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
          )}>
            {transaction.status === 'completed' ? 'Payé' :
             transaction.status === 'pending' ? 'En attente' : 'Échec'}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function ProStatsCard({ title, value, subtitle, icon: Icon, trend, className }: ProStatsCardProps) {
  return (
    <div className={cn(
      'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6',
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="text-3xl font-bold text-text-primary mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              'text-sm font-medium mt-2 flex items-center',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              <TrendingUp className={cn(
                'w-4 h-4 mr-1',
                !trend.isPositive && 'rotate-180'
              )} />
              {trend.isPositive ? '+' : ''}{trend.value}% ce mois
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-[#F97B22]/10 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#F97B22]" />
        </div>
      </div>
    </div>
  );
}

interface FavoriteCardProps {
  favorite: ClientFavorite;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

export function FavoriteCard({ favorite, onClick, onRemove, className }: FavoriteCardProps) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.02] cursor-pointer group',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#EDEEEF] rounded-full flex items-center justify-center">
            {favorite.professionalAvatar ? (
              <img
                src={favorite.professionalAvatar}
                alt={favorite.professionalName}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-6 h-6 bg-[#F97B22] rounded-full" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {favorite.professionalName}
            </h3>
            <p className="text-sm text-text-secondary capitalize">
              {favorite.serviceCategory}
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
        >
          <Heart className="w-4 h-4 fill-current" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-text-primary">
            {favorite.rating}
          </span>
          <span className="text-sm text-text-secondary">
            ({favorite.reviewCount} avis)
          </span>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#F97B22]">
            À partir de {favorite.startingPrice} DH
          </p>
          <p className="text-xs text-text-secondary">
            {favorite.cityName}
          </p>
        </div>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ title, value, subtitle, icon: Icon, trend, className }: StatsCardProps) {
  return (
    <div className={cn(
      'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6',
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="text-3xl font-bold text-text-primary mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              'text-sm font-medium mt-2',
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            )}>
              {trend.isPositive ? '+' : ''}{trend.value}% ce mois
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-[#F97B22]/10 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#F97B22]" />
        </div>
      </div>
    </div>
  );
}