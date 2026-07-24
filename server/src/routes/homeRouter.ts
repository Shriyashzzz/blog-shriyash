import { type Request, type Response } from "express";
import { Router } from "express";
import { sendPostController } from "../controllers/sendpostController";
const homeRouter = Router();

homeRouter.get("/", sendPostController);

export default homeRouter;
