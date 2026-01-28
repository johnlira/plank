# Smart Garden - Feature Specification (MVP)

## 1. System Architecture
The project operates on a *self-hosted* model, prioritizing data sovereignty and local execution.

* **Backend:** Node.js (Express) + TypeScript.
* **Database:** PostgreSQL (Native `pg` driver).
* **AI Engine (Local):** Ollama (Llama 3 + Llava).
* **Processing Queue:** Redis + BullMQ (to handle AI latency).

---

## 2. Registration Flow (AI-Driven)
The registration process removes the friction of manual technical data entry, offloading the complexity to the AI.

### 2.1. User Input
* **Minimalist Interface:** A form with only two fields:
    * `Plant Nickname` (e.g., "Living Room Fern").
    * `Photo` (Upload via camera or file).
* **Initial State:** The record is saved to the database immediately with a `PROCESSING` status. The user sees a "skeleton" of the plant while loading.

### 2.2. Background Processing (AI Pipeline)
Upon receiving the image, the backend triggers two parallel jobs in the queue:

#### Job A: Botanical Identification (Vision-to-Text)
* **Model:** Llava (via Ollama).
* **Input:** User-uploaded image.
* **Prompt:** *"Analyze this image. Return a strict JSON containing: 'scientific_name', 'common_name', 'light_requirement' (low/medium/high), 'water_frequency_days' (int), 'description' (en)."*
* **Output:** Updates the `ai_data` and `scientific_name` columns in the database.

#### Job B: Icon Generation (Image-to-Image)
* **Objective:** Create a cohesive visual representation (cartoon style) for the UI.
* **Technique:** Use of a local diffusion model (Stable Diffusion) or image processing filter (OpenCV/CSS filters) if hardware is limited.
* **Process:** The original photo is processed to remove the background and apply a "cartoon/flat design" filter.
* **Storage:** The new image is saved in `/uploads/icons/` and linked to the record.

---

## 3. Smart Schedule Module
Transforms static AI data into temporal actions.

### 3.1. Rules Engine
The system calculates the *next event* based on three variables:
1.  **Base Frequency:** Extracted from the AI JSON (e.g., Water every 3 days).
2.  **Last Log:** Date of the last interaction recorded by the user.
3.  **Seasonal Adjustment (Future Optional):** If it is winter, apply a 1.5x multiplier to the interval.

### 3.2. Visual Calendar
* **Monthly View:** Displays icons (Drop, Scissors, Fertilizer) on predicted days.
* **Urgency Status:**
    * *Green:* Up to date.
    * *Yellow:* Scheduled for today.
    * *Red:* Overdue (Current date > Scheduled date).

### 3.3. Notification System
* Webhook or local Push Notification when the status changes to "Today".

---

## 4. Maintenance Features (Journal)
Interface for the user to confirm task execution.

* **Quick Action:** "Watered Today" button on the plant card.
    * *Backend:* Inserts a row in the `care_logs` table with `type: WATER`.
    * *Recalculation:* The system runs the rules engine again and updates the "Next Watering" date.
* **AI Feedback:** If the user reports "Plant Died" or "Yellow Leaves", the system marks the record to refine future recommendations.

---

## 5. Data Structure (SQL Refinement)

Schema adjusted to support AI processing status.

```sql
CREATE TABLE plants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nickname VARCHAR(100) NOT NULL,
    
    -- Data filled by AI (Initially Nullable)
    scientific_name VARCHAR(150),
    icon_path TEXT, -- Path to the generated image (cartoon)
    original_image_path TEXT, -- Path to the real photo
    
    -- State Control
    ai_processing_status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, COMPLETED, FAILED
    
    -- The Plant's Brain (Technical Data)
    -- Ex: { "water_interval": 4, "sun": "high", "last_prune": "2023-01-01" }
    ai_data JSONB, 
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plant_id UUID REFERENCES plants(id),
    task_type VARCHAR(50), -- WATER, FERTILIZE
    scheduled_date DATE,
    is_completed BOOLEAN DEFAULT FALSE
);