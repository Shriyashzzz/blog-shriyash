import { Router } from "express";
import newsLetterController from "../adminControllers/newsLetterController.js";
import passport from "passport";

const newsLetterRouter = Router({ mergeParams: true });

newsLetterRouter.post("/signup", newsLetterController.signUp);
newsLetterRouter.all(
  "/unsubscribe/newsLetter",
  newsLetterController.unsubscribe,
);

newsLetterRouter.post(
  "/newsLetter/create",
  passport.authenticate("jwt", { session: false }),
  newsLetterController.createNewsLetter,
);

newsLetterRouter.get(
  "/newsLetter/:letterId",
  passport.authenticate("jwt", { session: false }),
  newsLetterController.getNewsLetter,
);

newsLetterRouter.patch(
  "/newsLetter/:letterId",
  passport.authenticate("jwt", { session: false }),
  newsLetterController.updateNewsLetter,
);

export default newsLetterRouter;
