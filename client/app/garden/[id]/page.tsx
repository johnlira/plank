"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Share2,
  Droplets,
  Wind,
  Sun,
  Thermometer,
  Loader2,
  Leaf,
  AlertTriangle,
} from "lucide-react";
import type { Plant } from "@/lib/types/plant";

// Helpers
function getCareLevelLabel(level: string) {
  const labels: Record<string, string> = {
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Hard",
  };
  return labels[level] || level;
}

function getCareLevelColor(level: string) {
  const colors: Record<string, string> = {
    EASY: "bg-green-500/10 text-green-600 border-green-500/30",
    MEDIUM: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    HARD: "bg-red-500/10 text-red-600 border-red-500/30",
  };
  return colors[level] || "";
}

function getHumidityLabel(humidity: string) {
  const labels: Record<string, string> = {
    LOW: "up to 40%",
    MEDIUM: "up to 60%",
    HIGH: "up to 82%",
  };
  return labels[humidity] || humidity;
}

function getLightLabel(type: string) {
  const labels: Record<string, string> = {
    DIRECT: "Direct light",
    INDIRECT: "Indirect light",
    SHADE: "Shade",
  };
  return labels[type] || type;
}

function getWaterAmount(amount: string) {
  const values: Record<string, string> = {
    LOW: "100 ml",
    MEDIUM: "250 ml",
    HIGH: "400 ml",
  };
  return values[amount] || amount;
}

export default function PlantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPlant() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/plants/${params.id}`,
          { credentials: "include" }
        );
        if (response.ok) {
          const data = await response.json();
          setPlant(data);
        }
      } catch (error) {
        console.error("Failed to fetch plant:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (params.id) {
      fetchPlant();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Plant not found</p>
        <Button variant="outline" onClick={() => router.push("/garden")}>
          Back to garden
        </Button>
      </div>
    );
  }

  const aiData = plant.aiData;
  const isPending = plant.aiProcessingStatus === "PENDING";

  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left column - Info card */}
        <div className="p-6 lg:p-12 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/garden")}
              className="cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            {/* Icon and name */}
            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                {plant.iconPath ? (
                  <Image
                    src={plant.iconPath}
                    alt={plant.nickname}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl">🌱</span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {plant.nickname}
                </h1>
                {plant.scientificName && (
                  <p className="text-muted-foreground italic">
                    {plant.scientificName}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            {plant.description && (
              <p className="text-muted-foreground leading-relaxed mb-8">
                {plant.description}
              </p>
            )}

            {/* Processing status */}
            {isPending && (
              <div className="flex items-center gap-3 p-4 bg-blue-500/10 rounded-lg mb-8">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                <div>
                  <p className="font-medium text-blue-600">Analyzing plant...</p>
                  <p className="text-sm text-muted-foreground">
                    AI is identifying your plant
                  </p>
                </div>
              </div>
            )}

            {/* Quick info */}
            {aiData && (
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Leaf className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Care level</span>
                  <Badge
                    variant="outline"
                    className={getCareLevelColor(aiData.care_level)}
                  >
                    {getCareLevelLabel(aiData.care_level)}
                  </Badge>
                </div>

                {aiData.environment.toxicity_pets && (
                  <div className="flex items-center gap-3 text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm">Toxic to pets</span>
                  </div>
                )}
              </div>
            )}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Action buttons */}
            <div className="space-y-3">
              <Button className="w-full cursor-pointer" size="lg">
                Water now
              </Button>
              <Button
                variant="outline"
                className="w-full cursor-pointer"
                size="lg"
              >
                Add to calendar
              </Button>
            </div>
          </div>
        </div>

        {/* Right column - Image and metrics */}
        <div className="relative bg-muted/30 lg:rounded-l-[3rem] overflow-hidden">
          {/* Plant image */}
          <div className="relative h-[50vh] lg:h-[60vh]">
            {plant.originalImagePath ? (
              <Image
                src={plant.originalImagePath}
                alt={plant.nickname}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-green-100 to-green-50 dark:from-green-950 dark:to-green-900">
                <span className="text-9xl">🌿</span>
              </div>
            )}
          </div>

          {/* Metrics card */}
          {aiData && (
            <Card className="mx-4 lg:mx-8 -mt-16 relative z-10 shadow-lg">
              <CardContent className="p-6">
                {/* Info rows */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-3 text-muted-foreground">
                      <Droplets className="w-4 h-4" />
                      Water
                    </span>
                    <span className="font-medium">
                      every {aiData.watering.frequency_summer_days} days
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-3 text-muted-foreground">
                      <Wind className="w-4 h-4" />
                      Humidity
                    </span>
                    <span className="font-medium">
                      {getHumidityLabel(aiData.environment.humidity)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <span className="flex items-center gap-3 text-muted-foreground">
                      <Sun className="w-4 h-4" />
                      Light
                    </span>
                    <span className="font-medium">
                      {getLightLabel(aiData.light.type)}
                    </span>
                  </div>
                </div>

                {/* Care notes */}
                {aiData.watering.notes && (
                  <p className="text-sm text-muted-foreground mt-6 pt-4 border-t leading-relaxed">
                    {aiData.watering.notes}
                  </p>
                )}

                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <div className="flex justify-center gap-1 mb-2 text-muted-foreground">
                      <Droplets className="w-4 h-4" />
                      <Droplets className="w-4 h-4" />
                      <Droplets className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-green-600 font-medium mb-1">
                      Water
                    </p>
                    <p className="text-xl font-bold">
                      {getWaterAmount(aiData.watering.amount)}
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <div className="flex justify-center gap-1 mb-2 text-muted-foreground">
                      <Sun className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-green-600 font-medium mb-1">
                      Temperature
                    </p>
                    <p className="text-xl font-bold">
                      {aiData.environment.min_temp_celsius}-
                      {aiData.environment.max_temp_celsius} °C
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
