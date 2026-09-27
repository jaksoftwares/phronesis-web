'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';

const MOCK_QUESTIONS = [
  {
    id: 'q1',
    text: 'What is the value of x in the equation 2x + 5 = 15?',
    options: ['5', '10', '2.5', '20'],
    type: 'multiple-choice'
  },
  {
    id: 'q2',
    text: 'Solve the inequality: -3x > 12',
    options: ['x > -4', 'x < -4', 'x > 4', 'x < 4'],
    type: 'multiple-choice'
  },
  {
    id: 'q3',
    text: 'Explain the steps to solve a system of linear equations using the substitution method.',
    type: 'written'
  }
];

export default function QuizInterfacePage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = MOCK_QUESTIONS[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === MOCK_QUESTIONS.length - 1;

  const handleAnswerSelect = (val: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  const handleSubmit = () => {
    router.push(`/learner/assessments/${id}/results`);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 pt-6">
      {/* Header / Timer */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-4 flex items-center justify-between sticky top-4 z-10">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-ink)]">Algebra: Linear Equations</h1>
          <p className="text-xs text-[var(--color-slate)] uppercase tracking-wider font-semibold">Assessment Mode</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-lg font-mono text-lg font-bold flex items-center gap-2 ${timeLeft < 300 ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' : 'bg-[var(--color-cloud)] text-[var(--color-ink)] border border-[var(--color-mist)]'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-[var(--color-phronesis-teal)] text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Finish Exam
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-4 flex items-center gap-2 overflow-x-auto">
        {MOCK_QUESTIONS.map((q, idx) => {
          const isAnswered = !!answers[q.id];
          const isCurrent = idx === currentQuestionIdx;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIdx(idx)}
              className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                isCurrent ? 'border-[var(--color-phronesis-blue)] bg-[var(--color-phronesis-blue)] text-white' :
                isAnswered ? 'border-[var(--color-phronesis-teal)] bg-[var(--color-phronesis-teal)] text-white' :
                'border-[var(--color-mist)] bg-white text-[var(--color-slate)] hover:border-[var(--color-slate)]'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Question Area */}
      <motion.div 
        key={currentQuestionIdx}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-xl shadow-[var(--shadow-institutional)] border border-[var(--color-mist)] p-8 min-h-[400px] flex flex-col"
      >
        <div className="mb-8">
          <span className="text-sm font-bold text-[var(--color-phronesis-gold)] uppercase tracking-wider mb-2 block">Question {currentQuestionIdx + 1} of {MOCK_QUESTIONS.length}</span>
          <h2 className="text-2xl font-medium text-[var(--color-ink)] leading-relaxed">{currentQ.text}</h2>
        </div>

        <div className="flex-1">
          {currentQ.type === 'multiple-choice' && currentQ.options ? (
            <div className="space-y-4">
              {currentQ.options.map((opt, i) => {
                const isSelected = answers[currentQ.id] === opt;
                return (
                  <label 
                    key={i} 
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected ? 'border-[var(--color-phronesis-blue)] bg-[#163A5F]/5' : 'border-[var(--color-mist)] hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[var(--color-phronesis-blue)]' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-[var(--color-phronesis-blue)]" />}
                    </div>
                    <span className="text-lg text-[var(--color-ink)]">{opt}</span>
                    <input 
                      type="radio" 
                      name={currentQ.id} 
                      className="hidden" 
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(opt)}
                    />
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="h-full">
              <textarea 
                className="w-full h-full min-h-[200px] p-4 border-2 border-[var(--color-mist)] rounded-xl resize-none focus:outline-none focus:border-[var(--color-phronesis-blue)] text-lg"
                placeholder="Type your detailed answer here..."
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleAnswerSelect(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Nav Controls */}
        <div className="mt-12 flex items-center justify-between border-t border-[var(--color-mist)] pt-6">
          <button 
            disabled={currentQuestionIdx === 0}
            onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
            className="px-6 py-2 border-2 border-[var(--color-mist)] rounded-lg font-medium text-[var(--color-ink)] hover:bg-[var(--color-cloud)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          {!isLastQuestion ? (
            <button 
              onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
              className="px-6 py-2 bg-[#163A5F] text-white rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Next Question
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="px-8 py-2 bg-[var(--color-phronesis-gold)] text-white rounded-lg font-bold hover:bg-opacity-90 transition-colors shadow-md"
            >
              Submit Assessment
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
