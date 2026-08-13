import { type Request, type Response, type NextFunction } from "express";
import queries from "../models/queries.js";
import _ from "lodash";
import { validationResult, matchedData, body, param } from "express-validator";
import { AppError } from "../ultility/error.js";

const newCommentValidator = [
  body("commentContent")
    .trim()
    .notEmpty()
    .withMessage("Comment Cannot be empty!"),
  param("postId").notEmpty().withMessage("PostId parameter not found"),
];
const newCommentController = [
  ...newCommentValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { commentContent, postId } = matchedData(req);
    const intPostId = _.toInteger(postId);
    if (!req.user)
      return res.status(401).json({ message: "Error: User not logged in!" });
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
  },
];

const deleteComment = [
  async (
    req: Request<{ commentId: string; postId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { commentId, postId } = req.params;
    if (!commentId || !postId) return next(new AppError("No comment Id ", 400));
    const intCommentId = _.parseInt(commentId);
    const intPostId = _.parseInt(postId);
    const preOwnerCheck = await queries.getComment(intCommentId);
    if (!preOwnerCheck.ok)
      return next(new AppError("Could not delete the message", 400));
    if (preOwnerCheck.comment?.authorId !== req.user?.id)
      return next(new AppError("Only an author can delete the message", 403));
    const response = await queries.deleteComment(intCommentId);
    if (!response.ok && response.error) return next(response.error);
    if (!response.ok)
      return res.status(404).json({ message: "comment not found" });
    return res.status(200).json({
      message: "comment successfully deleted",
      comments: (await queries.getPostComments(intPostId)).comments,
    });
  },
];

export { newCommentController, deleteComment };
