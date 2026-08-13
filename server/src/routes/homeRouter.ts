import { Router } from "express";
import { clientHomePageController } from "../controllers/clientHomePageController.js";

const homeRouter = Router();

homeRouter.get("/", clientHomePageController);

export default homeRouter;
