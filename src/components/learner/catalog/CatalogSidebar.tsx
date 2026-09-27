'use client';

import React from 'react';

interface CatalogSidebarProps {
  selectedGrade: string;
  setSelectedGrade: (g: string) => void;
  selectedSubject: string;
  setSelectedSubject: (s: string) => void;
}

const GRADES = ['All Grades', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
const SUBJECTS = ['All Subjects', 'Mathematics', 'English', 'Science', 'History', 'Geography', 'Art'];

export function CatalogSidebar({ selectedGrade, setSelectedGrade, selectedSubject, setSelectedSubject }: CatalogSidebarProps) {
  return (
    <div className="bg-white rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] h-full">
      <h3 className="font-bold text-lg text-[var(--color-ink)] mb-6 flex items-center gap-2">
        <svg className="w-5 h-5 text-[var(--color-phronesis-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Filters
      </h3>

      <div className="space-y-6">
        {/* Grades Filter */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--color-slate)] uppercase tracking-wider mb-3">Grade Level</h4>
          <div className="space-y-2">
            {GRADES.map((grade) => (
              <label key={grade} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedGrade === grade ? 'bg-[var(--color-phronesis-blue)] border-[var(--color-phronesis-blue)]' : 'border-gray-300 group-hover:border-[var(--color-phronesis-blue)]'}`}>
                  {selectedGrade === grade && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
                <span className={`text-sm ${selectedGrade === grade ? 'text-[var(--color-ink)] font-medium' : 'text-[var(--color-slate)]'}`}>{grade}</span>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={selectedGrade === grade}
                  onChange={() => setSelectedGrade(grade)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-[var(--color-mist)]"></div>

        {/* Subjects Filter */}
        <div>
          <h4 className="text-sm font-semibold text-[var(--color-slate)] uppercase tracking-wider mb-3">Subjects</h4>
          <div className="space-y-2">
            {SUBJECTS.map((subject) => (
              <label key={subject} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedSubject === subject ? 'bg-[var(--color-phronesis-blue)] border-[var(--color-phronesis-blue)]' : 'border-gray-300 group-hover:border-[var(--color-phronesis-blue)]'}`}>
                  {selectedSubject === subject && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  )}
                </div>
                <span className={`text-sm ${selectedSubject === subject ? 'text-[var(--color-ink)] font-medium' : 'text-[var(--color-slate)]'}`}>{subject}</span>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={selectedSubject === subject}
                  onChange={() => setSelectedSubject(subject)}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
