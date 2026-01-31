"use client";

import { PlantPresentationCard } from "@/components/garden/plant-presentation-card";

export default function PlantPresentationCardShowcase() {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h1 className="text-3xl font-bold">Plant Presentation Card</h1>
        <p className="mt-2 text-muted-foreground">
          Card to display a plant: icon (AI-generated), name, description, and &quot;Details&quot; link. When pending AI analysis, shows a spinner and &quot;AI analysis in progress&quot;. The icon area has padding so the image is fully visible.
        </p>
      </div>

      {/* Demo with sample image */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Example</h2>
        <p className="text-sm text-muted-foreground">
          The title is the plant name, the description is about the plant. The top icon is AI-generated; for demo we use a sample image. The image area has padding so the illustration is fully visible.
        </p>
        <div className="max-w-sm">
          <PlantPresentationCard
            name="Desert rose"
            description="Track your plants, get care reminders, and learn from AI-powered identification."
            iconSrc="/plantasonya-removebg-preview.png"
            iconAlt="Plant"
            href="/garden/demo"
          />
        </div>
        <pre className="mt-4 overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
          {`<PlantPresentationCard
  name="Desert rose"
  description="Track your plants, get care reminders..."
  iconSrc="/plantasonya-removebg-preview.png"
  iconAlt="Plant"
  href="/garden/demo"
/>`}
        </pre>
      </section>

      {/* Usage with API data */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usage with plant data</h2>
        <p className="text-sm text-muted-foreground">
          In production, use <code className="rounded bg-muted px-1">iconPath</code> (AI-generated icon) and <code className="rounded bg-muted px-1">description</code> from the API. The title is the plant&apos;s <code className="rounded bg-muted px-1">nickname</code>. Pass <code className="rounded bg-muted px-1">isPendingAnalysis</code> when <code className="rounded bg-muted px-1">aiProcessingStatus === &quot;PENDING&quot;</code>.
        </p>
        <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
          {`<PlantPresentationCard
  name={plant.nickname}
  description={plant.description ?? "No description."}
  iconSrc={getPlantImageUrl(plant)}
  iconAlt={plant.nickname}
  href={\`/garden/\${plant.id}\`}
  isPendingAnalysis={plant.aiProcessingStatus === "PENDING"}
/>`}
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 font-medium">Prop</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono">name</td>
                <td className="p-3">string</td>
                <td className="p-3">Plant name (title)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">description</td>
                <td className="p-3">string</td>
                <td className="p-3">Plant description</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">iconSrc</td>
                <td className="p-3">string</td>
                <td className="p-3">Icon/image URL (AI-generated)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">iconAlt</td>
                <td className="p-3">string</td>
                <td className="p-3">Image alt (default: name)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">href</td>
                <td className="p-3">string</td>
                <td className="p-3">Link to detail page</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">isPendingAnalysis</td>
                <td className="p-3">boolean</td>
                <td className="p-3">When true, shows spinner and &quot;AI analysis in progress&quot;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
