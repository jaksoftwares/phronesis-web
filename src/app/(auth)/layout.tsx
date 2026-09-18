import React from 'react';
import { Logo } from '@/components/ui/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-cloud">
      {/* Left Side (Visual/Brand) */}
      <div className="hidden lg:flex lg:w-1/2 bg-phronesis-blue flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle background abstract shapes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-phronesis-gold blur-3xl mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#197C7A] blur-3xl mix-blend-screen" />
        </div>

        <div className="relative z-10 flex items-center">
          <Logo variant="horizontal" color="white" width={240} height={80} />
        </div>

        <div className="relative z-10 max-w-lg mt-auto">
          <h1 className="h1 text-white mb-6">
            Welcome to <br />
            <span className="text-phronesis-gold">Phronesis</span>
          </h1>
          <p className="text-phronesis-gold/90 text-xl font-serif italic">
            "Empowering the next generation through wisdom and understanding."
          </p>
        </div>
      </div>

      {/* Right Side (Interaction) */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 bg-white relative">
        <div className="mx-auto w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
