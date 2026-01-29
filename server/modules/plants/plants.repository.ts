import { pool } from "../../lib/database";
import { Plant, PlantRow, CreatePlantDTO } from "./plants.types";

// Helper to convert snake_case row to camelCase
function toPlant(row: PlantRow): Plant {
  return {
    id: row.id,
    userId: row.user_id,
    nickname: row.nickname,
    originalImagePath: row.original_image_path,
    scientificName: row.scientific_name,
    iconPath: row.icon_path,
    description: row.description,
    aiProcessingStatus: row.ai_processing_status,
    aiData: row.ai_data,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const plantsRepository = {
  async create(userId: string, data: CreatePlantDTO): Promise<Plant> {
    const result = await pool.query<PlantRow>(
      `INSERT INTO plants (user_id, nickname, original_image_path, ai_processing_status)
       VALUES ($1, $2, $3, 'PENDING')
       RETURNING *`,
      [userId, data.nickname, data.originalImagePath],
    );
    return toPlant(result.rows[0]);
  },

  async findById(id: string): Promise<Plant | null> {
    const result = await pool.query<PlantRow>(
      `SELECT * FROM plants WHERE id = $1`,
      [id],
    );
    return result.rows[0] ? toPlant(result.rows[0]) : null;
  },

  async findByUserId(userId: string): Promise<Plant[]> {
    const result = await pool.query<PlantRow>(
      `SELECT * FROM plants WHERE user_id = $1 ORDER BY created_at DESC`,
      [userId],
    );
    return result.rows.map(toPlant);
  },

  async delete(id: string): Promise<boolean> {
    const result = await pool.query(`DELETE FROM plants WHERE id = $1`, [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
