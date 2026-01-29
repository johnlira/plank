export default class ServerError extends Error {
  readonly statusCode: number;
  readonly code: string | null;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = "INTERNAL_SERVER_ERROR",
  ) {
    super(message);
    this.message = message;
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class ValidationError extends ServerError {
  readonly details?: Array<{ field: string; message: string }>;

  constructor(message: string | Array<{ field: string; message: string }>) {
    const errorMessage = Array.isArray(message) ? "Validation failed" : message;
    super(errorMessage, 400, "VALIDATION_ERROR");

    if (Array.isArray(message)) {
      this.details = message;
    }
  }
}
export class NotFoundError extends ServerError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404, "NOT_FOUND");
  }
}
export class UnauthorizedError extends ServerError {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}
export class ConflictError extends ServerError {
  constructor(resource: string = "Resource") {
    super(`${resource} already exists`, 409, "CONFLICT");
  }
}
export class ForbiddenError extends ServerError {
  constructor(message: string = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

export class BadRequestError extends ServerError {
  constructor(message: string = "Bad Request") {
    super(message, 400, "BAD_REQUEST");
  }
}
