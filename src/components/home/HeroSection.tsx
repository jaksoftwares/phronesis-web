"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Happy students celebrating" 
          className="w-full h-full object-cover object-top"
          fetchPriority="high"
        />
        {/* Soft overlay to ensure the background image is highly visible without cluttering the text */}
        <div className="absolute inset-0 bg-cloud/80 lg:bg-gradient-to-r lg:from-cloud/85 lg:via-cloud/60 lg:to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-6 lg:space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-ink leading-tight tracking-tight">
              Genesis of Knowledge.<br />
              <span className="text-phronesis-blue text-4xl lg:text-5xl">The Digital Foundation for CBC Excellence.</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate max-w-xl leading-relaxed font-medium">
              A comprehensive, secure, and professional home-schooling platform for Grades 7–12. Access curated revision materials, connect with verified expert teachers, and attend live virtual classes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2 lg:pt-4">
              <Link 
                href="/register" 
                className="px-8 py-4 bg-phronesis-blue text-white font-semibold rounded-input hover:bg-phronesis-blue/90 transition-all shadow-institutional hover:shadow-lg text-center"
              >
                Enroll Now
              </Link>
              <Link 
                href="/curriculum" 
                className="px-8 py-4 bg-white border-2 border-mist text-ink font-semibold rounded-input hover:border-phronesis-teal hover:text-phronesis-teal transition-all text-center flex items-center justify-center gap-2 shadow-sm"
              >
                Explore Curriculum
              </Link>
            </div>
          </div>

          {/* Right: Floating Abstract UI Mockup */}
          <div className="relative hidden lg:block h-[450px]">
            {/* Main Class Window Mockup */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute right-0 top-10 w-[85%] bg-white/95 backdrop-blur-sm rounded-panel shadow-2xl border border-mist p-6 z-20"
            >
              <div className="flex items-center justify-between border-b border-mist pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-phronesis-blue/10 flex items-center justify-center text-phronesis-blue font-bold">PT</div>
                  <div>
                    <h3 className="font-semibold text-ink text-sm">Mathematics (Algebra)</h3>
                    <p className="text-xs text-slate">Live Session • Mr. Omondi</p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold animate-pulse">
                  LIVE
                </div>
              </div>
              <div className="aspect-video bg-cloud rounded-card flex items-center justify-center border border-mist group overflow-hidden relative shadow-inner">
                <video 
                  src="/shared/phronesis-hero.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Floating Stats/Assessment Card */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute left-0 bottom-12 w-[65%] bg-ink/95 backdrop-blur-md rounded-panel shadow-2xl border border-slate/30 p-5 z-30"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium text-sm">Topic Mastery</h4>
                <span className="text-phronesis-gold font-bold text-sm">85%</span>
              </div>
              <div className="w-full h-2 bg-slate/30 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-full bg-phronesis-gold rounded-full" 
                />
              </div>
              <p className="text-xs text-cloud/70 mt-3">Ready for Senior Secondary mock exams.</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
