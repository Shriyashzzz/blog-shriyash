import { Router } from "express";
import { titileQueryController } from "../controllers/queryControllers/titleQueryController";

export const searchRouter = Router();

searchRouter.get("/blogtitle/:q", titileQueryController);
