import fs from "fs";
import path from "path";
import pino from "pino";
import { Job } from "bullmq";
import { geminiModel } from "../../../lib/gemini";
import { pool } from "../../../lib/database";
import { AIPlantResponse } from "../plants.types";

const logger = pino({ name: "plant-worker" });

const PLANT_JSON_PROMPT = `You are a plant identification and care expert. Analyze the provided plant image and return a single JSON object (no markdown, no code block) with exactly these fields:

- scientific_name: string (Latin name)
- description: string (brief, user-friendly description)
- care_level: "EASY" | "MEDIUM" | "HARD"
- watering: { frequency_summer_days: number, frequency_winter_days: number, amount: "LOW" | "MEDIUM" | "HIGH", notes: string }
- light: { type: "DIRECT" | "INDIRECT" | "SHADE", ideal_hours: number }
- environment: { min_temp_celsius: number, max_temp_celsius: number, humidity: "LOW" | "MEDIUM" | "HIGH", toxicity_pets: boolean }
- soil: { type: string, ph_level: string }
- fertilizer: { frequency_days: number, type: string }`;

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const map: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  };
  return map[ext] ?? "image/jpeg";
}

export async function processPlantJob(job: Job<{ plantId: string; imagePath: string }>): Promise<void> {
  const { plantId, imagePath } = job.data;

  try {
    const buffer = fs.readFileSync(imagePath);
    const base64 = buffer.toString("base64");
    const mimeType = getMimeType(imagePath);

    const result = await geminiModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: PLANT_JSON_PROMPT },
            {
              inlineData: {
                mimeType,
                data: base64,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const text = result.response.text();
    const data = JSON.parse(text) as AIPlantResponse;

    await pool.query(
      `UPDATE plants
       SET scientific_name = $1, description = $2, ai_data = $3, ai_processing_status = 'COMPLETED', updated_at = CURRENT_TIMESTAMP
       WHERE id = $4`,
      [data.scientific_name, data.description, JSON.stringify(data), plantId],
    );
  } catch (err) {
    logger.error({ err, plantId }, "Plant job failed");

    await pool.query(
      `UPDATE plants SET ai_processing_status = 'FAILED', updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [plantId],
    );

    throw err;
  }
}
