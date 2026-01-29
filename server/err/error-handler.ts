import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import ServerError, { ValidationError } from "./server-errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).send({
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      errors,
    });
  }

  if (err instanceof ServerError) {
    const response: any = {
      code: err.code,
      message: err.message,
    };

    if (err instanceof ValidationError && err.details) {
      response.errors = err.details;
    }

    return res.status(err.statusCode).send(response);
  }

  res.status(500).send({
    code: "INTERNAL_SERVER_ERROR",
    message: "An internal server error occurred",
  });
};
