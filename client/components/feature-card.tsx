"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeatureCardProps {
  /** Headline text */
  title: string;
  /** Supporting description */
  description: string;
  /** CTA link href */
  href: string;
  /** CTA label (default: "Explore") */
  ctaLabel?: string;
  /** Image URL for the top section, or omit to use default graphic */
  imageSrc?: string;
  /** Alt text when using imageSrc */
  imageAlt?: string;
  /** Custom content for the top media area (overrides imageSrc) */
  media?: React.ReactNode;
  className?: string;
}

/** Default decorative graphic (glowing abstract style) */
function DefaultMedia() {
  return (
    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-t-xl bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,oklch(0.6_0.15_250_/_.4),transparent)]" />
      <svg
        className="relative h-2/3 w-2/3 opacity-90"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 20 L60 100 M20 60 L100 60 M35 35 L85 85 M85 35 L35 85 M60 35 L75 60 L60 85 L45 60 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-primary/60"
        />
        <circle cx="60" cy="60" r="8" className="fill-primary/40" />
      </svg>
    </div>
  );
}

export function FeatureCard({
  title,
  description,
  href,
  ctaLabel = "Explore",
  imageSrc,
  imageAlt,
  media,
  className,
}: FeatureCardProps) {
  const mediaContent = media ?? (
    imageSrc ? (
      <div className="aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-transparent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt ?? title}
          className="size-full object-cover"
        />
      </div>
    ) : (
      <DefaultMedia />
    )
  );

  return (
    <Card className={cn("relative overflow-hidden p-0 shadow-sm gap-0 bg-transparent", className)}>
      {/* Fade linear em todo o card (mesmo bg do Plant Presentation Card) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/15 via-primary/5 to-card -z-10"
        aria-hidden
      />
      {mediaContent}
      <CardHeader className="space-y-2 pt-6 bg-transparent">
        <CardTitle className="text-lg font-bold leading-tight">
          {title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-6 bg-transparent">
        <Link
          href={href}
          className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-primary"
        >
          {ctaLabel}
          <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
