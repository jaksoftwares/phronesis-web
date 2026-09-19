import React, { useState } from 'react';

// Sync with backend DocumentType Enum
enum DocumentType {
  NationalId = 0,
  KcseCertificate = 1,
  DegreeCertificate = 2,
  Resume = 3,
  PoliceClearance = 4,
  Other = 5
}

interface ApplicationDocument {
  id: string;
  documentType: number;
  fileUri: string;
}

interface DocumentsStepProps {
  documents: ApplicationDocument[];
  onUpload: (type: number, file: File) => Promise<void>;
  onNext: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function DocumentsStep({ documents, onUpload, onNext, onBack, loading }: DocumentsStepProps) {
  const [uploadingType, setUploadingType] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: number) => {
    if (e.target.files && e.target.files[0]) {
      setUploadingType(type);
      try {
        await onUpload(type, e.target.files[0]);
      } finally {
        setUploadingType(null);
      }
    }
  };

  const hasNationalId = documents.some(d => d.documentType === DocumentType.NationalId);
  const hasDegree = documents.some(d => d.documentType === DocumentType.DegreeCertificate);
  const hasResume = documents.some(d => d.documentType === DocumentType.Resume);
  const hasKcse = documents.some(d => d.documentType === DocumentType.KcseCertificate);
  
  // Rule: National ID, KCSE, Degree, and Resume are mandatory.
  const isComplete = hasNationalId && hasDegree && hasResume && hasKcse;

  const renderUploadBox = (title: string, type: DocumentType, isRequired: boolean) => {
    const doc = documents.find(d => d.documentType === type);
    const isUploading = uploadingType === type;
    // Extract just the filename from the stored URI path (e.g. "uploads/teacher-documents/abc_resume.pdf" → "abc_resume.pdf")
    const rawFileName = doc?.fileUri?.split('/').pop() ?? '';
    // Strip the leading GUID prefix (e.g. "a1b2c3d4_resume.pdf" → "resume.pdf")
    const displayName = rawFileName.includes('_') ? rawFileName.substring(rawFileName.indexOf('_') + 1) : rawFileName;
    const viewUrl = doc ? `http://localhost:5145/${doc.fileUri}` : null;

    return (
      <div className={`border rounded-xl p-5 bg-white transition-all ${
        doc ? 'border-[#197C7A] bg-teal-50/30' : 'border-gray-200 hover:border-[#197C7A]'
      }`}>
        {/* Header row */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 flex items-center flex-wrap gap-2">
              {title}
              {isRequired && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Required</span>}
              {doc && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Uploaded
              </span>}
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">Accepted: PDF, JPG, PNG — Max 5 MB</p>
          </div>

          {/* Upload / Replace button */}
          <div className="flex-shrink-0">
            <input
              type="file"
              id={`file-upload-${type}`}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileChange(e, type)}
              disabled={loading || isUploading}
            />
            <label
              htmlFor={`file-upload-${type}`}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm cursor-pointer transition-colors ${
                isUploading
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : doc
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300'
                  : 'bg-[#163A5F] text-white hover:bg-[#112a45]'
              }`}
            >
              {isUploading ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Uploading…</>
              ) : doc ? (
                <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>Replace</>
              ) : (
                <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>Upload File</>
              )}
            </label>
          </div>
        </div>

        {/* Uploaded file info row */}
        {doc && (
          <div className="mt-3 flex items-center gap-3 bg-white border border-green-200 rounded-lg px-4 py-2.5">
            <svg className="w-5 h-5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-slate-700 font-medium truncate flex-1" title={displayName}>{displayName}</span>
            {viewUrl && (
              <a
                href={viewUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 text-xs text-[#197C7A] font-semibold hover:underline flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                View
              </a>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-[#163A5F]">Compliance Documents</h2>
        <p className="text-gray-500 mt-1">Please upload the required verification documents.</p>
      </div>

      <div className="space-y-4">
        {renderUploadBox("National ID (Front & Back)", DocumentType.NationalId, true)}
        {renderUploadBox("KCSE Certificate", DocumentType.KcseCertificate, true)}
        {renderUploadBox("Degree / Teaching Certificate", DocumentType.DegreeCertificate, true)}
        {renderUploadBox("Professional Resume (CV)", DocumentType.Resume, true)}
        {renderUploadBox("Police Clearance Certificate", DocumentType.PoliceClearance, false)}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          disabled={loading || uploadingType !== null}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isComplete || loading || uploadingType !== null}
          className="px-6 py-2 bg-[#163A5F] text-white rounded-lg hover:bg-[#197C7A] transition-colors disabled:opacity-50 flex items-center"
        >
          Review Application
          <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
}
