import type { Request, Response, NextFunction } from "express";
import { validationResult, matchedData, body } from "express-validator";
import { AppError } from "../ultility/error.js";
import queries from "../models/queries.js";
import {
  generateSubscriberToken,
  verifySubscribersToken,
} from "../ultility/getSubscriberToken.js";
import { prisma } from "../config/prisma.js";
import { sendWelcomeNewsLetterMessage } from "../scripts/welcomeNewsletter.js";

const validationEmail = [
  body("email").isEmail().withMessage("400: Invalid Email"),
];

const signUp = [
  ...validationEmail,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError("Inavlid Email", 400));
    }
    const { email } = matchedData(req);
    try {
      const token = generateSubscriberToken(email);
      if (!token) return next(new AppError("Server Error", 500, true));
      const response = await queries.signUpNewsLetter(email, token);
      if (response.ok) {
        const welcomeMsgSent = await sendWelcomeNewsLetterMessage(token, [
          email,
        ]);
        if (!welcomeMsgSent) console.error("unable to send welcome message");
        return res.status(200).json({
          message: "successfully subscribed to the newsletter",
        });
      } else if (response.data && !response.ok && response.data.duplicate) {
        return next(new AppError("User already Subscribed", 409));
      }
      return next(new AppError("Error Subscribing", 500));
    } catch (e) {
      return next(new AppError("Error Subscribing", 500));
    }
  },
];

// validate token using express-validator later
const unsubscribe = async (
  req: Request<{}, {}, {}, { token: string | undefined }>,
  res: Response,
  next: NextFunction,
) => {
  if (req.method !== "GET" && req.method !== "POST") return res.sendStatus(405); //invalid request method;
  const { token } = req.query;
  if (!token) return res.status(400);
  //verify if token is valid
  if (!verifySubscribersToken(token)) {
    return res.status(401); // invalid token
  }
  await prisma.newsSubscribers.deleteMany({
    where: { unsubscribeToken: token },
  });
  if (req.method === "POST") return res.sendStatus(200);
  res.send("<h1>You've been unsubscribed.</h1>");
};
export default { signUp, unsubscribe };
