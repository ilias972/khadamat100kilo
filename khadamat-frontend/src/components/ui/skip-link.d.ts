import React from 'react';
interface SkipLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare const SkipLink: React.FC<SkipLinkProps>;
interface SkipLinksProps {
    targets?: Array<{
        href: string;
        label: string;
    }>;
}
export declare const SkipLinks: React.FC<SkipLinksProps>;
export {};
