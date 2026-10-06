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
  passport.authenticate("jwt", { session: false }),
  newsLetterController.createNewsLetter,
);

newsLetterRouter.get(
  "/get/:letterId",
  passport.authenticate("jwt", { session: false }),
  newsLetterController.getNewsLetter,
);

newsLetterRouter.patch(
  "/patch/:letterId",
  passport.authenticate("jwt", { session: false }),
  newsLetterController.updateNewsLetter,
);

newsLetterRouter.get(
  "/getall",
  passport.authenticate("jwt", { session: false }),
  newsLetterController.getAllNewsletters,
);
export default newsLetterRouter;
