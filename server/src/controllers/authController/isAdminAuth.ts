import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../ultility/error";

const isAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) next(new AppError("User is not authenticated", 401));
  if (req.user && req.user.role === "Admin")
    return res.status(200).json({ message: "Admin logged in " });
};

export { isAdminAuth };
