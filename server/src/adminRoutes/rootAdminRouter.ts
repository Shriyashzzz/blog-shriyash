import { Router } from "express";
import checkIfUserAdmin from "../middlewares/checkAdmin";
import passport from "passport";
import getAdminPostsController from "../adminControllers/getAdminPostController";
import {
  createPostController,
  getAdminPost,
} from "../adminControllers/postAdminController";

const adminRoutes = Router();

adminRoutes.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkIfUserAdmin,
  getAdminPostsController,
);

adminRoutes.get(
  "/post/:postId",
  passport.authenticate("jwt", { session: false }),
  checkIfUserAdmin,
  getAdminPost,
);

adminRoutes.post(
  "/post/:postId",
  passport.authenticate("jwt", { session: false }),
  checkIfUserAdmin,
  createPostController,
);
adminRoutes.post("/post", passport.authenticate("jwt", { session: false }));

export default adminRoutes;
