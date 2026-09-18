import { HeroSection } from "@/components/home/HeroSection";
import { CredibilityBanner } from "@/components/home/CredibilityBanner";
import { CoreCapabilities } from "@/components/home/CoreCapabilities";
import { CurriculumTabs } from "@/components/home/CurriculumTabs";
import { TrustSection } from "@/components/home/TrustSection";
import { EnrollmentStepper } from "@/components/home/EnrollmentStepper";
import { TerminalCta } from "@/components/home/TerminalCta";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden font-sans">
      <HeroSection />
      <CredibilityBanner />
      <CoreCapabilities />
      <CurriculumTabs />
      <TrustSection />
      <EnrollmentStepper />
      <TerminalCta />
    </div>
  );
}
