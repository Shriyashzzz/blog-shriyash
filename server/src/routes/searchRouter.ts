import { Router } from "express";
import { titileQueryController } from "../controllers/queryControllers/titleQueryController.js";

export const searchRouter = Router();

searchRouter.get("/blogtitle/:q", titileQueryController);
