import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ValidationError } from "../../err/server-errors";

export const validateBody = <T>(schema: z.ZodType<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "root",
        message: issue.message,
      }));

      throw new ValidationError(errors);
    }

    req.body = result.data;
    next();
  };
};
