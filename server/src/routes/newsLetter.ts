import { Router } from "express";
import newsLetterController from "../controllers/newsLetterController";

const newsLetterRouter = Router({ mergeParams: true });

newsLetterRouter.post("/signup", newsLetterController.signUp);

export default newsLetterRouter;
