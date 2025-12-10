import React from 'react';
interface MoroccanPatternProps {
    className?: string;
    opacity?: number;
    animated?: boolean;
    patternType?: 'geometric' | 'star' | 'arabesque';
    color?: string;
}
export declare const MoroccanPattern: React.FC<MoroccanPatternProps>;
export default MoroccanPattern;
