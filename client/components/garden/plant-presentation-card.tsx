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

interface PlantPresentationCardProps {
  /** Nome da planta (título) */
  name: string;
  /** Descrição da planta */
  description: string;
  /** URL do ícone gerado pela IA (para demo pode ser a imagem de criação) */
  iconSrc: string;
  /** Texto alternativo da imagem */
  iconAlt?: string;
  /** Link para a página de detalhes (ex: /garden/[id]) */
  href: string;
  className?: string;
}

/**
 * Card para apresentar uma planta: ícone (IA), nome, descrição e botão "Detalhes".
 * A imagem do ícone tem padding para aparecer completa, sem corte.
 */
export function PlantPresentationCard({
  name,
  description,
  iconSrc,
  iconAlt,
  href,
  className,
}: PlantPresentationCardProps) {
  return (
    <Card className={cn("relative overflow-hidden p-0 shadow-sm gap-0 bg-transparent", className)}>
      {/* Mesmo background do Feature Card: fade linear em todo o card */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/15 via-primary/5 to-card -z-10"
        aria-hidden
      />
      {/* Área do ícone com padding para a imagem aparecer completa */}
      <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-t-xl bg-transparent p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconSrc}
          alt={iconAlt ?? name}
          className="size-full object-contain"
        />
      </div>

      <CardHeader className="space-y-2 pt-6 bg-transparent">
        <CardTitle className="text-lg font-bold leading-tight">
          {name}
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
          Detalhes
          <ArrowRight className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
