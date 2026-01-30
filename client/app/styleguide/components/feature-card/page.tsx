"use client";

import { FeatureCard } from "@/components/feature-card";

export default function FeatureCardShowcase() {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h1 className="text-3xl font-bold">Feature Card</h1>
        <p className="mt-2 text-muted-foreground">
          A content card with an optional media area (image or graphic), headline, description, and call-to-action link.
        </p>
      </div>

      {/* Default (decorative graphic) */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Default (decorative graphic)</h2>
        <p className="text-sm text-muted-foreground">
          Uses the built-in abstract graphic when no image or custom media is provided.
        </p>
        <div className="max-w-sm">
          <FeatureCard
            title="Make AI Work for You"
            description="Learn how to use AI to boost productivity, spark creativity, and make smarter decisions, on your terms."
            href="#"
            ctaLabel="Explore"
          />
        </div>
        <pre className="mt-4 overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
          {`<FeatureCard
  title="Make AI Work for You"
  description="Learn how to use AI to boost productivity, spark creativity, and make smarter decisions, on your terms."
  href="#"
  ctaLabel="Explore"
/>`}
        </pre>
      </section>

      {/* With image */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With image</h2>
        <p className="text-sm text-muted-foreground">
          Pass <code className="rounded bg-muted px-1">imageSrc</code> (and optional <code className="rounded bg-muted px-1">imageAlt</code>) to show a photo in the top section.
        </p>
        <div className="max-w-sm">
          <FeatureCard
            title="Grow Your Garden"
            description="Track your plants, get care reminders, and learn from AI-powered identification."
            href="/garden"
            ctaLabel="Get started"
            imageSrc="/plantasonya-removebg-preview.png"
            imageAlt="Plant"
          />
        </div>
        <pre className="mt-4 overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
          {`<FeatureCard
  title="Grow Your Garden"
  description="Track your plants..."
  href="/garden"
  ctaLabel="Get started"
  imageSrc="/plantasonya-removebg-preview.png"
  imageAlt="Plant"
/>`}
        </pre>
      </section>

      {/* Custom CTA label */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom CTA label</h2>
        <p className="text-sm text-muted-foreground">
          Use <code className="rounded bg-muted px-1">ctaLabel</code> to change the link text (default is &quot;Explore&quot;).
        </p>
        <div className="flex max-w-4xl flex-wrap gap-4">
          <div className="max-w-sm">
            <FeatureCard
              title="Quick Start"
              description="Get up and running in minutes."
              href="#"
              ctaLabel="Learn more"
            />
          </div>
          <div className="max-w-sm">
            <FeatureCard
              title="Documentation"
              description="Full API and usage guides."
              href="#"
              ctaLabel="Read docs"
            />
          </div>
        </div>
      </section>

      {/* Props reference */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 font-medium">Prop</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Default</th>
                <th className="p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono">title</td>
                <td className="p-3">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Headline text</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">description</td>
                <td className="p-3">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Supporting description</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">href</td>
                <td className="p-3">string</td>
                <td className="p-3">—</td>
                <td className="p-3">CTA link URL</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">ctaLabel</td>
                <td className="p-3">string</td>
                <td className="p-3">&quot;Explore&quot;</td>
                <td className="p-3">CTA link label</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">imageSrc</td>
                <td className="p-3">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Optional image URL for top section</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">imageAlt</td>
                <td className="p-3">string</td>
                <td className="p-3">title</td>
                <td className="p-3">Alt text when using imageSrc</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">media</td>
                <td className="p-3">ReactNode</td>
                <td className="p-3">—</td>
                <td className="p-3">Custom content for top area (overrides image)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">className</td>
                <td className="p-3">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Additional class names for the card</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Accessibility</h2>
        <ul className="list-inside list-disc text-sm text-muted-foreground">
          <li>The CTA is a semantic <code className="rounded bg-muted px-1">Link</code> for keyboard navigation.</li>
          <li>When using <code className="rounded bg-muted px-1">imageSrc</code>, always provide <code className="rounded bg-muted px-1">imageAlt</code> (or rely on the default from title).</li>
        </ul>
      </section>
    </div>
  );
}
