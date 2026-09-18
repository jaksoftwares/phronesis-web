"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function CurriculumTabs() {
  const [activeTab, setActiveTab] = useState<"jss" | "sss">("jss");

  return (
    <section className="py-24 bg-cloud border-y border-mist">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <h2 className="h2 text-phronesis-blue">Curriculum Pathways</h2>
          <p className="body-text text-slate">
            Tailored learning experiences designed specifically for the Kenyan Competency-Based Curriculum.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-full border border-mist flex shadow-sm inline-flex">
            <button
              onClick={() => setActiveTab("jss")}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                activeTab === "jss"
                  ? "bg-phronesis-blue text-white shadow-md"
                  : "text-slate hover:text-ink hover:bg-mist/50"
              }`}
            >
              Junior Secondary (Grades 7–9)
            </button>
            <button
              onClick={() => setActiveTab("sss")}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all ${
                activeTab === "sss"
                  ? "bg-phronesis-blue text-white shadow-md"
                  : "text-slate hover:text-ink hover:bg-mist/50"
              }`}
            >
              Senior Secondary (Grades 10–12)
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto bg-white rounded-panel border border-mist shadow-institutional overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "jss" && (
              <motion.div
                key="jss"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 h-full"
              >
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-ink mb-4">Building Foundational Competence</h3>
                  <p className="text-slate leading-relaxed mb-8">
                    Our Junior Secondary School program focuses on equipping learners with essential CBC competencies. We cover core areas including Mathematics, Integrated Science, Pre-Technical Studies, and Languages, ensuring a smooth transition into senior pathways.
                  </p>
                  <ul className="space-y-4 text-sm font-medium text-ink">
                    <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-phronesis-teal" /> Mathematics & Integrated Science</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-phronesis-teal" /> Pre-Technical Studies</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-phronesis-teal" /> Languages (English, Kiswahili, Foreign)</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-phronesis-teal" /> Social Studies & CRE</li>
                  </ul>
                </div>
                <div className="bg-mist/30 border-l border-mist p-0 flex items-center justify-center overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/shared/jss-pathway.png" alt="JSS Pathway" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            )}

            {activeTab === "sss" && (
              <motion.div
                key="sss"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 h-full"
              >
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-ink mb-4">Deep Pathway-Oriented Learning</h3>
                  <p className="text-slate leading-relaxed mb-8">
                    Senior Secondary School requires intense focus and specialization. We provide comprehensive examination preparation and specialized support across STEM, Arts, and Social Science pathways to help learners master complex subjects and achieve academic excellence.
                  </p>
                  <ul className="space-y-4 text-sm font-medium text-ink">
                    <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-phronesis-gold" /> Specialized STEM Subjects (Physics, Chem, Bio)</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-phronesis-gold" /> Advanced Mathematics</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-phronesis-gold" /> Humanities & Social Sciences</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-phronesis-gold" /> Mock Exams & Revision Mastery</li>
                  </ul>
                </div>
                <div className="bg-ink border-l border-slate/30 p-0 flex items-center justify-center overflow-hidden text-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/shared/sss-pathway.png" alt="SSS Pathway" className="w-full h-full object-cover opacity-90" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
