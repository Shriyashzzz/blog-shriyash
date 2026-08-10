import type { Response, Request, NextFunction } from "express";
import adminQueries from "../../models/adminQueries";
import _ from "lodash";
import { AppError } from "../../ultility/error";

const deleteCommentAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // make sure to validate that the incoming query exists from an validator
  const { commentId } = req.params;
  if (typeof commentId !== "string")
    return next(new AppError("commentId Query is not an string", 400));
  const intCommentId = _.parseInt(commentId);
  const response = await adminQueries.deleteComment(intCommentId);
  if (!response.ok)
    return next(new AppError("unable to delete your comment", 500));
  return res.status(200).json({ message: "Success" });
};

export { deleteCommentAdmin };
