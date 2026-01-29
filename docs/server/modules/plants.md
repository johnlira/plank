# Task: Implement Plants Module (Create & Upload)

**Context:**
I need to implement the `plants` module to handle the creation of new plants. This involves receiving an image file (`multipart/form-data`), saving it locally, and inserting the initial record into the database.

**Architectural Standards:**

- **Path:** `modules/plants/`
- **Pattern:** Repository-Service-Controller (as defined in `backend-architecture.md`).
- **Database:** Raw SQL using the existing pool from `src/lib/database.ts`.
- **Validation:** `zod` schemas.

**Requirements:**

### 1. Configuration (File Upload)

Create `src/config/upload.ts`:

- Configure `multer` to save files to the root `./uploads` directory.
- Use a filename strategy: `${Date.now()}-${originalName}` to avoid conflicts.
- Filter: Accept only images (`image/jpeg`, `image/png`, `image/webp`).
- Ensure the directory exists (or create it) before saving.

### 2. File Structure & Responsibilities

#### A. `plants.types.ts`

- **Zod Schema:**
  - `CreatePlantSchema`: `nickname` (string, min 2 chars). _Note: The image is handled by multer, not Zod._
- **Database Types:**
  - Define the `Plant` interface matching the DB columns (convert snake_case to camelCase if needed for the application layer).
  - **Crucial:** Define a rich `AIPlantData` type for the `ai_data` JSONB column. It must include detailed fields for the AI logic:
    ```typescript
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
    ```

#### B. `plants.repository.ts` (Data Access)

- Import `pool` from `src/lib/database.ts`.
- **`create(userId: string, data: CreatePlantDTO)`**:
  - Insert into `plants` table.
  - Fields: `nickname`, `original_image_path`, `user_id`.
  - Set `ai_processing_status` to `'PENDING'`.
  - Return the created plant object (formatted as camelCase).

#### C. `plants.services.ts` (`src/modules/plants/services/`)

- **`create-plant.ts`**:
  - Receive: `userId`, `nickname`, `file` (Express.Multer.File).
  - Validation: If `file` is missing, throw an `AppError('Image is required')`.
  - Logic: Call repository to save the record.
  - **TODO:** Add a comment: `// TODO: Trigger AI Background Job (BullMQ) here`.
  - Return the plant.

#### D. `plants.controller.ts`

- **`create`**:
  - Use `CreatePlantSchema` to validate `req.body`.
  - Call `createPlant` service passing `req.user.id`, `req.body.nickname`, and `req.file`.
  - Return `201 Created` with the plant data.

#### E. `plants.routes.ts`

- `POST /`
- **Middleware Chain:** `ensureAuthenticated` -> `upload.single('image')` -> `controller.create`.

**Action:**
Generate the code for these files in the following order: Upload Config, Types, Repository, Services, Controller, Routes. Ensure you use the existing DB pool.
