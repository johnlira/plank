"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

function ColorSwatch({
  name,
  variable,
  textClass,
}: {
  name: string;
  variable: string;
  textClass?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full h-20 rounded-xl border shadow-sm"
        style={{ backgroundColor: `var(${variable})` }}
      />
      <div className="text-sm">
        <p className={cn("font-medium", textClass)}>{name}</p>
        <p className="text-muted-foreground text-xs font-mono">{variable}</p>
      </div>
    </div>
  );
}

function ColorPair({
  name,
  bgVar,
  fgVar,
}: {
  name: string;
  bgVar: string;
  fgVar: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full h-20 rounded-xl border shadow-sm flex items-center justify-center font-medium"
        style={{
          backgroundColor: `var(${bgVar})`,
          color: `var(${fgVar})`,
        }}
      >
        Aa
      </div>
      <div className="text-sm">
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground text-xs font-mono">{bgVar}</p>
      </div>
    </div>
  );
}

export default function StyleguidePage() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="p-8 space-y-16 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Design Tokens</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Plank Design System - Natural & Modern
          </p>
        </div>
        <Button onClick={toggleTheme} variant="outline" size="lg">
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </Button>
      </div>

      {/* Color Palette */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Color Palette</h2>
          <p className="text-muted-foreground">
            Core colors extracted from the plant shop design reference.
          </p>
        </div>

        {/* Base Colors */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Base Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ColorPair name="Background" bgVar="--background" fgVar="--foreground" />
            <ColorPair name="Card" bgVar="--card" fgVar="--card-foreground" />
            <ColorPair name="Popover" bgVar="--popover" fgVar="--popover-foreground" />
            <ColorPair name="Muted" bgVar="--muted" fgVar="--muted-foreground" />
          </div>
        </div>

        {/* Brand Colors */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Brand Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ColorPair name="Primary" bgVar="--primary" fgVar="--primary-foreground" />
            <ColorPair name="Secondary" bgVar="--secondary" fgVar="--secondary-foreground" />
            <ColorPair name="Accent" bgVar="--accent" fgVar="--accent-foreground" />
            <ColorPair name="Destructive" bgVar="--destructive" fgVar="--destructive-foreground" />
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Semantic Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ColorPair name="Success" bgVar="--success" fgVar="--success-foreground" />
            <ColorPair name="Warning" bgVar="--warning" fgVar="--warning-foreground" />
            <ColorPair name="Info" bgVar="--info" fgVar="--info-foreground" />
            <ColorSwatch name="Ring (Focus)" variable="--ring" />
          </div>
        </div>

        {/* Border & Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Border & Input</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ColorSwatch name="Border" variable="--border" />
            <ColorSwatch name="Input" variable="--input" />
          </div>
        </div>

        {/* Chart Colors */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Chart Colors</h3>
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <ColorSwatch key={n} name={`Chart ${n}`} variable={`--chart-${n}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Typography</h2>
          <p className="text-muted-foreground">
            Poppins font family with multiple weights.
          </p>
        </div>

        <div className="space-y-6 bg-card p-8 rounded-2xl border">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">text-xs (12px)</p>
            <p className="text-xs">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">text-sm (14px)</p>
            <p className="text-sm">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">text-base (16px)</p>
            <p className="text-base">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">text-lg (18px)</p>
            <p className="text-lg">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">text-xl (20px)</p>
            <p className="text-xl">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">text-2xl (24px)</p>
            <p className="text-2xl">The quick brown fox jumps over the lazy dog</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">text-3xl font-semibold (30px)</p>
            <p className="text-3xl font-semibold">The quick brown fox jumps</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">text-4xl font-bold (36px)</p>
            <p className="text-4xl font-bold">The quick brown fox</p>
          </div>
        </div>

        {/* Font Weights */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Font Weights</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-card rounded-xl border text-center">
              <p className="text-2xl font-light">Aa</p>
              <p className="text-xs text-muted-foreground mt-2">Light (300)</p>
            </div>
            <div className="p-4 bg-card rounded-xl border text-center">
              <p className="text-2xl font-normal">Aa</p>
              <p className="text-xs text-muted-foreground mt-2">Regular (400)</p>
            </div>
            <div className="p-4 bg-card rounded-xl border text-center">
              <p className="text-2xl font-medium">Aa</p>
              <p className="text-xs text-muted-foreground mt-2">Medium (500)</p>
            </div>
            <div className="p-4 bg-card rounded-xl border text-center">
              <p className="text-2xl font-semibold">Aa</p>
              <p className="text-xs text-muted-foreground mt-2">Semibold (600)</p>
            </div>
            <div className="p-4 bg-card rounded-xl border text-center">
              <p className="text-2xl font-bold">Aa</p>
              <p className="text-xs text-muted-foreground mt-2">Bold (700)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Border Radius</h2>
          <p className="text-muted-foreground">
            Base radius: 1rem (16px) - Soft, rounded aesthetic.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          {[
            { name: "sm", class: "rounded-sm" },
            { name: "md", class: "rounded-md" },
            { name: "lg", class: "rounded-lg" },
            { name: "xl", class: "rounded-xl" },
            { name: "2xl", class: "rounded-2xl" },
            { name: "3xl", class: "rounded-3xl" },
            { name: "full", class: "rounded-full" },
          ].map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-20 h-20 bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium",
                  r.class
                )}
              >
                {r.name}
              </div>
              <p className="text-xs text-muted-foreground">{r.class}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Shadows</h2>
          <p className="text-muted-foreground">
            Subtle shadows for depth and elevation.
          </p>
        </div>

        <div className="flex flex-wrap gap-8">
          {[
            { name: "shadow-sm", class: "shadow-sm" },
            { name: "shadow", class: "shadow" },
            { name: "shadow-md", class: "shadow-md" },
            { name: "shadow-lg", class: "shadow-lg" },
            { name: "shadow-xl", class: "shadow-xl" },
          ].map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-24 h-24 bg-card rounded-xl flex items-center justify-center border",
                  s.class
                )}
              >
                <span className="text-xs text-muted-foreground">{s.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Components</h2>
          <p className="text-muted-foreground">
            shadcn/ui components with Plank design tokens.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Badges</h3>
          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Alerts</h3>
          <div className="space-y-4 max-w-2xl">
            <Alert>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert for general information.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error Alert</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Plant Card</CardTitle>
                <CardDescription>Default card style</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Perfect for displaying plant information.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Featured</CardTitle>
                <CardDescription className="text-primary-foreground/70">
                  Primary background
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-primary-foreground/80">
                  Highlighted content for emphasis.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle>Secondary</CardTitle>
                <CardDescription>Subtle background</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  For less prominent content.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Design Summary */}
      <section className="space-y-6 border-t pt-8">
        <h2 className="text-2xl font-semibold">Design Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Primary Color</p>
            <p className="font-semibold text-primary">Forest Green</p>
            <p className="text-xs text-muted-foreground mt-1">#3A7D44</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Accent Color</p>
            <p className="font-semibold text-accent">Lime Green</p>
            <p className="text-xs text-muted-foreground mt-1">#8BC34A</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Font Family</p>
            <p className="font-semibold">Poppins</p>
            <p className="text-xs text-muted-foreground mt-1">300-700</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Border Radius</p>
            <p className="font-semibold">16px</p>
            <p className="text-xs text-muted-foreground mt-1">Rounded</p>
          </Card>
        </div>
        <Card className="p-6 bg-muted">
          <p className="text-sm text-muted-foreground mb-2">Overall Style</p>
          <p className="font-medium">
            Natural, organic, and modern. Inspired by plant shop designs with earthy greens,
            soft rounded corners, and a clean, breathable layout. Supports both light and dark modes.
          </p>
        </Card>
      </section>
    </div>
  );
}
