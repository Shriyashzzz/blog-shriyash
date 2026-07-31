import { type NextFunction, type Request, type Response } from "express";
import queries from "../models/queries";
import _ from "lodash";
import { AppError } from "../ultility/error";

const getPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const intPostId = _.toInteger(postId);
  const response = await queries.getPost(intPostId);
  if (!response.found)
    return res.status(404).json({ message: "Post Not Found!" });
  if (!response.published) {
    return res
      .status(418)
      .json({ message: "You snoopy ahh, this post is still under works ;)" });
  }
  return res.status(200).json({ message: "Post Found", post: response.post });
};

const loveUnlovePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user)
    return next(
      new AppError("User not authenticated to use this feature", 401),
    );
  const { postId } = req.params;
  if (!postId || typeof postId !== "string")
    return next(
      new AppError(
        "Suitable post Id / postId param has not been sent with the request.",
        404,
      ),
    );

  const intPostId = _.parseInt(postId);
  if (isNaN(intPostId))
    return next(new AppError("postId param is of incorrect datatype", 400));
  const response = await queries.lovePost(intPostId, req.user.id);
  if (!response.ok) {
    next(new AppError("Unable to increment likes at this point!", 500));
  } else {
    if (response.loved)
      return res
        .status(200)
        .json({ loved: response.loved, message: "Post has been Loved" });

    return res
      .status(200)
      .json({ loved: response.loved, message: "Post has been unloved" });
  }
};

export { getPost, loveUnlovePost };
