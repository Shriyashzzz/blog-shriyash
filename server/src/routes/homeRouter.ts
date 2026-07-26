import { type Request, type Response } from "express";
import { Router } from "express";
import { sendPostsController } from "../controllers/sendpostController";

const homeRouter = Router();

homeRouter.get("/", sendPostsController);

export default homeRouter;
