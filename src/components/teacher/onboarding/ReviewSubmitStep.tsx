import React from 'react';

const DOC_LABELS: Record<number, string> = {
  0: 'National ID (Front & Back)',
  1: 'KCSE Certificate',
  2: 'Degree / Teaching Certificate',
  3: 'Professional Resume (CV)',
  4: 'Police Clearance Certificate',
  5: 'Other',
};

interface SubjectSelection { subjectId: string; gradeLevelId: string; }
interface ApplicationDocument { id: string; documentType: number; fileUri: string; }
interface ProfileData { bio: string; qualifications: string; experienceYears: number; teachingSkills: string; }

interface ReviewSubmitStepProps {
  profile: ProfileData;
  subjects: SubjectSelection[];
  documents: ApplicationDocument[];
  allSubjects: { id: string; name: string; code: string }[];
  allGrades: { id: string; name: string }[];
  onSubmit: () => Promise<void>;
  onEditStep: (step: number) => void;
  loading: boolean;
}

function SectionCard({ title, step, onEdit, children }: { title: string; step: number; onEdit: (s: number) => void; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-gray-800 text-sm">{title}</h3>
        <button type="button" onClick={() => onEdit(step)} className="text-sm text-[#197C7A] font-semibold hover:underline flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  );
}

export default function ReviewSubmitStep({ profile, subjects, documents, allSubjects, allGrades, onSubmit, onEditStep, loading }: ReviewSubmitStepProps) {
  const resolveSubject = (id: string) => allSubjects.find(s => s.id === id)?.name ?? id;
  const resolveGrade = (id: string) => allGrades.find(g => g.id === id)?.name ?? id;
  const getFileName = (uri: string) => {
    const r = uri?.split('/').pop() ?? '';
    return r.includes('_') ? r.substring(r.indexOf('_') + 1) : r;
  };
  const missingDocs = [0, 1, 2, 3].filter(t => !documents.some(d => d.documentType === t));

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-[#163A5F]">Review Your Application</h2>
        <p className="text-gray-500 mt-1 text-sm">Check every section carefully. Use <strong>Edit</strong> to fix anything, then submit when ready.</p>
      </div>

      {missingDocs.length > 0 && (
        <div className="bg-red-50 border border-red-300 rounded-xl p-4 flex gap-3">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm">
            <p className="font-semibold text-red-700 mb-1">Missing required documents - cannot submit yet:</p>
            <ul className="list-disc list-inside text-red-600 space-y-0.5">
              {missingDocs.map(t => <li key={t}>{DOC_LABELS[t]}</li>)}
            </ul>
            <button onClick={() => onEditStep(3)} className="mt-2 text-red-700 font-semibold underline text-sm">
              Upload missing documents
            </button>
          </div>
        </div>
      )}

      <SectionCard title="Profile and Experience" step={1} onEdit={onEditStep}>
        <dl className="space-y-2.5">
          {([
            ['Bio', profile.bio],
            ['Qualifications', profile.qualifications],
            ['Experience', profile.experienceYears + ' year' + (profile.experienceYears !== 1 ? 's' : '')],
            ['Teaching Skills', profile.teachingSkills],
          ] as [string, string][]).map(([label, val]) => (
            <div key={label} className="grid grid-cols-3 gap-2 text-sm border-b border-gray-50 pb-2.5 last:border-0 last:pb-0">
              <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide pt-0.5">{label}</dt>
              <dd className="col-span-2 text-gray-800 font-medium leading-relaxed">
                {val || <em className="text-gray-400 font-normal">Not provided</em>}
              </dd>
            </div>
          ))}
        </dl>
      </SectionCard>

      <SectionCard title="Subjects and Grade Levels" step={2} onEdit={onEditStep}>
        {subjects.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No subjects selected.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {subjects.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-full border border-slate-200">
                {resolveSubject(s.subjectId)}
                <span className="text-[#197C7A] font-bold">.</span>
                <span className="text-slate-500 text-xs">{resolveGrade(s.gradeLevelId)}</span>
              </span>
            ))}
          </div>
        )}
      </SectionCard>

      <SectionCard title="Compliance Documents" step={3} onEdit={onEditStep}>
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map(type => {
            const doc = documents.find(d => d.documentType === type);
            const isMandatory = type < 4;
            const viewUrl = doc ? 'http://localhost:5145/' + doc.fileUri : null;
            return (
              <div key={type} className={'flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm ' + (doc ? 'bg-green-50 border-green-200' : isMandatory ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200')}>
                {doc ? (
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className={'w-4 h-4 flex-shrink-0 ' + (isMandatory ? 'text-red-400' : 'text-gray-300')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                <div className="flex-1 min-w-0">
                  <span className={'font-semibold ' + (doc ? 'text-green-800' : isMandatory ? 'text-red-700' : 'text-gray-400')}>
                    {DOC_LABELS[type]}
                  </span>
                  {doc && <span className="ml-2 text-xs text-green-600 font-normal">{getFileName(doc.fileUri)}</span>}
                  {!doc && isMandatory && <span className="ml-2 text-xs text-red-500 font-normal">(Required - not uploaded)</span>}
                  {!doc && !isMandatory && <span className="ml-2 text-xs text-gray-400 font-normal">(Optional - not uploaded)</span>}
                </div>
                {viewUrl && (
                  <a href={viewUrl} target="_blank" rel="noreferrer" className="text-xs text-[#197C7A] font-semibold hover:underline flex items-center gap-1 flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="bg-slate-50 p-5 rounded-xl border border-gray-200 text-sm text-gray-600">
        <h4 className="font-semibold text-gray-900 mb-2">What happens after submission?</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your documents will be verified by our compliance team.</li>
          <li>You will be notified to schedule a brief virtual interview.</li>
          <li>Upon approval, your full Teacher Dashboard will be unlocked.</li>
        </ul>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button type="button" onClick={() => onEditStep(3)} disabled={loading} className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading || missingDocs.length > 0}
          className="px-8 py-3 bg-[#D5A63A] text-white font-bold rounded-lg hover:bg-[#c49835] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:shadow-none"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </div>
  );
}