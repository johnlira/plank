import { Queue } from "bullmq";
import { redisConnection } from "../../../lib/redis";

export const plantProcessingQueue = new Queue("plant-processing", {
  connection: redisConnection,
});

export function addPlantJob(plantId: string, imagePath: string) {
  return plantProcessingQueue.add("identify-plant", { plantId, imagePath });
}
