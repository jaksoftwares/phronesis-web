import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-cloud border-t-4 border-phronesis-blue font-sans">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand & Contact Column */}
          <div className="lg:col-span-2 space-y-6">
            <Logo variant="stacked" color="white" width={160} height={160} className="mb-4" />
            <div>
              <p className="font-serif italic text-phronesis-gold text-lg">Genesis of Knowledge</p>
              <p className="text-sm text-slate mt-1">Cream for Sprouting Minds</p>
            </div>
            <div className="space-y-2 text-sm text-mist">
              <p>Nairobi, Kenya</p>
              <p>0723 376 024 / 0113 093 087</p>
              <p>phronesishomeschool@gmail.com</p>
            </div>
          </div>

          {/* Academics */}
          <div className="space-y-6">
            <h4 className="font-bold text-white tracking-wide uppercase text-sm">Academics</h4>
            <ul className="space-y-3 text-sm text-mist">
              <li><Link href="/curriculum/jss" className="hover:text-phronesis-teal transition-colors">CBC Grades 7–9 (JSS)</Link></li>
              <li><Link href="/curriculum/sss" className="hover:text-phronesis-teal transition-colors">CBC Grades 10–12 (SSS)</Link></li>
              <li><Link href="/virtual-classes" className="hover:text-phronesis-teal transition-colors">Virtual Classes</Link></li>
              <li><Link href="/resources" className="hover:text-phronesis-teal transition-colors">Resource Library</Link></li>
              <li><Link href="/assessments" className="hover:text-phronesis-teal transition-colors">Mock Exams</Link></li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-6">
            <h4 className="font-bold text-white tracking-wide uppercase text-sm">Portals</h4>
            <ul className="space-y-3 text-sm text-mist">
              <li><Link href="/login?role=learner" className="hover:text-phronesis-teal transition-colors">Learner Portal</Link></li>
              <li><Link href="/login?role=teacher" className="hover:text-phronesis-teal transition-colors">Teacher Arena</Link></li>
              <li><Link href="/login?role=guardian" className="hover:text-phronesis-teal transition-colors">Guardian Portal</Link></li>
              <li><Link href="/teach" className="hover:text-phronesis-teal transition-colors">Teach With Us</Link></li>
            </ul>
          </div>

          {/* Institution & Legal */}
          <div className="space-y-6">
            <h4 className="font-bold text-white tracking-wide uppercase text-sm">Institution</h4>
            <ul className="space-y-3 text-sm text-mist">
              <li><Link href="/about" className="hover:text-phronesis-teal transition-colors">About Phronesis</Link></li>
              <li><Link href="/identity" className="hover:text-phronesis-teal transition-colors">Brand Identity</Link></li>
              <li><Link href="/brand-audit" className="hover:text-phronesis-teal transition-colors">Brand Audit</Link></li>
              <li><Link href="/safeguarding" className="hover:text-phronesis-teal transition-colors">Safeguarding Policy</Link></li>
              <li><Link href="/terms" className="hover:text-phronesis-teal transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-phronesis-teal transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-phronesis-teal transition-colors">Contact Us</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate/30 bg-[#121A22]">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate">
            &copy; {currentYear} Phronesis Homeschool. All rights reserved.
          </p>
          <div className="flex gap-4 text-slate">
            {/* Social Icons Placeholders */}
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="X">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
