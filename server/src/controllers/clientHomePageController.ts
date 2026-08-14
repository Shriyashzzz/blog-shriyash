import type { NextFunction, Request, Response } from "express";
import queries from "../models/queries.js";

const clientHomePageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("hello");
  const publishedPosts = await queries.getPublishedPosts();
  if (!publishedPosts) next(new Error("Failed to query database"));
  res.json({ posts: publishedPosts });
};

export { clientHomePageController };
