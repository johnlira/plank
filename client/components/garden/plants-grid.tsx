"use client";

import { useEffect } from "react";
import { usePlantStore, getPlantImageUrl } from "@/stores/usePlantStore";
import { PlantPresentationCard } from "./plant-presentation-card";

export function PlantsGrid() {
  const { plants, fetchPlants, isInitialized } = usePlantStore();

  useEffect(() => {
    if (isInitialized) return;
    fetchPlants();
  }, [isInitialized, fetchPlants]);

  if (plants.length === 0) {
    return (
      <p className="text-muted-foreground">
        No plants yet. Add one to get started.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {plants.map((plant) => (
        <PlantPresentationCard
          key={plant.id}
          name={plant.nickname}
          description={plant.description ?? plant.scientificName ?? "—"}
          iconSrc={getPlantImageUrl(plant)}
          iconAlt={plant.nickname}
          href={`/garden/${plant.id}`}
          isPendingAnalysis={plant.aiProcessingStatus === "PENDING"}
        />
      ))}
    </div>
  );
}
