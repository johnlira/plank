# Task: Implement AI Background Workers (Google Gemini + BullMQ)

**Context:**
We need to implement the asynchronous processing system for the "Plants" module. When a user creates a plant, the server acknowledges immediately, and a background worker processes the image using **Google Gemini API** to identify the plant and generate care instructions.

**Architectural Standards:**

- **Queue:** BullMQ (backed by Redis Docker container).
- **AI Provider:** Google Gemini API (`@google/generative-ai`).
- **Pattern:** The worker logic should be isolated in `modules/plants/jobs/`.
- **Database:** Raw SQL update using `pg` pool.

**Dependencies:**
Please run: `pnpm add bullmq @google/generative-ai`

**Requirements:**

### 1. Infrastructure Configuration

- **Redis (`lib/redis.ts`):**
  - Export a Redis connection object compatible with BullMQ.
  - Load host/port from env vars (`REDIS_HOST`, `REDIS_PORT`).
- **Gemini (`lib/gemini.ts`):**
  - Initialize `GoogleGenerativeAI` using `process.env.GEMINI_API_KEY`.
  - Export the model instance configured for `"gemini-1.5-flash"` (Fast & Efficient).

### 2. Queue Definition (`modules/plants/jobs/queue.ts`)

- Initialize a BullMQ `Queue` named `'plant-processing'`.
- Export a function `addPlantJob(plantId: string, imagePath: string)` to encapsulate the logic of adding jobs to the queue.

### 3. Worker Processor (`modules/plants/jobs/worker.ts`)

This file contains the actual logic that runs in the background.

**Algorithm:**

1.  **Inputs:** Receive `plantId` and `imagePath` from the job data.
2.  **File Reading:** Read the image file from disk (`fs.readFileSync`) and convert it to Base64.
3.  **AI Request:**
    - Construct a prompt asking to identify the plant and provide care details.
    - **Crucial:** Use the `generationConfig: { responseMimeType: "application/json" }` feature of Gemini to force a structured JSON response.
    - **Schema:** The JSON **must** match the `AIPlantData` type defined in `plants.types.ts`. Request fields:
      - `scientific_name` (string)
      - `description` (string)
      - `care_level` ("EASY" | "MEDIUM" | "HARD")
      - `watering`: { frequency_summer_days, frequency_winter_days, amount, notes }
      - `light`: { type, ideal_hours }
      - `environment`: { min_temp_celsius, max_temp_celsius, humidity, toxicity_pets }
      - `soil`: { type, ph_level }
      - `fertilizer`: { frequency_days, type }
4.  **Database Update:**
    - Parse the JSON response.
    - Execute an SQL `UPDATE` on the `plants` table.
    - Set: `scientific_name`, `description`, `ai_data` (the full JSON), and change `ai_processing_status` to `'COMPLETED'`.
5.  **Error Handling:**
    - Wrap logic in `try/catch`.
    - If any error occurs, update `ai_processing_status` to `'FAILED'` in the database and log the error using `pino`.

### 4. Worker Entry Point (`worker.ts`)

- Create a file in the project root source (`worker.ts`).
- Initialize the BullMQ `Worker` for the `'plant-processing'` queue.
- Pass the processor function imported from `modules/plants/jobs/worker.ts`.
- Log "Worker started..." when ready.

### 5. Integration (`modules/plants/services/create-plant.ts`)

- Modify the existing create service.
- After successfully inserting the plant into the database, call `addPlantJob(plant.id, plant.originalImagePath)`.

### 6. Scripts (`package.json`)

- Add a script: `"worker": "tsx watch worker.ts"`.

**Action:**
Generate the code for these files in the logical order of dependencies.
