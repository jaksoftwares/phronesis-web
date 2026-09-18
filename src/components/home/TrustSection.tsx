import { CheckCircle2, ShieldAlert } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 space-y-32">
        
        {/* Z-Block 1: Teacher Verification (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 lg:pr-12">
            <div className="w-12 h-12 bg-phronesis-blue/10 rounded-card flex items-center justify-center text-phronesis-blue mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="font-serif italic text-3xl lg:text-4xl text-ink leading-tight">
              Uncompromising Educator Quality.
            </h2>
            <p className="body-large text-slate">
              Every teacher on Phronesis Homeschool undergoes a rigorous, multi-stage academic and professional verification process.
            </p>
            <p className="body-text text-slate">
              From credential checks to demo lessons and ongoing academic reviews, we ensure that only the most qualified and vetted experts are approved to guide our learners. 
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-mist rounded-panel border border-slate/20 shadow-institutional overflow-hidden flex items-center justify-center p-0 relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/shared/teacher-qualified.png" alt="Teacher Verification" className="w-full h-full object-cover" />
            </div>
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-phronesis-teal/10 blur-3xl rounded-full z-0" />
          </div>
        </div>

        {/* Z-Block 2: Safeguarding (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] bg-ink rounded-panel shadow-institutional overflow-hidden flex items-center justify-center p-0 relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/shared/trust-safeguard.png" alt="Trust and Safeguarding" className="w-full h-full object-cover" />
            </div>
             {/* Background Blob */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-phronesis-blue/20 blur-3xl rounded-full z-0" />
          </div>
          <div className="order-1 lg:order-2 space-y-6 lg:pl-12">
            <div className="w-12 h-12 bg-phronesis-teal/10 rounded-card flex items-center justify-center text-phronesis-teal mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="font-serif italic text-3xl lg:text-4xl text-ink leading-tight">
              A Secure Digital Environment.
            </h2>
            <p className="body-large text-slate">
              We prioritize your child's safety above all else. Our platform is built on enterprise-grade security and strict safeguarding protocols.
            </p>
            <p className="body-text text-slate">
              Featuring strict role-based access controls, monitored communication channels, and secure content delivery, we ensure a safe and highly productive learning ecosystem.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
