'use client';

import React, { useEffect, useState } from 'react';
import api from '@/lib/api/axios';

interface FilterOption { id: string; name: string; }

const CONTENT_TYPES = [
  { value: '', label: 'All Types' },
  { value: '0', label: '📄 Document' },
  { value: '1', label: '🎬 Video' },
  { value: '2', label: '🎮 Interactive' },
  { value: '3', label: '🎧 Audio' },
  { value: '4', label: '🔬 Simulation' },
];

interface CatalogFilterSidebarProps {
  selectedGradeId: string;
  selectedSubjectId: string;
  selectedTopicId: string;
  selectedContentType: string;
  isPremium: string;
  onFilterChange: (key: string, value: string) => void;
  onClearAll: () => void;
}

export default function CatalogFilterSidebar({
  selectedGradeId,
  selectedSubjectId,
  selectedTopicId,
  selectedContentType,
  isPremium,
  onFilterChange,
  onClearAll,
}: CatalogFilterSidebarProps) {
  const [grades, setGrades] = useState<FilterOption[]>([]);
  const [subjects, setSubjects] = useState<FilterOption[]>([]);
  const [topics, setTopics] = useState<FilterOption[]>([]);

  const [loadingGrades, setLoadingGrades] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false);

  // Fetch grades once on mount
  useEffect(() => {
    api.get('/academic/grades')
      .then(res => setGrades(res.data?.data || []))
      .catch(() => setGrades([]))
      .finally(() => setLoadingGrades(false));
  }, []);

  // Fetch subjects when grade changes
  useEffect(() => {
    if (!selectedGradeId) {
      setSubjects([]);
      setTopics([]);
      return;
    }
    setLoadingSubjects(true);
    api.get(`/grades/${selectedGradeId}/subjects`)
      .then(res => setSubjects(res.data?.data || []))
      .catch(() => setSubjects([]))
      .finally(() => setLoadingSubjects(false));
  }, [selectedGradeId]);

  // Fetch topics when subject changes
  useEffect(() => {
    if (!selectedSubjectId) {
      setTopics([]);
      return;
    }
    setLoadingTopics(true);
    api.get(`/subjects/${selectedSubjectId}/topics`)
      .then(res => setTopics(res.data?.data || []))
      .catch(() => setTopics([]))
      .finally(() => setLoadingTopics(false));
  }, [selectedSubjectId]);

  const hasActiveFilters = selectedGradeId || selectedSubjectId || selectedTopicId || selectedContentType || isPremium;

  const SelectField = ({
    label,
    value,
    onChange,
    options,
    loading,
    disabled,
    placeholder,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
    loading?: boolean;
    disabled?: boolean;
    placeholder: string;
  }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled || loading}
          className="w-full appearance-none bg-white border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">{loading ? 'Loading…' : placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sticky top-20 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>🎯</span> Filters
          </h2>
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-xs text-blue-600 font-semibold hover:text-blue-800 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Grade */}
        <SelectField
          label="Grade Level"
          value={selectedGradeId}
          onChange={v => { onFilterChange('gradeId', v); onFilterChange('subjectId', ''); onFilterChange('topicId', ''); }}
          options={grades.map(g => ({ value: g.id, label: g.name }))}
          loading={loadingGrades}
          placeholder="All Grades"
        />

        {/* Subject — only visible once grade selected */}
        {selectedGradeId && (
          <SelectField
            label="Subject"
            value={selectedSubjectId}
            onChange={v => { onFilterChange('subjectId', v); onFilterChange('topicId', ''); }}
            options={subjects.map(s => ({ value: s.id, label: s.name }))}
            loading={loadingSubjects}
            disabled={loadingSubjects}
            placeholder="All Subjects"
          />
        )}

        {/* Topic — only visible once subject selected */}
        {selectedSubjectId && (
          <SelectField
            label="Topic / Strand"
            value={selectedTopicId}
            onChange={v => onFilterChange('topicId', v)}
            options={topics.map(t => ({ value: t.id, label: t.name }))}
            loading={loadingTopics}
            disabled={loadingTopics}
            placeholder="All Topics"
          />
        )}

        <div className="h-px bg-slate-100" />

        {/* Content Type */}
        <SelectField
          label="Content Type"
          value={selectedContentType}
          onChange={v => onFilterChange('contentType', v)}
          options={CONTENT_TYPES.slice(1).map(t => ({ value: t.value, label: t.label }))}
          placeholder="All Types"
        />

        {/* Premium Toggle */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
            Access Level
          </label>
          <div className="flex gap-2">
            {[
              { value: '', label: 'All' },
              { value: 'false', label: '🆓 Free' },
              { value: 'true', label: '⭐ Premium' },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => onFilterChange('isPremium', opt.value)}
                className={`flex-1 text-xs font-semibold py-1.5 rounded-lg border transition-all ${
                  isPremium === opt.value
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
