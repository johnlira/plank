import { Worker } from "bullmq";
import { redisConnection } from "./lib/redis";
import { processPlantJob } from "./modules/plants/jobs/worker";

const worker = new Worker(
  "plant-processing",
  async (job) => processPlantJob(job),
  { connection: redisConnection },
);

worker.on("ready", () => {
  console.log("Worker started...");
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});
