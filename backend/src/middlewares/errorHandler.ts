import { Request, Response, NextFunction } from "express";
import winston from "winston";

// General error handler
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  winston.error(`Error: ${err.message}`);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
};
