import { AddPlantCard } from "./add-plant-card";

export function PlantsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <AddPlantCard />
      {/* Future: Map over plants array here */}
    </div>
  );
}
