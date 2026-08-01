import type { NextFunction, Request, Response } from "express";
import adminQueries from "../models/adminQueries";
import { AppError } from "../ultility/error";

const getAdminPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const response = await adminQueries.getPostsForAdmin();
  if (!response.ok)
    return next(new AppError("Error fetching Posts form the database.", 500));

  return res.status(200).json({ posts: response.posts });
};

export default getAdminPostsController;
