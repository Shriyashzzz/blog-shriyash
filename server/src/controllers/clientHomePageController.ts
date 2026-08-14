import type { NextFunction, Request, Response } from "express";
import queries from "../models/queries.js";
import { AppError } from "../ultility/error.js";

const clientHomePageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("hello");
  const publishedPosts = await queries.getPublishedPosts();
  if (!publishedPosts) next(new AppError("Failed to query database", 500));
  res.json({ posts: publishedPosts });
};

export { clientHomePageController };
