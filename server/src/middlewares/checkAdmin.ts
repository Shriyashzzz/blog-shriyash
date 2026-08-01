import passport from "passport";
import { type Response, type Request, type NextFunction } from "express";
import { AppError } from "../ultility/error";

const checkIfUserAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role == "Admin") {
    next();
  } else {
    next(new AppError("Only Admins are allowed on this app broski! ;)", 403));
  }
};

export default checkIfUserAdmin;
