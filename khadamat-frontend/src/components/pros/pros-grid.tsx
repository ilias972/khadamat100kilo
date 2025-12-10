'use client';

import React from 'react';
import { ProCard } from './pro-card';
import { ProsEmptyState } from './pros-empty-state';
import { ProsSkeleton } from './pros-skeleton';
import { ProsPagination } from './pros-pagination';
import { type Professional } from '@/lib/mocks/services-mocks';

interface ProsGridProps {
  professionals: Professional[];
  isLoading?: boolean;
  isUsingMocks?: boolean;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

export const ProsGrid: React.FC<ProsGridProps> = ({
  professionals,
  isLoading = false,
  isUsingMocks = false,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  if (isLoading) {
    return <ProsSkeleton />;
  }

  if (!professionals || professionals.length === 0) {
    return <ProsEmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* Professionals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((pro) => (
          <ProCard key={pro.id} professional={pro} />
        ))}
      </div>

      {/* Pagination */}
      <ProsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};