import { Router } from "express";
import {
  deleteComment,
  newCommentController,
} from "../controllers/commentController";
import passport from "passport";

const commentRouter = Router({ mergeParams: true });

commentRouter.post(
  "/newComment/:postId",
  passport.authenticate("jwt", { session: false }),
  newCommentController,
);

commentRouter.delete(
  "/:commentId",
  passport.authenticate("jwt", { session: false }),
  deleteComment,
);

export default commentRouter;
