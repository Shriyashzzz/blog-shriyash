import { Router } from "express";
import checkIfUserAdmin from "../middlewares/checkAdmin";
import passport from "passport";
import { getAdminPostsController } from "../adminControllers/postAdminController";

import {
  createPostController,
  getAdminPost,
} from "../adminControllers/postAdminController";

const postAdminRouter = Router();

postAdminRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkIfUserAdmin,
  getAdminPostsController,
);

postAdminRouter.get(
  "/post/:postId",
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

postAdminRouter.post("/post", passport.authenticate("jwt", { session: false }));

export default postAdminRouter;
