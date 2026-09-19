import React, { useState, useEffect } from 'react';
import api from '@/lib/api/axios';

interface SubjectSelection {
  subjectId: string;
  gradeLevelId: string;
}

interface SubjectsStepProps {
  data: SubjectSelection[];
  updateData: (data: SubjectSelection[]) => void;
  onNext: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function SubjectsStep({ data, updateData, onNext, onBack, loading }: SubjectsStepProps) {
  const [availableGradeLevels, setAvailableGradeLevels] = useState<any[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  // Form state
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setFetching(true);
        // Assuming we have public endpoints for these, or we just mock them if they don't exist yet
        // In a real app we'd fetch from `/api/v1/academic/grade-levels` etc.
        const gradesRes = await api.get('/academic/grades');
        const subjectsRes = await api.get('/subjects');
        setAvailableGradeLevels(gradesRes.data?.data || []);
        setAvailableSubjects(subjectsRes.data?.data || []);
      } catch (err) {
        console.error('Failed to fetch academic metadata', err);
      } finally {
        setFetching(false);
      }
    };
    fetchMetadata();
  }, []);

  const handleAddSubject = () => {
    if (!selectedGrade || !selectedSubject) return;
    
    // Check max 3
    if (data.length >= 3) {
      alert("You can select a maximum of 3 subjects.");
      return;
    }

    // Check duplicate
    const exists = data.find(s => s.subjectId === selectedSubject && s.gradeLevelId === selectedGrade);
    if (exists) return;

    updateData([...data, { subjectId: selectedSubject, gradeLevelId: selectedGrade }]);
    setSelectedSubject('');
  };

  const handleRemoveSubject = (idx: number) => {
    updateData(data.filter((_, i) => i !== idx));
  };

  const isComplete = data.length > 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-[#163A5F]">Teaching Preferences</h2>
        <p className="text-gray-500 mt-1">Select the grades (JSS/SSS) and subjects you are qualified to teach. Maximum of 3 subjects.</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Education Level / Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#197C7A]"
              disabled={fetching}
            >
              <option value="">Select a Grade Level...</option>
              {availableGradeLevels.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#197C7A]"
              disabled={fetching || !selectedGrade}
            >
              <option value="">Select a Subject...</option>
              {availableSubjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleAddSubject}
          disabled={!selectedGrade || !selectedSubject || data.length >= 3}
          className="px-4 py-2 bg-[#D5A63A] text-white rounded-lg hover:bg-[#c49835] transition-colors disabled:opacity-50 text-sm font-medium"
        >
          + Add Subject
        </button>
      </div>

      {data.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Selected Subjects ({data.length}/3)</h3>
          <ul className="space-y-2">
            {data.map((item, idx) => {
              const gradeName = availableGradeLevels.find(g => g.id === item.gradeLevelId)?.name || 'Loading...';
              const subjectName = availableSubjects.find(s => s.id === item.subjectId)?.name || 'Loading...';
              return (
                <li key={idx} className="flex justify-between items-center bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
                  <div>
                    <span className="font-medium text-[#163A5F]">{subjectName}</span>
                    <span className="text-gray-500 text-sm ml-2 px-2 py-1 bg-gray-100 rounded-full">{gradeName}</span>
                  </div>
                  <button onClick={() => handleRemoveSubject(idx)} className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isComplete || loading}
          className="px-6 py-2 bg-[#163A5F] text-white rounded-lg hover:bg-[#197C7A] transition-colors disabled:opacity-50 flex items-center"
        >
          {loading ? 'Saving...' : 'Next Step'}
          {!loading && <span className="ml-2">→</span>}
        </button>
      </div>
    </div>
  );
}
