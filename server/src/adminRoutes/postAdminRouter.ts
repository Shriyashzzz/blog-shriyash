import { Router } from "express";
import checkIfUserAdmin from "../middlewares/checkAdmin";
import passport from "passport";
import {
  getAdminPostsController,
  updatePost,
} from "../adminControllers/postAdminController";

import {
  createPostController,
  getAdminPost,
} from "../adminControllers/postAdminController";

const postAdminRouter = Router({ mergeParams: true });

postAdminRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkIfUserAdmin,
  getAdminPostsController,
);

postAdminRouter.get(
  "/getpost/:postId",
  passport.authenticate("jwt", { session: false }),
  checkIfUserAdmin,
  getAdminPost,
);

postAdminRouter.post(
  "/newpost",
  passport.authenticate("jwt", { session: false }),
  checkIfUserAdmin,
  createPostController,
);

postAdminRouter.patch(
  "/update/:postId",
  passport.authenticate("jwt", { session: false }),
  checkIfUserAdmin,
  updatePost,
);

export default postAdminRouter;
