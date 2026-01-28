import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authRepository } from "../auth.repository";
import { SignInInput, User } from "../auth.types";
import { env } from "../../../config/env";
import { UnauthorizedError } from "../../../err/server-errors";

interface SignInResult {
  user: User;
  token: string;
}

export async function signIn(data: SignInInput): Promise<SignInResult> {
  const user = await authRepository.findByEmail(data.email);
  if (!user) throw new UnauthorizedError("Invalid credentials");

  const isPasswordValid = await bcrypt.compare(data.password, user.password_hash);
  if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials");

  const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const { password_hash, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token,
  };
}
