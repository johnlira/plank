import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UnauthorizedError } from "../err/server-errors";

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) throw new UnauthorizedError("Authentication required");

  const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  if (!decoded?.userId) throw new UnauthorizedError("Invalid token");

  req.user = { id: decoded.userId };
  return next();
}
