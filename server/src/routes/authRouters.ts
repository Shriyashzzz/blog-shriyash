import { Router } from "express";
import loginController from "../controllers/authController/loginController";
import logOutController from "../controllers/authController/logoutController";
import passport from "passport";
import signUpController from "../controllers/authController/signUpController";

const authRouter = Router();
authRouter.post("/login", loginController);

authRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logOutController,
);

authRouter.post("/signup", signUpController);

export default authRouter;
