import { useState } from 'react';
import api from '@/lib/api/axios';

export interface SubjectSelection {
  subjectId: string;
  gradeLevelId: string;
}

export interface ApplicationDocument {
  id: string;
  documentType: number;
  fileUri: string;
  verificationStatus: number;
  rejectionReason: string | null;
}

export interface TeacherApplication {
  id: string;
  status: number;
  submittedAt: string | null;
  adminNotes: string | null;
  interviewDate: string | null;
  interviewLink: string | null;
  interviewNotes: string | null;
  documents: ApplicationDocument[];
  profile?: {
    bio: string;
    qualifications: string;
    experienceYears: number;
    teachingSkills: string;
  };
  subjects?: SubjectSelection[];
}

export const useTeacherOnboarding = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getApplication = async (): Promise<TeacherApplication | null> => {
    try {
      setLoading(true);
      const res = await api.get('/teacher-onboarding/me/application');
      return res.data?.data;
    } catch (err: any) {
      if (err.response?.status === 404) return null;
      setError(err.response?.data?.message || 'Failed to fetch application.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createDraftApplication = async (): Promise<TeacherApplication> => {
    try {
      setLoading(true);
      const res = await api.post('/teacher-onboarding/me/application');
      return res.data?.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create application.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: { bio: string; qualifications: string; experienceYears: number; teachingSkills: string }) => {
    try {
      setLoading(true);
      await api.put('/teacher-onboarding/me/profile', data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSubjects = async (selections: SubjectSelection[]) => {
    try {
      setLoading(true);
      await api.put('/teacher-onboarding/me/subjects', { subjectSelections: selections });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update subjects.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (documentType: number, file: File) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('documentType', documentType.toString());
      formData.append('file', file);
      
      await api.post('/teacher-onboarding/me/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to upload document.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitApplication = async () => {
    try {
      setLoading(true);
      await api.post('/teacher-onboarding/me/submit');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit application.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getApplication,
    createDraftApplication,
    updateProfile,
    updateSubjects,
    uploadDocument,
    submitApplication
  };
};
