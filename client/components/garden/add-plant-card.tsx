import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AddPlantCardProps {
  onClick?: () => void;
}

export function AddPlantCard({ onClick }: AddPlantCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer border-dashed transition-colors hover:border-primary hover:bg-muted/50"
    >
      <CardContent className="flex flex-col items-center justify-center p-8">
        <div className="mb-4 rounded-full bg-primary/10 p-4">
          <Plus className="size-8 text-primary" />
        </div>
        <span className="font-medium text-foreground">Add new Plant</span>
        <span className="mt-1 text-sm text-muted-foreground">
          Upload a photo to identify
        </span>
      </CardContent>
    </Card>
  );
}
