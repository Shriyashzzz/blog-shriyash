import { type Request, type Response, type NextFunction } from "express";
import queries from "../models/queries";
import _ from "lodash";

const newCommentController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { postId } = req.params;
  const intPostId = _.toInteger(postId);
  // validate the incoming payload later
  const { commentContent } = req.body;
  if (!req.user) return res.status(401).json("Error: User not logged in!");
  const response = await queries.addnewComment(
    intPostId,
    commentContent,
    req.user.id,
  );
  if (response.ok) {
    const allComments = (await queries.getPostComments(intPostId)).comments;
    res.status(200).json({
      message: "Comment Added",
      comments: allComments,
    });
  } else {
    res.status(500).json({
      message: "Server Error adding new Comment",
    });
  }
};

export { newCommentController };
