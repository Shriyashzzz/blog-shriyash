import type { Request, Response, NextFunction } from "express";
import {
  validationResult,
  matchedData,
  body,
  param,
  query,
} from "express-validator";
import { AppError } from "../ultility/error.js";
import queries from "../models/queries.js";
import {
  generateSubscriberToken,
  verifySubscribersToken,
} from "../ultility/getSubscriberToken.js";
import { prisma } from "../config/prisma.js";
import { sendWelcomeEmail } from "../scripts/welcomeNewsletter.js";
import adminQueries from "../models/adminQueries.js";
import type { QueryResponse } from "../models/adminQueries.js";
import type { TypeNewsLetter } from "../models/adminQueries.js";
import type { NewsLetter } from "../generated/prisma/client.js";
import { jobQueue } from "../jobs/newletter.job.js";
import "../workers/newsletter.worker.js";

const validationEmail = [
  body("email").isEmail().withMessage("400: Invalid Email"),
];

const validationToken = [
  query("token")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Invalid Token query"),
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
        const welcomeMsgSent = await sendWelcomeEmail(email, token);
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
const unsubscribe = [
  ...validationToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400);
    }
    const { token } = matchedData(req);
    if (req.method !== "GET" && req.method !== "POST")
      return res.sendStatus(405); //invalid request method
    if (!verifySubscribersToken(token)) {
      return res.status(401); // invalid token
    }
    await prisma.newsSubscribers.deleteMany({
      where: { userToken: token },
    });
    if (req.method === "POST") return res.sendStatus(200);
    res.send("<h1>You've been unsubscribed.</h1>");
  },
];

const validation_body_newsLetter = [
  body("subject")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Email subject cannot be empty!"),
  body("html").trim().notEmpty().withMessage("Content cannot be empty!"),
  body("isDraft").isBoolean().withMessage("draft status cannot be empty"),
];

const createNewsLetter = [
  ...validation_body_newsLetter,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid request payload!" });
    }

    const { subject, html, isDraft } = matchedData(req);
    const response: QueryResponse<TypeNewsLetter> =
      await adminQueries.createNewsLetter(subject, html, isDraft);

    if (response.ok && response.data) {
      if (!isDraft) {
        //get subscribers
        const subResponse = await adminQueries.getSubscribers();
        if (!subResponse.ok)
          next(new AppError("Error fetching subscribers", 500, false));
        const subscribers = subResponse.data;
        //add jobs to the queue to send the newsletter
        subscribers?.map((sub) => {
          jobQueue.add(
            "send-newsletter",
            {
              email: sub.email,
              token: sub.userToken,
              subject: subject,
              html: html,
            },
            {
              attempts: 3,
              priority: 1,
              removeOnComplete: true,
              removeOnFail: {
                age: 24 * 3600, // keep up to 24 hours
              },
            },
          );
        });
      }
      return res.status(200).json({
        message: "Succesfully created a new newsletter!",
        letter: response.data.new_NewsLetter,
      });
    }
    next(new AppError("Unable to create a new nesletter", 500, true));
  },
];

const validation_Letter_Id_Query = [
  param("letterId")
    .trim()
    .notEmpty()
    .isNumeric()
    .withMessage("No letter Id param passed with the request."),
];

const getNewsLetter = [
  ...validation_Letter_Id_Query,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      next(new AppError("Invalid newletter id param", 500, false));

    const { letterId } = matchedData(req);
    const numId: number = parseInt(letterId);
    const response = await adminQueries.getNewsLetter(numId);
    if (response.ok && response.data) {
      return res.status(200).json({
        message: "Successful fetching the newsletter",
        letter: response.data.letter,
      });
    }
    return next(new AppError("Error fetching the NewsLetter", 500, false));
  },
];

const validation_patch_newsletter = [
  body("subject")
    .optional()
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Email subject cannot be empty!"),
  body("html")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty!"),
  body("isDraft").isBoolean().withMessage("draft status cannot be empty"),
];

const updateNewsLetter = [
  ...validation_Letter_Id_Query,
  ...validation_patch_newsletter,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = matchedData(req);
    if (!errors.isEmpty())
      return next(new AppError("Invalid reqest payload", 500, false));
    //Send emails if isDraft is turned to true
    const { html, isDraft, subject, letterId } = matchedData(req);
    const response = await adminQueries.getNewsLetter(letterId);
    if (!response.ok || !response.data) return next(new Error("Server Error"));
    const currentNewsLetter: NewsLetter = response.data.letter;
    if (currentNewsLetter.draft == true)
      return res
        .status(405)
        .json({ message: "Sent Email's cannot be taken back" });

    const currentQueryResponse: QueryResponse<{
      letter: NewsLetter;
    }> = await adminQueries.updateNewsLetter(letterId, html, subject, isDraft);

    if (currentQueryResponse.ok) {
      if (!currentNewsLetter.draft && currentQueryResponse.data?.letter.draft) {
        // send the newsletter since the letter status has changed from draft => send
        //get subscribers
        const subResponse = await adminQueries.getSubscribers();
        if (!subResponse.ok)
          next(new AppError("Error fetching subscribers", 500, false));
        const subscribers = subResponse.data;
        //add jobs to the queue
        subscribers?.map((sub) => {
          jobQueue.add(
            "send-newsletter",
            {
              email: sub.email,
              token: sub.userToken,
              subject: subject,
              html: html,
            },
            {
              attempts: 3,
              priority: 1,
              removeOnComplete: true,
              removeOnFail: {
                age: 24 * 3600, // keep up to 24 hours
              },
            },
          );
        });
      }
      return res.status(200).json({
        message: "Succedfully updated the newsletter",
        updatedLetter: currentQueryResponse.data?.letter,
        letterId: letterId,
      });
    } else {
      return res
        .status(502)
        .json({ message: "unable to update the newsleter db" });
    }
  },
];

const getAllNewsletters = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const response = await adminQueries.getAllNewsLetter();
  if (!response.ok)
    return next(
      new AppError(
        "Server Error fetching newsletter from the database",
        500,
        true,
      ),
    );
  return res
    .status(200)
    .json({ message: "Successful fetching newsletters", data: response.data });
};

export default {
  signUp,
  unsubscribe,
  createNewsLetter,
  getNewsLetter,
  updateNewsLetter,
  getAllNewsletters,
};
