"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTeacherOnboarding, TeacherApplication } from '@/hooks/api/useTeacherOnboarding';
import ProfileStep from '@/components/teacher/onboarding/ProfileStep';
import SubjectsStep from '@/components/teacher/onboarding/SubjectsStep';
import DocumentsStep from '@/components/teacher/onboarding/DocumentsStep';
import ReviewSubmitStep from '@/components/teacher/onboarding/ReviewSubmitStep';
import { useAuthStore } from '@/store/authStore';

export default function TeacherOnboarding() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { getApplication, createDraftApplication, updateProfile, updateSubjects, uploadDocument, submitApplication, loading, error } = useTeacherOnboarding();

  const [currentStep, setCurrentStep] = useState(1);
  const [application, setApplication] = useState<TeacherApplication | null>(null);

  const [profileData, setProfileData] = useState({
    bio: '',
    qualifications: '',
    experienceYears: 0,
    teachingSkills: ''
  });
  const [subjectsData, setSubjectsData] = useState<any[]>([]);

  useEffect(() => {
    const initializeApplication = async () => {
      try {
        let app = await getApplication();
        if (!app) {
          app = await createDraftApplication();
        }
        setApplication(app);

        if (app.profile) {
          setProfileData({
            bio: app.profile.bio || '',
            qualifications: app.profile.qualifications || '',
            experienceYears: app.profile.experienceYears || 0,
            teachingSkills: app.profile.teachingSkills || ''
          });
        }
        
        if (app.subjects && app.subjects.length > 0) {
          setSubjectsData(app.subjects);
        }
        
        // If already submitted, redirect to dashboard which will handle the "Pending Review" lock
        if (app.status !== 0) { // 0 = Draft
          router.push('/teacher/dashboard');
        }
      } catch (err) {
        console.error("Failed to init onboarding", err);
      }
    };
    initializeApplication();
  }, []);

  const handleNextProfile = async () => {
    try {
      await updateProfile(profileData);
      setCurrentStep(2);
    } catch (err) {
      // Error handled in hook, could show toast
    }
  };

  const handleNextSubjects = async () => {
    try {
      await updateSubjects(subjectsData);
      setCurrentStep(3);
    } catch (err) {}
  };

  const handleUploadDocument = async (type: number, file: File) => {
    await uploadDocument(type, file);
    // Refresh application to get new docs
    const app = await getApplication();
    setApplication(app);
  };

  const handleSubmit = async () => {
    try {
      await submitApplication();
      router.push('/teacher/dashboard'); // Will redirect to the Under Review lock screen
    } catch (err) {}
  };

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#163A5F]"></div>
      </div>
    );
  }

  const steps = [
    { id: 1, title: 'Profile' },
    { id: 2, title: 'Subjects' },
    { id: 3, title: 'Documents' },
    { id: 4, title: 'Review' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-[#163A5F] flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-xl font-bold text-[#163A5F]">Phronesis</h1>
        </div>
        <div className="text-sm font-medium text-gray-500">
          Teacher Onboarding
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto py-12 px-6">
        {/* Stepper Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>
            <div 
              className="absolute left-0 top-1/2 h-1 bg-[#197C7A] transition-all duration-500 -z-10" 
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors duration-300
                    ${isActive ? 'bg-[#197C7A] border-white text-white shadow-md' : ''}
                    ${isCompleted ? 'bg-[#163A5F] border-white text-white' : ''}
                    ${!isActive && !isCompleted ? 'bg-white border-gray-200 text-gray-400' : ''}
                  `}>
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <span className="font-semibold text-sm">{step.id}</span>
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium uppercase tracking-wider ${isActive ? 'text-[#197C7A]' : 'text-gray-500'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          {currentStep === 1 && (
            <ProfileStep 
              data={profileData} 
              updateData={(d) => setProfileData({...profileData, ...d})} 
              onNext={handleNextProfile} 
              loading={loading}
            />
          )}
          {currentStep === 2 && (
            <SubjectsStep 
              data={subjectsData} 
              updateData={setSubjectsData} 
              onNext={handleNextSubjects} 
              onBack={() => setCurrentStep(1)} 
              loading={loading} 
            />
          )}
          {currentStep === 3 && (
            <DocumentsStep 
              documents={application.documents} 
              onUpload={handleUploadDocument} 
              onNext={() => setCurrentStep(4)} 
              onBack={() => setCurrentStep(2)} 
              loading={loading} 
            />
          )}
          {currentStep === 4 && (
            <ReviewSubmitStep 
              onSubmit={handleSubmit} 
              onBack={() => setCurrentStep(3)} 
              loading={loading} 
            />
          )}
        </div>
      </main>
    </div>
  );
}
