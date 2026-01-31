"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PENDING_DESCRIPTION = "AI analysis in progress";

interface PlantPresentationCardProps {
  /** Plant name (title) */
  name: string;
  /** Plant description */
  description: string;
  /** Icon/image URL (AI-generated or creation image) */
  iconSrc: string;
  /** Alt text for the image */
  iconAlt?: string;
  /** Link to detail page (e.g. /garden/[id]) */
  href: string;
  /** When true, show spinner instead of icon and "AI analysis in progress" as description */
  isPendingAnalysis?: boolean;
  className?: string;
}

/**
 * Card to display a plant: icon/image, name, description, and "Details" link.
 * When pending AI analysis, shows a spinner and "AI analysis in progress".
 */
export function PlantPresentationCard({
  name,
  description,
  iconSrc,
  iconAlt,
  href,
  isPendingAnalysis = false,
  className,
}: PlantPresentationCardProps) {
  const displayDescription = isPendingAnalysis ? PENDING_DESCRIPTION : description;

  return (
    <Card className={cn("relative overflow-hidden p-0 shadow-sm gap-0 bg-transparent", className)}>
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/15 via-primary/5 to-card -z-10"
        aria-hidden
      />
      <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-t-xl bg-transparent p-6">
        {isPendingAnalysis ? (
          <Loader2
            className="size-12 shrink-0 animate-spin text-muted-foreground"
            aria-label={PENDING_DESCRIPTION}
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={iconSrc}
            alt={iconAlt ?? name}
            className="size-full object-contain"
          />
        )}
      </div>

      <CardHeader className="space-y-2 pt-6 bg-transparent">
        <CardTitle className="text-lg font-bold leading-tight">
          {name}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {displayDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 pb-6 bg-transparent">
        <Link
          href={href}
          className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-primary"
        >
          Details
          <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
