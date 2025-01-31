import { Request, Response, NextFunction } from "express";

export const validateRequest = (
  schema: any
) => (req: Request, res: Response, next: NextFunction) => {
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      error: validation.error.details.map((detail: any) => detail.message),
    });
  }
  next();
};