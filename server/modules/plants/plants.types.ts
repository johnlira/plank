import { z } from "zod";

// ==========================================
// ZOD SCHEMAS
// ==========================================

export const CreatePlantSchema = z.object({
  nickname: z.string().min(2, "Nickname must be at least 2 characters"),
});

export type CreatePlantInput = z.infer<typeof CreatePlantSchema>;

// ==========================================
// AI DATA TYPES
// ==========================================

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

// ==========================================
// DATABASE TYPES
// ==========================================

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
  createdAt: Date;
  updatedAt: Date;
}

// Database row (snake_case)
export interface PlantRow {
  id: string;
  user_id: string;
  nickname: string;
  original_image_path: string | null;
  scientific_name: string | null;
  icon_path: string | null;
  description: string | null;
  ai_processing_status: AIProcessingStatus;
  ai_data: AIPlantData | null;
  created_at: Date;
  updated_at: Date;
}

// ==========================================
// DTO TYPES
// ==========================================

export interface CreatePlantDTO {
  nickname: string;
  originalImagePath: string;
}
