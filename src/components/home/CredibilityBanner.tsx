import { BookOpen, ShieldCheck, Video } from "lucide-react";

export function CredibilityBanner() {
  return (
    <div className="bg-phronesis-blue text-white py-6 border-y border-[#1a446e]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#1a446e]">
          
          <div className="flex flex-col items-center justify-center space-y-2 pt-4 md:pt-0">
            <BookOpen className="w-6 h-6 text-phronesis-teal" />
            <span className="font-semibold tracking-wide text-sm">CBC Aligned Grades 7–12</span>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-2 pt-4 md:pt-0">
            <ShieldCheck className="w-6 h-6 text-phronesis-teal" />
            <span className="font-semibold tracking-wide text-sm">Verified Professional Educators</span>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-2 pt-4 md:pt-0">
            <Video className="w-6 h-6 text-phronesis-teal" />
            <span className="font-semibold tracking-wide text-sm">Live & Interactive Virtual Tuition</span>
          </div>

        </div>
      </div>
    </div>
  );
}
