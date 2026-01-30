"use client";

import { PlantPresentationCard } from "@/components/garden/plant-presentation-card";

export default function PlantPresentationCardShowcase() {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h1 className="text-3xl font-bold">Plant Presentation Card</h1>
        <p className="mt-2 text-muted-foreground">
          Card para apresentar uma planta: ícone (gerado pela IA), nome, descrição e botão &quot;Detalhes&quot;. A imagem do ícone tem padding para aparecer completa, sem corte.
        </p>
      </div>

      {/* Demo com imagem de exemplo */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Exemplo</h2>
        <p className="text-sm text-muted-foreground">
          O título é o nome da planta, a descrição é sobre a planta. O ícone no topo será o gerado pela IA; para demonstração usa-se uma imagem de exemplo. A área da imagem tem padding para a ilustração aparecer inteira.
        </p>
        <div className="max-w-sm">
          <PlantPresentationCard
            name="Rosa do deserto"
            description="Track your plants, get care reminders, and learn from AI-powered identification."
            iconSrc="/plantasonya-removebg-preview.png"
            iconAlt="Planta"
            href="/garden/demo"
          />
        </div>
        <pre className="mt-4 overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
          {`<PlantPresentationCard
  name="Rosa do deserto"
  description="Track your plants, get care reminders..."
  iconSrc="/plantasonya-removebg-preview.png"
  iconAlt="Planta"
  href="/garden/demo"
/>`}
        </pre>
      </section>

      {/* Uso com dados da API */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Uso com dados da planta</h2>
        <p className="text-sm text-muted-foreground">
          Em produção, use <code className="rounded bg-muted px-1">iconPath</code> (ícone gerado pela IA) e <code className="rounded bg-muted px-1">description</code> retornados pela API. O título é o <code className="rounded bg-muted px-1">nickname</code> da planta.
        </p>
        <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-sm">
          {`<PlantPresentationCard
  name={plant.nickname}
  description={plant.description ?? "Sem descrição."}
  iconSrc={plant.iconPath ?? plant.originalImagePath ?? "/placeholder.png"}
  iconAlt={plant.nickname}
  href={\`/garden/\${plant.id}\`}
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
                <th className="p-3 font-medium">Tipo</th>
                <th className="p-3 font-medium">Descrição</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono">name</td>
                <td className="p-3">string</td>
                <td className="p-3">Nome da planta (título)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">description</td>
                <td className="p-3">string</td>
                <td className="p-3">Descrição da planta</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">iconSrc</td>
                <td className="p-3">string</td>
                <td className="p-3">URL do ícone (gerado pela IA)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono">iconAlt</td>
                <td className="p-3">string</td>
                <td className="p-3">Alt da imagem (default: name)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">href</td>
                <td className="p-3">string</td>
                <td className="p-3">Link para a página de detalhes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
