import { Router } from "express";
import checkIfUserAdmin from "../middlewares/checkAdmin.js";
import passport from "passport";
import {
  deletePost,
  getAdminPostsController,
  updatePost,
} from "../adminControllers/postAdminController.js";

import {
  createPostController,
  getAdminPost,
} from "../adminControllers/postAdminController.js";

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

postAdminRouter.delete(
  "/delete/:postId",
  passport.authenticate("jwt", { session: false }),
  checkIfUserAdmin,
  deletePost,
);

postAdminRouter.patch(
  "/update/:postId",
  passport.authenticate("jwt", { session: false }),
  checkIfUserAdmin,
  updatePost,
);

export default postAdminRouter;
