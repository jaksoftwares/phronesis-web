import { MonitorPlay, LibraryBig, PenTool } from "lucide-react";

export function CoreCapabilities() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="h2 text-phronesis-blue">Empowering Every Learner</h2>
          <p className="body-large text-slate">
            A fully integrated digital ecosystem replacing fragmented revision tools with a singular, high-quality learning experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Large Block - Virtual Tuition (Spans 2 columns on lg screens) */}
          <div className="lg:col-span-2 row-span-2 rounded-panel bg-ink text-white p-8 md:p-12 flex flex-col justify-end relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-institutional">
            <div className="absolute top-0 right-0 w-64 h-64 bg-phronesis-blue rounded-full blur-[100px] opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="absolute top-8 right-8 bg-white/10 p-4 rounded-card backdrop-blur-md">
              <MonitorPlay className="w-10 h-10 text-phronesis-teal" />
            </div>
            <div className="relative z-10 max-w-md space-y-4">
              <h3 className="text-3xl font-bold tracking-tight">Master Concepts with Live Virtual Tuition</h3>
              <p className="text-cloud/80 leading-relaxed text-sm md:text-base">
                Engage in 1-on-1 or group interactive sessions with expert teachers. Book, schedule, attend, and review—all securely managed within our platform.
              </p>
            </div>
          </div>

          {/* Medium Block 1 - Structured Library */}
          <div className="rounded-panel bg-cloud border border-mist p-0 flex flex-col group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md overflow-hidden relative">
            <div className="h-32 w-full relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/shared/cbc-online-library.png" alt="CBC Library" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-cloud to-transparent" />
            </div>
            <div className="p-8 pt-0 space-y-2 relative z-10 flex-1 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-ink tracking-tight">The Comprehensive CBC Library</h3>
              <p className="text-slate text-sm leading-relaxed">
                Instantly access a vast repository of curated notes, teaching animations, and past papers meticulously organized by Grade, Subject, and Topic.
              </p>
            </div>
          </div>

          {/* Medium Block 2 - Assessments */}
          <div className="rounded-panel bg-white border border-mist p-0 flex flex-col group hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-md overflow-hidden relative">
            <div className="h-32 w-full relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/shared/assessments-knowledge.png" alt="Assessments" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="p-8 pt-0 space-y-2 relative z-10 flex-1 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-ink tracking-tight">Test Your Knowledge</h3>
              <p className="text-slate text-sm leading-relaxed">
                Reinforce learning through timed mock exams, topical exercises, and detailed marking schemes designed to prepare learners for success.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
