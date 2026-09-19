import React from 'react';

interface ReviewSubmitStepProps {
  onSubmit: () => Promise<void>;
  onBack: () => void;
  loading: boolean;
}

export default function ReviewSubmitStep({ onSubmit, onBack, loading }: ReviewSubmitStepProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center py-6">
        <div className="mx-auto w-16 h-16 bg-[#197C7A]/10 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[#197C7A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#163A5F]">Ready to Submit!</h2>
        <p className="text-gray-500 mt-2 max-w-md mx-auto">
          You have successfully completed all required sections of the application. 
          Our administration team will review your profile and documents.
        </p>
      </div>

      <div className="bg-[#F5F7F9] p-4 rounded-xl border border-gray-200 text-sm text-gray-700">
        <h4 className="font-semibold text-gray-900 mb-2">What happens next?</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your documents will be verified by our compliance team.</li>
          <li>You will receive an email to schedule a brief virtual interview.</li>
          <li>Upon approval, your Teacher Dashboard will be unlocked.</li>
        </ul>
      </div>

      <div className="flex justify-between pt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Review Details
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="px-8 py-3 bg-[#D5A63A] text-white font-bold rounded-lg hover:bg-[#c49835] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
        >
          {loading ? 'Submitting Application...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
}
