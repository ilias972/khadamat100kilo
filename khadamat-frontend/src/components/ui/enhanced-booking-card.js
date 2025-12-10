'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedBookingCard = EnhancedBookingCard;
exports.ProfessionalBookingCard = ProfessionalBookingCard;
const react_1 = __importDefault(require("react"));
const utils_1 = require("@/lib/utils");
const framer_motion_1 = require("framer-motion");
const animations_1 = require("@/lib/animations");
const lucide_react_1 = require("lucide-react");
const StatusPill = ({ status, className }) => {
    const statusConfig = {
        pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
        confirmed: { label: 'Confirmé', color: 'bg-blue-100 text-blue-800 border-blue-200' },
        in_progress: { label: 'En cours', color: 'bg-orange-100 text-orange-800 border-orange-200' },
        completed: { label: 'Terminé', color: 'bg-green-100 text-green-800 border-green-200' },
        cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800 border-red-200' },
    };
    const config = statusConfig[status];
    return (<span className={(0, utils_1.cn)('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border', config.color, className)}>
      {config.label}
    </span>);
};
function EnhancedBookingCard({ variant = 'default', size = 'md', booking, onClick, onContact, onReschedule, onCancel, onRate, onMessage, onFavorite, showPaymentInfo = true, showNotes = false, showTimeline = false, interactive = true, className }) {
    const isCompact = variant === 'compact' || variant === 'mobile';
    const isList = variant === 'list';
    const isDetailed = variant === 'detailed';
    const isMobile = variant === 'mobile';
    const handleContact = (e) => {
        e.stopPropagation();
        onContact?.();
    };
    const handleMessage = (e) => {
        e.stopPropagation();
        onMessage?.();
    };
    const handleFavorite = (e) => {
        e.stopPropagation();
        onFavorite?.();
    };
    const baseClasses = (0, utils_1.cn)('bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card', 'border border-white/20 transition-all duration-200', {
        'cursor-pointer hover:shadow-card-hover hover:scale-[1.02]': interactive,
        'p-3': isCompact || isMobile,
        'p-4': variant === 'default',
        'p-6': isDetailed,
        'flex items-center space-x-4 p-4': isList
    }, interactive && 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]', className);
    const content = (<>
      
      <div className={(0, utils_1.cn)('flex items-start justify-between', isCompact ? 'mb-3' : isDetailed ? 'mb-6' : 'mb-4')}>
        <div className="flex items-center space-x-3">
          <div className={(0, utils_1.cn)('bg-[#EDEEEF] rounded-full flex items-center justify-center', isCompact ? 'w-10 h-10' : 'w-12 h-12')}>
            {booking.professionalAvatar ? (<img src={booking.professionalAvatar} alt={booking.professionalName} className={(0, utils_1.cn)('rounded-full object-cover', isCompact ? 'w-10 h-10' : 'w-12 h-12')}/>) : (<div className={(0, utils_1.cn)('bg-[#F97B22] rounded-full', isCompact ? 'w-5 h-5' : 'w-6 h-6')}/>)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={(0, utils_1.cn)('font-semibold text-text-primary truncate', isCompact ? 'text-sm' : isDetailed ? 'text-xl' : 'text-lg')}>
              {booking.professionalName}
            </h3>
            <p className={(0, utils_1.cn)('text-text-secondary truncate', isCompact ? 'text-xs' : 'text-sm')}>
              {booking.serviceName}
            </p>
            {isDetailed && (<p className="text-xs text-text-muted mt-1">
                {booking.serviceCategory}
              </p>)}
          </div>
        </div>
        <StatusPill status={booking.status}/>
      </div>

      
      {!isCompact && (<div className={(0, utils_1.cn)('space-y-2 text-sm text-text-secondary', isDetailed ? 'mb-6' : 'mb-4')}>
          <div className="flex items-center space-x-2">
            <lucide_react_1.Calendar className="w-4 h-4 text-[#F97B22]"/>
            <span>
              {new Date(booking.scheduledDate).toLocaleDateString('fr-FR')} à {booking.scheduledTime}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <lucide_react_1.Clock className="w-4 h-4 text-[#F97B22]"/>
            <span>{booking.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <lucide_react_1.MapPin className="w-4 h-4 text-[#F97B22]"/>
            <span>{booking.location}</span>
          </div>
        </div>)}

      
      {isCompact && (<div className="flex items-center justify-between text-xs text-text-secondary mb-3">
          <div className="flex items-center space-x-3">
            <span>{new Date(booking.scheduledDate).toLocaleDateString('fr-FR')}</span>
            <span>{booking.location}</span>
          </div>
        </div>)}

      
      {showPaymentInfo && (<div className={(0, utils_1.cn)('border-t border-border-light', isCompact ? 'pt-3' : 'pt-4')}>
          <div className="flex items-center justify-between">
            <span className={(0, utils_1.cn)('font-bold text-[#F97B22]', isCompact ? 'text-sm' : 'text-lg')}>
              {booking.price} DH
            </span>
            <span className="text-sm text-text-secondary">
              {new Date(booking.createdAt).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>)}

      
      {showNotes && booking.notes && (<div className="mt-4 p-3 bg-[#F97B22]/5 rounded-lg">
          <p className="text-sm text-text-secondary">
            <strong>Notes:</strong> {booking.notes}
          </p>
        </div>)}

      
      {isDetailed && (<div className="flex flex-wrap gap-2 mt-6">
          {booking.status === 'completed' && onRate && (<button onClick={(e) => {
                    e.stopPropagation();
                    onRate();
                }} className="flex items-center space-x-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors">
              <lucide_react_1.Star className="w-4 h-4"/>
              <span>Noter</span>
            </button>)}
          
          {['confirmed', 'in_progress'].includes(booking.status) && onContact && (<button onClick={handleContact} className="flex items-center space-x-2 px-3 py-2 bg-[#F97B22]/10 text-[#F97B22] rounded-lg text-sm font-medium hover:bg-[#F97B22]/20 transition-colors">
              <lucide_react_1.Phone className="w-4 h-4"/>
              <span>Contacter</span>
            </button>)}
          
          {onMessage && (<button onClick={handleMessage} className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
              <lucide_react_1.MessageSquare className="w-4 h-4"/>
              <span>Message</span>
            </button>)}
          
          {onFavorite && (<button onClick={handleFavorite} className="flex items-center space-x-2 px-3 py-2 bg-pink-100 text-pink-700 rounded-lg text-sm font-medium hover:bg-pink-200 transition-colors">
              <lucide_react_1.Heart className="w-4 h-4"/>
              <span>Favori</span>
            </button>)}
        </div>)}
    </>);
    if (interactive && onClick) {
        return (<framer_motion_1.motion.div className={baseClasses} onClick={onClick} whileHover={animations_1.microInteractions.cardTilt} whileTap={{ scale: 0.98 }}>
        {content}
      </framer_motion_1.motion.div>);
    }
    return <div className={baseClasses}>{content}</div>;
}
function ProfessionalBookingCard({ variant = 'default', size = 'md', booking, onClick, onStatusChange, onContact, onMessage, showPaymentInfo = true, interactive = true, className }) {
    const isCompact = variant === 'compact' || variant === 'mobile';
    const isList = variant === 'list';
    const isDetailed = variant === 'detailed';
    const isMobile = variant === 'mobile';
    const baseClasses = (0, utils_1.cn)('bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card', 'border border-white/20 transition-all duration-200', interactive && 'cursor-pointer hover:shadow-card-hover hover:scale-[1.02]', {
        'p-3': isCompact || isMobile,
        'p-4': variant === 'default',
        'p-6': isDetailed,
        'flex items-center space-x-4 p-4': isList
    }, interactive && 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]', booking.isUrgent && 'border-l-4 border-l-red-500', className);
    const handleStatusChange = (newStatus) => {
        onStatusChange?.(newStatus);
    };
    const content = (<>
      
      <div className={(0, utils_1.cn)('flex items-start justify-between', isCompact ? 'mb-3' : isDetailed ? 'mb-6' : 'mb-4')}>
        <div className="flex items-center space-x-3">
          <div className={(0, utils_1.cn)('bg-[#EDEEEF] rounded-full flex items-center justify-center relative', isCompact ? 'w-10 h-10' : 'w-12 h-12')}>
            {booking.clientAvatar ? (<img src={booking.clientAvatar} alt={booking.clientName} className={(0, utils_1.cn)('rounded-full object-cover', isCompact ? 'w-10 h-10' : 'w-12 h-12')}/>) : (<div className={(0, utils_1.cn)('bg-[#F97B22] rounded-full', isCompact ? 'w-5 h-5' : 'w-6 h-6')}/>)}
            {booking.unreadMessages > 0 && (<div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {booking.unreadMessages}
              </div>)}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={(0, utils_1.cn)('font-semibold text-text-primary truncate', isCompact ? 'text-sm' : isDetailed ? 'text-xl' : 'text-lg')}>
              {booking.clientName}
            </h3>
            <p className={(0, utils_1.cn)('text-text-secondary truncate', isCompact ? 'text-xs' : 'text-sm')}>
              {booking.serviceName}
            </p>
            {isDetailed && (<p className="text-xs text-text-muted mt-1">
                {booking.serviceCategory}
              </p>)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <StatusPill status={booking.status}/>
          {booking.isUrgent && (<lucide_react_1.AlertCircle className="w-5 h-5 text-red-500"/>)}
        </div>
      </div>

      
      {!isCompact && (<div className={(0, utils_1.cn)('space-y-2 text-sm text-text-secondary', isDetailed ? 'mb-6' : 'mb-4')}>
          <div className="flex items-center space-x-2">
            <lucide_react_1.Calendar className="w-4 h-4 text-[#F97B22]"/>
            <span>
              {new Date(booking.scheduledDate).toLocaleDateString('fr-FR')} à {booking.scheduledTime}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <lucide_react_1.Clock className="w-4 h-4 text-[#F97B22]"/>
            <span>{booking.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <lucide_react_1.MapPin className="w-4 h-4 text-[#F97B22]"/>
            <span>{booking.location}</span>
          </div>
        </div>)}

      
      {showPaymentInfo && (<div className={(0, utils_1.cn)('border-t border-border-light flex items-center justify-between', isCompact ? 'pt-3' : 'pt-4')}>
          <div className={(0, utils_1.cn)('font-bold text-[#F97B22]', isCompact ? 'text-sm' : 'text-lg')}>
            {booking.price} DH
          </div>
          <span className="text-sm text-text-secondary">
            {new Date(booking.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>)}

      
      <div className={(0, utils_1.cn)('flex flex-wrap gap-2', isDetailed ? 'mt-6' : 'mt-4')}>
        {booking.status === 'pending' && onStatusChange && (<div className="flex space-x-2">
            <button onClick={(e) => {
                e.stopPropagation();
                handleStatusChange('confirmed');
            }} className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
              Accepter
            </button>
            <button onClick={(e) => {
                e.stopPropagation();
                handleStatusChange('cancelled');
            }} className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
              Refuser
            </button>
          </div>)}
        
        {['confirmed', 'in_progress'].includes(booking.status) && onContact && (<button onClick={(e) => {
                e.stopPropagation();
                onContact();
            }} className="flex items-center space-x-2 px-3 py-2 bg-[#F97B22]/10 text-[#F97B22] rounded-lg text-sm font-medium hover:bg-[#F97B22]/20 transition-colors">
            <lucide_react_1.MessageSquare className="w-4 h-4"/>
            <span>Contacter</span>
          </button>)}
      </div>
    </>);
    if (interactive && onClick) {
        return (<framer_motion_1.motion.div className={baseClasses} onClick={onClick} whileHover={animations_1.microInteractions.cardTilt} whileTap={{ scale: 0.98 }}>
        {content}
      </framer_motion_1.motion.div>);
    }
    return <div className={baseClasses}>{content}</div>;
}
//# sourceMappingURL=enhanced-booking-card.js.map