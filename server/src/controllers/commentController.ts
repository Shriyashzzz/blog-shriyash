import { type Request, type Response, type NextFunction } from "express";
import queries from "../models/queries";
import _ from "lodash";
import { validationResult, matchedData, body, param } from "express-validator";

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
    if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });
    const { commentContent, postId } = matchedData(req);
    const intPostId = _.toInteger(postId);
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
  },
];

const deleteComment = [
  async (req: Request, res: Response) => {
    const { commentId } = req.params;
  },
];

export { newCommentController, deleteComment };
