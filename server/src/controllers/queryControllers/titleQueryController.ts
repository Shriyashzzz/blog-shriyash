import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../ultility/error.js";
import queries from "../../models/queries.js";

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
  if (response.ok)
    return res.status(200).json({
      message: "Successfully fetched resembeling posts",
      posts: response.posts,
    });

  return res.status(500).json({ message: "Unable to fetch posts" });
};
