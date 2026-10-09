'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ContentCard } from './ContentCard';

interface ContentItem {
  id: string;
  title: string;
  description?: string;
  contentType: number;
  isPremium: boolean;
  tags?: string[];
  primaryAttachmentUrl?: string | null;
  authorId?: string;
  publishedAt?: string;
}

interface ContentGridProps {
  items: ContentItem[];
  loading: boolean;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm animate-pulse">
      <div className="h-40 bg-slate-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-full" />
        <div className="h-3 bg-slate-200 rounded w-2/3" />
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-12 bg-slate-200 rounded-full" />
          <div className="h-5 w-16 bg-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function ContentGrid({
  items,
  loading,
  totalItems,
  totalPages,
  currentPage,
  onPageChange,
}: ContentGridProps) {
  const router = useRouter();

  if (loading) {
    return (
      <div>
        <div className="h-4 w-40 bg-slate-200 rounded animate-pulse mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4 select-none">🔍</div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No content found</h3>
        <p className="text-slate-500 max-w-sm">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-4">
        Showing <span className="font-semibold text-slate-700">{items.length}</span> of{' '}
        <span className="font-semibold text-slate-700">{totalItems}</span> resources
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((item) => (
          <ContentCard key={item.id} item={item as any} onClick={() => router.push(`/learner/catalog/${item.id}`)} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;
            // Show first, last, current ±1, and ellipsis
            if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-9 h-9 text-sm font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md scale-105'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              );
            }
            if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="text-slate-400">…</span>;
            }
            return null;
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
