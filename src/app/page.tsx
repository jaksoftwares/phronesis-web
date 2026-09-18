import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-cloud text-ink font-sans flex flex-col">
      <header className="border-b border-mist bg-white">
        <div className="container mx-auto px-8 py-4 flex justify-between items-center">
          <Logo variant="horizontal" color="deep-blue" width={200} height={60} />
          <nav className="flex gap-6 items-center font-medium text-slate">
            <Link href="/identity" className="hover:text-phronesis-teal transition-colors">
              Brand Identity Reference
            </Link>
            <Link href="/brand-audit" className="hover:text-phronesis-teal transition-colors">
              Brand Audit
            </Link>
            <Link href="/login" className="px-5 py-2 bg-phronesis-blue text-white rounded-input hover:bg-phronesis-blue/90 transition-colors shadow-sm">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-8 py-16 flex flex-col items-center justify-center text-center max-w-3xl space-y-8">
        <h1 className="h1 text-phronesis-blue">
          Welcome to Phronesis Homeschool
        </h1>
        <p className="body-large text-slate">
          An institutional grade digital education platform designed to foster academic excellence, character development, and independent learning.
        </p>
        <div className="pt-4 flex gap-4">
          <button className="px-8 py-3 bg-phronesis-blue text-white font-medium rounded-input hover:bg-phronesis-blue/90 transition-colors shadow-institutional">
            Explore Curriculum
          </button>
          <button className="px-8 py-3 bg-white border border-mist text-ink font-medium rounded-input hover:bg-cloud transition-colors shadow-sm">
            Learn More
          </button>
        </div>
      </main>

      <footer className="border-t border-mist py-8 bg-white mt-auto">
        <div className="container mx-auto px-8 text-center text-sm text-slate">
          &copy; {new Date().getFullYear()} Phronesis Homeschool. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
