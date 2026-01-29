import { ThemeToggle } from "@/components/theme-toggle";
import { HeroImage, HeroContent, CtaButtons } from "@/components/home";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-background px-6 py-12">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <span className="mb-12 text-3xl font-semibold text-foreground">Plank</span>

      <HeroImage />
      <HeroContent />
      <CtaButtons />
    </div>
  );
}
