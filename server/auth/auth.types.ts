import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignInSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserWithPassword extends User {
  password_hash: string;
}
