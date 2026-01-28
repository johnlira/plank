import { Request, Response } from "express";
import { SignUpInput, SignInInput } from "./auth.types";
import { signUp, signIn } from "./services";
import { authRepository } from "./auth.repository";
import { env } from "../../../config/env";
import { UnauthorizedError, NotFoundError } from "../../../err/server-errors";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const authController = {
  async signUp(req: Request, res: Response) {
    const data = req.body as SignUpInput;
    const user = await signUp(data);
    return res.status(201).json(user);
  },

  async signIn(req: Request, res: Response) {
    const data = req.body as SignInInput;
    const { user, token } = await signIn(data);

    res.cookie("token", token, COOKIE_OPTIONS);
    return res.json(user);
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie("token", COOKIE_OPTIONS);
    return res.status(200).json({ message: "Logged out successfully" });
  },

  async getMe(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError();

    const user = await authRepository.findById(userId);
    if (!user) throw new NotFoundError("User");

    return res.json(user);
  },
};
