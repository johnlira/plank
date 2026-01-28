import bcrypt from "bcryptjs";
import { authRepository } from "../auth.repository";
import { SignUpInput, User } from "../auth.types";
import { ConflictError } from "../../../err/server-errors";

export async function signUp(data: SignUpInput): Promise<User> {
  const existingUser = await authRepository.findByEmail(data.email);
  if (existingUser) throw new ConflictError("Email");

  const password_hash = await bcrypt.hash(data.password, 10);

  const user = await authRepository.create({
    name: data.name,
    email: data.email,
    password_hash,
  });

  return user;
}
