import { Router } from "express";
import { getPost, loveUnlovePost } from "../controllers/postController";
import passport from "passport";

const postRouter = Router({ mergeParams: true });

postRouter.get("/:postId", getPost);
postRouter.post(
  "/:postId/love",
  passport.authenticate("jwt", { session: false }),
  loveUnlovePost,
);

export default postRouter;
