import type { Request, Response, NextFunction } from "express";
import { validationResult, matchedData, body } from "express-validator";
import { AppError } from "../ultility/error.js";
import queries from "../models/queries.js";

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
      const response = await queries.signUpNewsLetter(email);
      if (response.ok) {
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

export default { signUp };
