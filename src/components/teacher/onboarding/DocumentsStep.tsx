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

    return (
      <div className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-white hover:border-[#197C7A] transition-colors">
        <div>
          <h4 className="font-semibold text-gray-900 flex items-center">
            {title}
            {isRequired && <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Required</span>}
          </h4>
          <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB).</p>
          {doc && (
            <p className="text-sm text-green-600 mt-2 flex items-center font-medium">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Uploaded Successfully
            </p>
          )}
        </div>
        
        <div>
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
            className={`px-4 py-2 rounded-lg font-medium text-sm cursor-pointer transition-colors ${
              isUploading 
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-[#F5F7F9] text-[#163A5F] hover:bg-gray-200 border border-gray-300'
            }`}
          >
            {isUploading ? 'Uploading...' : (doc ? 'Replace File' : 'Upload File')}
          </label>
        </div>
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
