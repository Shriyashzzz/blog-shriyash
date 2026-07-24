import { Router } from "express";
import loginController from "../../controllers/authController/loginController";

const loginRouter = Router();
loginRouter.post("/", loginController);

export default loginRouter;
