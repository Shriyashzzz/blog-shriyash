import type { NextFunction, Request, Response } from "express";
import authQueries from "../../models/authQueries";
import bcrypt from "bcryptjs";
import { setTokenCookie } from "../../ultility/cookie";
import { buildAuthCookieAndToken } from "../../ultility/cookie";
import { validationResult, matchedData, body } from "express-validator";

const signUpValidator = [
  body("username").trim().notEmpty().withMessage("Username cannot be empty"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Please enter a vaid email address")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[#$@!%&*?]/)
    .withMessage("Password must contain at least one special character"),
  body("cpassword")
    .trim()
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      throw new Error("Passwords Do not Match");
    }),
];

const signUpController = [
  ...signUpValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    // ------------------------**validating incoming user payload **---------------------------
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "Invlaid Sign Up payload", errors: errors.array() });
    const { username, email, password, cpassword } = matchedData(req);
    // -------------------------------------**********--------------------------------------
    const hashedPassword = await bcrypt.hash(password, 12);
    const response = await authQueries.signUpNewUser(
      email,
      hashedPassword,
      username,
    );
    if (!response.success) {
      if (response.errorCode == "P2002")
        return res
          .status(400)
          .json({ message: "User Already Exists! Please Log In!" });

      return res.status(500).json({ message: "Server Error" });
    }

    if (response.user) {
      const { cookieOptions, tokenPayload, tokenOptions } =
        buildAuthCookieAndToken(response.user);
      const isCookieAdded = await setTokenCookie(
        res,
        "auth_token",
        cookieOptions,
        tokenPayload,
        tokenOptions,
      );
      if (isCookieAdded) {
        return res
          .status(200)
          .json({ message: "user id now logged in", redirectUrl: "/" });
      } else {
        return res.status(500).json({ message: "Could not set auth cookie" });
      }
    } else {
      return res.status(501).json({ message: "Error saving the user info " });
    }
  },
];
export default signUpController;
