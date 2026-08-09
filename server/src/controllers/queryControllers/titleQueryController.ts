import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../ultility/error";
import queries from "../../models/queries";

export const titileQueryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { q } = req.params;
  if (!(typeof q == "string"))
    return next(new AppError("Error: Invalid query search ", 400));
  const decodedSearchTitle = decodeURI(q);
  const response = await queries.getSearchTitle(decodedSearchTitle);
  console.log(response.posts);
};
