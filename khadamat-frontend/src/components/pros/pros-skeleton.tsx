'use client';

import React from 'react';

export const ProsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] animate-pulse">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-[#EDEEEF] rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-[#EDEEEF] rounded w-24"></div>
                <div className="h-3 bg-[#EDEEEF] rounded w-16"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-[#EDEEEF] rounded w-full"></div>
              <div className="h-4 bg-[#EDEEEF] rounded w-3/4"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-6 bg-[#EDEEEF] rounded w-16"></div>
              <div className="h-8 bg-[#EDEEEF] rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};