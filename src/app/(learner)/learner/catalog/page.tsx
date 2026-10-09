'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import api from '@/lib/api/axios';
import CatalogFilterSidebar from '@/components/learner/catalog/CatalogFilterSidebar';
import ContentGrid from '@/components/learner/catalog/ContentGrid';

interface CatalogResult {
  items: any[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
}

export default function CatalogPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<CatalogResult>({ items: [], totalItems: 0, totalPages: 1, pageNumber: 1 });
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filters = {
    gradeId:     searchParams.get('gradeId')     ?? '',
    subjectId:   searchParams.get('subjectId')   ?? '',
    topicId:     searchParams.get('topicId')     ?? '',
    contentType: searchParams.get('contentType') ?? '',
    isPremium:   searchParams.get('isPremium')   ?? '',
    q:           searchParams.get('q')           ?? '',
    page:        parseInt(searchParams.get('page') ?? '1', 10),
  };

  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== 'page') params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const clearAll = useCallback(() => {
    setSearchInput('');
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.q)           params.set('searchTerm', filters.q);
        if (filters.gradeId)     params.set('gradeLevelId', filters.gradeId);
        if (filters.subjectId)   params.set('subjectId', filters.subjectId);
        if (filters.topicId)     params.set('strandId', filters.topicId);
        if (filters.contentType) params.set('contentType', filters.contentType);
        if (filters.isPremium)   params.set('isPremium', filters.isPremium);
        params.set('pageNumber', String(filters.page));
        params.set('pageSize', '16');

        const res = await api.get(`/catalog?${params.toString()}`);
        const data = res.data?.data;
        setResult({
          items: data?.Items ?? data?.items ?? [],
          totalItems: data?.TotalItems ?? data?.totalItems ?? 0,
          totalPages: data?.TotalPages ?? data?.totalPages ?? 1,
          pageNumber: data?.PageNumber ?? data?.pageNumber ?? 1,
        });
      } catch (err) {
        console.error('Catalog fetch failed', err);
        setResult({ items: [], totalItems: 0, totalPages: 1, pageNumber: 1 });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchParams]);

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParam('q', val), 400);
  };

  const contentTypeLabels: Record<string, string> = {
    '0': 'Document', '1': 'Video', '2': 'Interactive', '3': 'Audio', '4': 'Simulation'
  };

  const activePillFilters = [
    filters.q && { label: `"${filters.q}"`, key: 'q' },
    filters.gradeId && { label: `Grade filter active`, key: 'gradeId' },
    filters.subjectId && { label: `Subject filter active`, key: 'subjectId' },
    filters.topicId && { label: `Topic filter active`, key: 'topicId' },
    filters.contentType && { label: contentTypeLabels[filters.contentType] ?? '', key: 'contentType' },
    filters.isPremium === 'true' && { label: '⭐ Premium only', key: 'isPremium' },
    filters.isPremium === 'false' && { label: '🆓 Free only', key: 'isPremium' },
  ].filter(Boolean) as { label: string; key: string }[];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#163A5F] via-[#1A4F82] to-[#1cb5c5] px-6 py-10 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
            📚 Explore Curriculum
          </h1>
          <p className="text-blue-200 text-base md:text-lg mb-6">
            Discover thousands of high-quality educational resources tailored to your level.
          </p>
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Search by title, topic, or keyword…"
              className="w-full pl-12 pr-12 py-3.5 bg-white/10 backdrop-blur-md border border-white/25 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/20 transition-all text-base"
            />
            {searchInput && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute inset-y-0 right-4 flex items-center text-blue-300 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <CatalogFilterSidebar
            selectedGradeId={filters.gradeId}
            selectedSubjectId={filters.subjectId}
            selectedTopicId={filters.topicId}
            selectedContentType={filters.contentType}
            isPremium={filters.isPremium}
            onFilterChange={updateParam}
            onClearAll={clearAll}
          />

          <main className="flex-1 min-w-0">
            {activePillFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {activePillFilters.map(pill => (
                  <span
                    key={pill.key}
                    className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {pill.label}
                    <button
                      onClick={() => {
                        updateParam(pill.key, '');
                        if (pill.key === 'q') setSearchInput('');
                      }}
                      className="hover:text-blue-600 transition-colors ml-0.5 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            <ContentGrid
              items={result.items}
              loading={loading}
              totalItems={result.totalItems}
              totalPages={result.totalPages}
              currentPage={result.pageNumber}
              onPageChange={page => updateParam('page', String(page))}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
