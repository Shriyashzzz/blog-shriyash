import { Router } from "express";
import {
  checkIfLoved,
  getPost,
  loveUnlovePost,
} from "../controllers/postController";
import passport from "passport";

const postRouter = Router({ mergeParams: true });

postRouter.get("/:postId", getPost);
postRouter.post(
  "/:postId/love",
  passport.authenticate("jwt", { session: false }),
  loveUnlovePost,
);

postRouter.get(
  "/checklove/:postId",
  passport.authenticate("jwt", { session: false }),
  checkIfLoved,
);

export default postRouter;
