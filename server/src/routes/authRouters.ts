import { Router } from "express";
import loginController from "../controllers/authController/loginController.js";
import logOutController from "../controllers/authController/logoutController.js";
import passport from "passport";
import signUpController from "../controllers/authController/signUpController.js";
import isAuthenticated from "../controllers/authController/isAuthenticated.js";
import { isAdminAuth } from "../controllers/authController/isAdminAuth.js";
import adminLoginController from "../adminControllers/adminLogInController.js";

const authRouter = Router();
authRouter.post("/login", loginController);
authRouter.delete(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logOutController,
);

authRouter.post("/signup", signUpController);

authRouter.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  isAuthenticated,
);

authRouter.post("/admin/login", adminLoginController);
authRouter.get(
  "/me/admin",
  passport.authenticate("jwt", { session: false }),
  isAdminAuth,
);

export default authRouter;
