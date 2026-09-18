export function EnrollmentStepper() {
  const steps = [
    { num: "01", title: "Create Account", desc: "Secure your personal portal in minutes." },
    { num: "02", title: "Select a Plan", desc: "Choose flexible subscriptions tailored to your needs." },
    { num: "03", title: "Access Library", desc: "Dive into our premium CBC content and assessments." },
    { num: "04", title: "Book Classes", desc: "Connect and learn live with verified educators." }
  ];

  return (
    <section className="py-24 bg-cloud border-t border-mist">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="h2 text-phronesis-blue">Your Journey Begins Here</h2>
          <p className="body-text text-slate">
            Getting started with Phronesis Homeschool is a seamless and guided experience.
          </p>
        </div>

        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-mist/80 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group cursor-default">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-mist group-hover:border-phronesis-teal flex items-center justify-center text-3xl font-serif font-bold text-phronesis-blue shadow-sm mb-6 transition-colors duration-300">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">{step.title}</h3>
                <p className="text-slate text-sm px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
