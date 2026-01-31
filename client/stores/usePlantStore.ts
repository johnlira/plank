import { create } from "zustand";
import { toast } from "sonner";
import type { Plant } from "@/lib/types/plant";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api";

function getUploadsBaseUrl(): string {
  const base = API_URL.replace(/\/api\/?$/, "");
  return `${base}/uploads`;
}

export function getPlantImageUrl(plant: Plant): string {
  const base = getUploadsBaseUrl();
  const path = plant.iconPath ?? plant.originalImagePath;
  if (!path) return "/plantasonya-removebg-preview.png";
  if (path.startsWith("http")) return path;
  const filename = path.replace(/^.*[/\\]/, "") || path;
  return `${base}/${filename}`;
}

interface PlantState {
  plants: Plant[];
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

interface PlantActions {
  fetchPlants: () => Promise<void>;
  createPlant: (nickname: string, imageFile: File) => Promise<Plant | null>;
  clearError: () => void;
}

type PlantStore = PlantState & PlantActions;

export const usePlantStore = create<PlantStore>((set, get) => ({
  plants: [],
  isLoading: false,
  isInitialized: false,
  error: null,

  fetchPlants: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/plants`, {
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to fetch plants");
      }

      const plants: Plant[] = await response.json();
      set({ plants, isLoading: false, isInitialized: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch plants";
      set({ error: message, isLoading: false, isInitialized: true });
      toast.error("Failed to load plants", { description: message });
    }
  },

  createPlant: async (nickname: string, imageFile: File) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("nickname", nickname.trim());
      formData.append("image", imageFile);

      const response = await fetch(`${API_URL}/plants`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Failed to create plant");
      }

      const plant: Plant = await response.json();
      set((state) => ({
        plants: [plant, ...state.plants],
        isLoading: false,
      }));

      toast.success("Planta adicionada!", {
        description: `${plant.nickname} foi adicionada ao seu jardim.`,
      });

      return plant;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create plant";
      set({ error: message, isLoading: false });
      toast.error("Failed to create plant", { description: message });
      return null;
    }
  },

  clearError: () => set({ error: null }),
}));
