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
  "/create",

  newsLetterController.createNewsLetter,
);

newsLetterRouter.get(
  "get/:letterId",
  passport.authenticate("jwt", { session: false }),
  newsLetterController.getNewsLetter,
);

newsLetterRouter.patch(
  "patch/:letterId",
  passport.authenticate("jwt", { session: false }),
  newsLetterController.updateNewsLetter,
);

export default newsLetterRouter;
