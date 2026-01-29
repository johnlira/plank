import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-background px-6 py-12">
      {/* Theme Toggle */}
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      {/* Logo */}
      <span className="mb-12 text-3xl font-semibold text-foreground">Plank</span>

      {/* Plant Image */}
      <div className="relative mb-6 h-48 w-48 lg:h-64 lg:w-64">
        <Image
          src="/plantasonya-removebg-preview.png"
          alt="Plank Plant"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Label */}
      <span className="mb-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        AI-Powered Plant Care
      </span>

      {/* Title */}
      <h1 className="mb-6 text-center text-5xl font-bold leading-none text-foreground lg:text-7xl">
        Smart care for
        <br />
        your plants.
      </h1>

      {/* Description */}
      <p className="mb-8 max-w-xl text-center text-muted-foreground">
        An intelligent platform that identifies your plants, creates
        personalized care schedules, and sends reminders so you never forget to
        water them again.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="cursor-pointer gap-2 rounded-full hover:text-white"
        >
          <Link href="/signin">
            Get Started
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="cursor-pointer rounded-full hover:text-white"
        >
          <Link href="#">Documentation</Link>
        </Button>
      </div>
    </div>
  );
}
