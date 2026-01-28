import { pool } from "../lib/database";
import { User, UserWithPassword } from "./auth.types";

interface CreateUserData {
  name: string;
  email: string;
  password_hash: string;
}

export const authRepository = {
  async create(data: CreateUserData): Promise<User> {
    const result = await pool.query<User>(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at, updated_at`,
      [data.name, data.email, data.password_hash]
    );
    return result.rows[0];
  },

  async findByEmail(email: string): Promise<UserWithPassword | null> {
    const result = await pool.query<UserWithPassword>(
      `SELECT id, name, email, password_hash, created_at, updated_at
       FROM users WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  },

  async findById(id: string): Promise<User | null> {
    const result = await pool.query<User>(
      `SELECT id, name, email, created_at, updated_at
       FROM users WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },
};
