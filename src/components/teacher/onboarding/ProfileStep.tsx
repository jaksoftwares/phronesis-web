import React from 'react';

interface ProfileStepProps {
  data: { bio: string; qualifications: string; experienceYears: number; teachingSkills: string };
  updateData: (data: any) => void;
  onNext: () => void;
  loading: boolean;
}

export default function ProfileStep({ data, updateData, onNext, loading }: ProfileStepProps) {
  const isComplete = data.bio.trim() !== '' && data.qualifications.trim() !== '' && data.experienceYears >= 0;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-[#163A5F]">Professional Profile</h2>
        <p className="text-[#F5F7F9] text-sm text-gray-500 mt-1">Tell us about your background and experience.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Biography</label>
          <textarea
            value={data.bio}
            onChange={(e) => updateData({ bio: e.target.value })}
            placeholder="A brief overview of your teaching philosophy and background..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#197C7A] focus:border-transparent min-h-[100px]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications</label>
          <input
            type="text"
            value={data.qualifications}
            onChange={(e) => updateData({ qualifications: e.target.value })}
            placeholder="e.g. B.Ed in Mathematics, Masters in Education"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#197C7A] focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
            <input
              type="number"
              min="0"
              value={data.experienceYears}
              onChange={(e) => updateData({ experienceYears: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#197C7A] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Key Teaching Skills</label>
            <input
              type="text"
              value={data.teachingSkills}
              onChange={(e) => updateData({ teachingSkills: e.target.value })}
              placeholder="e.g. Special Ed, STEM, ESL (Optional)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#197C7A] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
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
