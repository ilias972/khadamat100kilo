'use client';
import React, { useState } from 'react';
import { User } from 'lucide-react';

export function Avatar({ src, alt, className = "w-10 h-10" }: { src?: string | null, alt: string, className?: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`${className} rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-200`}>
        <span className="font-bold text-sm">{alt?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={`${className} rounded-full object-cover border border-gray-200`}
      onError={() => setError(true)}
    />
  );
}