// Espelhando os tipos do servidor

export type AIPlantData = {
  care_level: "EASY" | "MEDIUM" | "HARD";
  watering: {
    frequency_summer_days: number;
    frequency_winter_days: number;
    amount: "LOW" | "MEDIUM" | "HIGH";
    notes: string;
  };
  light: {
    type: "DIRECT" | "INDIRECT" | "SHADE";
    ideal_hours: number;
  };
  environment: {
    min_temp_celsius: number;
    max_temp_celsius: number;
    humidity: "LOW" | "MEDIUM" | "HIGH";
    toxicity_pets: boolean;
  };
  soil: {
    type: string;
    ph_level: string;
  };
  fertilizer: {
    frequency_days: number;
    type: string;
  };
};

export type AIProcessingStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface Plant {
  id: string;
  userId: string;
  nickname: string;
  originalImagePath: string | null;
  scientificName: string | null;
  iconPath: string | null;
  description: string | null;
  aiProcessingStatus: AIProcessingStatus;
  aiData: AIPlantData | null;
  createdAt: string;
  updatedAt: string;
}
