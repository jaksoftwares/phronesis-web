'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api/axios';

export default function NewContentPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [contentType, setContentType] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [gradeId, setGradeId] = useState('');
  
  const [subjects, setSubjects] = useState<any[]>([]);
  const [grades, setGrades] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [subRes, gradeRes] = await Promise.all([
          api.get('/academic/subjects'),
          api.get('/academic/grades')
        ]);
        setSubjects(subRes.data?.data || []);
        setGrades(gradeRes.data?.data || []);
        if (subRes.data?.data?.length > 0) setSubjectId(subRes.data.data[0].id);
        if (gradeRes.data?.data?.length > 0) setGradeId(gradeRes.data.data[0].id);
      } catch (err) {
        console.error("Failed to load metadata", err);
      }
    })();
  }, []);

  const handleNext = async () => {
    if (step === 1 && contentType === null) return;
    if (step === 2 && (!title || !description)) return; // basic validation
    
    if (step === 3) {
      // Publish
      setIsSubmitting(true);
      try {
        await api.post('/content', {
          title,
          description,
          version: "1.0",
          isPremium: false,
          contentType: contentType === 'Document' ? 1 : contentType === 'Quiz' ? 2 : 0,
          gradeLevelId: gradeId,
          subjectId: subjectId,
          strandId: null,
          subStrandId: null,
          learningObjectiveId: null,
          tags: []
        });
        router.push('/teacher/content');
      } catch (err) {
        console.error("Failed to create content", err);
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    
    setStep(s => s + 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 pt-6">
      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--color-phronesis-teal)] -z-10 rounded-full transition-all duration-500`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
        
        {['Select Type', 'Upload & Details', 'Publish Options'].map((label, i) => {
          const isCompleted = step > i + 1;
          const isCurrent = step === i + 1;
          return (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${
                isCompleted ? 'bg-[var(--color-phronesis-teal)] border-[var(--color-phronesis-teal)] text-white' :
                isCurrent ? 'bg-white border-[var(--color-phronesis-blue)] text-[var(--color-phronesis-blue)] shadow-md' :
                'bg-white border-gray-300 text-gray-400'
              }`}>
                {isCompleted ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : i + 1}
              </div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${isCurrent ? 'text-[var(--color-ink)]' : 'text-[var(--color-slate)]'}`}>{label}</span>
            </div>
          );
        })}
      </div>

      {/* Workspace Area */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-8 min-h-[500px]">
        <AnimatePresence mode="wait">
          {/* STEP 1: Select Type */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-[var(--color-ink)] text-center mb-8">What would you like to create?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <button 
                  onClick={() => setContentType('Document')}
                  className={`p-6 rounded-xl border-2 text-left transition-all hover:-translate-y-1 ${contentType === 'Document' ? 'border-[var(--color-phronesis-blue)] bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                  <h3 className="font-bold text-[var(--color-ink)] mb-2">Reading Material</h3>
                  <p className="text-sm text-[var(--color-slate)]">Upload PDFs, study guides, or syllabus documents.</p>
                </button>

                <button 
                  onClick={() => setContentType('Video')}
                  className={`p-6 rounded-xl border-2 text-left transition-all hover:-translate-y-1 ${contentType === 'Video' ? 'border-[var(--color-phronesis-blue)] bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="font-bold text-[var(--color-ink)] mb-2">Video Lesson</h3>
                  <p className="text-sm text-[var(--color-slate)]">Upload MP4 files or link external educational videos.</p>
                </button>

                <button 
                  onClick={() => setContentType('Quiz')}
                  className={`p-6 rounded-xl border-2 text-left transition-all hover:-translate-y-1 ${contentType === 'Quiz' ? 'border-[var(--color-phronesis-blue)] bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  </div>
                  <h3 className="font-bold text-[var(--color-ink)] mb-2">Assessment / Quiz</h3>
                  <p className="text-sm text-[var(--color-slate)]">Build an interactive multiple-choice quiz or assignment.</p>
                </button>

              </div>
            </motion.div>
          )}

          {/* STEP 2: Details */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">Enter Details for your {contentType}</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-slate)] mb-1">Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Introduction to Algebra" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--color-phronesis-blue)]" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-slate)] mb-1">Subject</label>
                    <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--color-phronesis-blue)] bg-white">
                      {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[var(--color-slate)] mb-1">Grade Level</label>
                    <select value={gradeId} onChange={(e) => setGradeId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--color-phronesis-blue)] bg-white">
                      {grades.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-slate)] mb-1">Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Brief summary of the content..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[var(--color-phronesis-blue)] resize-none" />
                </div>

                {/* Conditional UI based on type */}
                {contentType !== 'Quiz' && (
                  <div className="mt-6 border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    <p className="font-semibold text-[var(--color-ink)]">Click to upload or drag and drop</p>
                    <p className="text-xs text-[var(--color-slate)] mt-1">PDF, MP4, max 500MB</p>
                  </div>
                )}
                
                {contentType === 'Quiz' && (
                  <div className="mt-6 bg-[#F5F7F9] border border-[var(--color-mist)] rounded-xl p-6">
                    <p className="font-semibold text-[var(--color-ink)] mb-4">Quiz Builder Placeholder</p>
                    <div className="space-y-4">
                      <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
                         <input type="text" placeholder="Question 1..." className="w-full font-bold mb-2 outline-none border-b border-dashed border-gray-300 pb-1" />
                         <div className="space-y-2 pl-4 mt-4">
                           <div className="flex items-center gap-2"><input type="radio" disabled /> <input type="text" placeholder="Option A" className="outline-none text-sm" /></div>
                           <div className="flex items-center gap-2"><input type="radio" disabled /> <input type="text" placeholder="Option B" className="outline-none text-sm" /></div>
                         </div>
                      </div>
                      <button className="text-sm font-bold text-[var(--color-phronesis-blue)] hover:underline">+ Add Question</button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Publish */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 text-center py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-ink)]">Ready to Publish</h2>
              <p className="text-[var(--color-slate)] max-w-md mx-auto">
                Your content has been successfully prepared. You can publish it immediately to your students or save it as a draft to edit later.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center pt-4">
        <button 
          onClick={() => step > 1 ? setStep(s => s - 1) : router.back()}
          className="px-6 py-2.5 bg-white border border-[var(--color-mist)] text-[var(--color-ink)] font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        <button 
          onClick={handleNext}
          disabled={step === 1 && !contentType}
          className="px-8 py-2.5 bg-[#163A5F] text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step === 3 ? 'Publish Content' : 'Next Step'}
        </button>
      </div>
    </div>
  );
}
