import Link from "next/link";

export function TerminalCta() {
  return (
    <section className="py-32 bg-phronesis-blue relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#112d4a] rounded-l-full blur-[120px] opacity-60" />
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-phronesis-teal rounded-tr-full blur-[100px] opacity-20" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-3xl">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Ready to transform your learning experience?
        </h2>
        <p className="text-cloud/80 text-lg mb-12">
          Join the Phronesis family today and unlock the Genesis of Knowledge. Whether you are a learner eager to excel or an educator ready to inspire, your workspace awaits.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="/learner/register" 
            className="w-full sm:w-auto px-8 py-4 bg-phronesis-gold text-phronesis-blue font-bold rounded-input hover:bg-white transition-colors shadow-institutional"
          >
            Start Learning Now
          </Link>
          <Link 
            href="/teacher/apply" 
            className="w-full sm:w-auto px-10 py-4 bg-transparent border-2 border-cloud/30 text-white font-bold rounded-input hover:bg-cloud/10 hover:border-cloud transition-colors text-lg"
          >
            Apply to Teach
          </Link>
        </div>
      </div>
    </section>
  );
}
