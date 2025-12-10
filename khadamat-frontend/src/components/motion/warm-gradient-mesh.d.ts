import React from 'react';
interface WarmGradientMeshProps {
    className?: string;
    intensity?: 'subtle' | 'medium' | 'strong';
    animated?: boolean;
    children?: React.ReactNode;
}
export declare const WarmGradientMesh: React.FC<WarmGradientMeshProps>;
export default WarmGradientMesh;
