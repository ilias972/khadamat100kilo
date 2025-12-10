import React from 'react';
import { ClientBooking, ClientMessage, ClientFavorite, ProBooking, ProService, ProTransaction, SupportCategory, SupportArticle, FAQItem } from '@/lib/mocks/services-mocks';
interface StatusPillProps {
    status: ClientBooking['status'];
    className?: string;
}
export declare function StatusPill({ status, className }: StatusPillProps): React.JSX.Element;
interface BookingCardProps {
    booking: ClientBooking;
    onClick?: () => void;
    className?: string;
}
export declare function BookingCard({ booking, onClick, className }: BookingCardProps): React.JSX.Element;
interface MessageCardProps {
    message: ClientMessage;
    onClick?: () => void;
    className?: string;
}
export declare function MessageCard({ message, onClick, className }: MessageCardProps): React.JSX.Element;
interface ProBookingCardProps {
    booking: ProBooking;
    onClick?: () => void;
    onStatusChange?: (status: ProBooking['status']) => void;
    onContact?: () => void;
    className?: string;
}
export declare function ProBookingCard({ booking, onClick, onStatusChange, onContact, className }: ProBookingCardProps): React.JSX.Element;
interface SupportSearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}
export declare function SupportSearchBar({ value, onChange, placeholder, className }: SupportSearchBarProps): React.JSX.Element;
interface SupportCategoryCardProps {
    category: SupportCategory;
    onClick?: () => void;
    className?: string;
}
export declare function SupportCategoryCard({ category, onClick, className }: SupportCategoryCardProps): React.JSX.Element;
interface SupportArticleCardProps {
    article: SupportArticle;
    onClick?: () => void;
    className?: string;
}
export declare function SupportArticleCard({ article, onClick, className }: SupportArticleCardProps): React.JSX.Element;
interface SupportFAQAccordionProps {
    faq: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
    className?: string;
}
export declare function SupportFAQAccordion({ faq, isOpen, onToggle, className }: SupportFAQAccordionProps): React.JSX.Element;
interface FeedbackWidgetProps {
    onHelpful: () => void;
    onNotHelpful: () => void;
    className?: string;
}
export declare function FeedbackWidget({ onHelpful, onNotHelpful, className }: FeedbackWidgetProps): React.JSX.Element;
interface SupportContactCardProps {
    className?: string;
}
export declare function SupportContactCard({ className }: SupportContactCardProps): React.JSX.Element;
interface ServiceCardProps {
    service: ProService;
    onEdit?: () => void;
    onToggleStatus?: () => void;
    onDelete?: () => void;
    className?: string;
}
export declare function ServiceCard({ service, onEdit, onToggleStatus, onDelete, className }: ServiceCardProps): React.JSX.Element;
interface TransactionCardProps {
    transaction: ProTransaction;
    className?: string;
}
export declare function TransactionCard({ transaction, className }: TransactionCardProps): React.JSX.Element;
interface ProStatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}
export declare function ProStatsCard({ title, value, subtitle, icon: Icon, trend, className }: ProStatsCardProps): React.JSX.Element;
interface FavoriteCardProps {
    favorite: ClientFavorite;
    onClick?: () => void;
    onRemove?: () => void;
    className?: string;
}
export declare function FavoriteCard({ favorite, onClick, onRemove, className }: FavoriteCardProps): React.JSX.Element;
interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}
export declare function StatsCard({ title, value, subtitle, icon: Icon, trend, className }: StatsCardProps): React.JSX.Element;
export {};
