import { Router } from "express";
import loginController from "../../controllers/authController/loginController";
import logOutController from "../../controllers/authController/logoutController";
import passport from "passport";

const authRouter = Router();
authRouter.post("/login", loginController);

authRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logOutController,
);

export default authRouter;
