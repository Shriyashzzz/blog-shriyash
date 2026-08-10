import { Router } from "express";
import loginController from "../controllers/authController/loginController";
import logOutController from "../controllers/authController/logoutController";
import passport from "passport";
import signUpController from "../controllers/authController/signUpController";
import isAuthenticated from "../controllers/authController/isAuthenticated";
import { isAdminAuth } from "../controllers/authController/isAdminAuth";

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
authRouter.get(
  "/me/admin",
  passport.authenticate("jwt", { session: false }),
  isAdminAuth,
);

export default authRouter;
