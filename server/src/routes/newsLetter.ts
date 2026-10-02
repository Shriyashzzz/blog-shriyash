import { Router } from "express";
import newsLetterController from "../controllers/newsLetterController.js";

const newsLetterRouter = Router({ mergeParams: true });

newsLetterRouter.post("/signup", newsLetterController.signUp);
newsLetterRouter.all(
  "/unsubscribe/newsLetter",
  newsLetterController.unsubscribe,
);
export default newsLetterRouter;
