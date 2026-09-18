import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-mist shadow-sm">
      {/* Top Bar - Contact & Support */}
      <div className="bg-ink text-cloud py-1.5 px-4 text-xs font-medium hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span>📞 0723 376 024 / 0113 093 087</span>
            <span>✉️ phronesishomeschool@gmail.com</span>
          </div>
          <div>
            <Link href="/helpdesk" className="hover:text-phronesis-gold transition-colors">
              Support & Helpdesk
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 lg:px-8 py-4 flex justify-between items-center">
        {/* Brand Lockup */}
        <Link href="/" className="flex-shrink-0">
          <Logo variant="horizontal" color="deep-blue" width={220} height={60} />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-medium text-ink">
          {/* Curriculum Dropdown Placeholder */}
          <div className="group relative">
            <button className="hover:text-phronesis-teal transition-colors flex items-center gap-1">
              Curriculum ▾
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-mist shadow-institutional rounded-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="p-2 space-y-1">
                <Link href="/curriculum/jss" className="block px-4 py-2 hover:bg-cloud rounded-input transition-colors">
                  <span className="block text-sm font-semibold text-phronesis-blue">Junior Secondary</span>
                  <span className="block text-xs text-slate mt-0.5">CBC Grades 7–9</span>
                </Link>
                <Link href="/curriculum/sss" className="block px-4 py-2 hover:bg-cloud rounded-input transition-colors">
                  <span className="block text-sm font-semibold text-phronesis-blue">Senior Secondary</span>
                  <span className="block text-xs text-slate mt-0.5">CBC Grades 10–12</span>
                </Link>
              </div>
            </div>
          </div>
          <Link href="/virtual-classes" className="hover:text-phronesis-teal transition-colors">
            Virtual Tuition
          </Link>
          <Link href="/assessments" className="hover:text-phronesis-teal transition-colors">
            Assessments
          </Link>
          <Link href="/pricing" className="hover:text-phronesis-teal transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-phronesis-teal transition-colors">
            About Us
          </Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <Link 
            href="/learner/login"
            className="hidden md:flex px-6 py-2 border border-mist text-ink font-medium rounded-input hover:bg-cloud transition-colors shadow-sm"
          >
            Sign In
          </Link>
          <Link 
            href="/learner/register"
            className="px-6 py-2 bg-phronesis-blue text-white font-medium rounded-input hover:bg-phronesis-blue/90 transition-colors shadow-institutional"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </header>
  );
}
