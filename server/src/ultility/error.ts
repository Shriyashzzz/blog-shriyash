import type { Errback, NextFunction, Request, Response } from "express";

class AppError extends Error {
  isIntentional: boolean;
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.isIntentional = true;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(msg = "Not found") {
    super(msg, 404);
  }
}

function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const statusCode = err.statusCode || 500;
  console.error(err);

  res.status(statusCode).json({
    error: err.isIntentional ? err.message : "Something went wrong",
  });
}

export { AppError, errorHandler, NotFoundError };
