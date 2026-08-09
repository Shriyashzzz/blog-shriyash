import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../ultility/error";

export const titileQueryController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { q } = req.params;
  if (!(typeof q == "string"))
    return next(new AppError("Error: Invalid query search ", 400));
  const decodedSearchTitle = decodeURI(q);
  console.log(decodedSearchTitle);
};
