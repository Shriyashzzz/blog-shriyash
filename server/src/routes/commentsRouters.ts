import { Router } from "express";
import { newCommentController } from "../controllers/commentController";
import passport from "passport";

const commentRouter = Router({ mergeParams: true });

commentRouter.post(
  "/newComment/:postId",
  passport.authenticate("jwt", { session: false }),
  newCommentController,
);

export default commentRouter;
