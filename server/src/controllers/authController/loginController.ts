import type { NextFunction, Response, Request } from "express";
import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import { setTokenCookie } from "../../ultility/cookie";
import { buildAuthCookieAndToken } from "../../ultility/cookie";
import { validationResult, matchedData, body } from "express-validator";

const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Please enter a vaid email address")
    .normalizeEmail(),
  body("password").trim().notEmpty().withMessage("Password field is Empty"),
];

const loginController = [
  ...loginValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    // ---------------------**incoming payload vlaidatoin**-----------------
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ message: "Invalid Login Info", errors: errors.array() });
    // ----------------------------------------------------------------------

    const { email, password } = matchedData(req);
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Either Email or Password field is empty" });
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass)
      return res.status(401).json({ message: "Invalid email or password" });
    try {
      const { cookieOptions, tokenPayload, tokenOptions } =
        buildAuthCookieAndToken(user);
      const response = await setTokenCookie(
        res,
        "auth_token",
        cookieOptions,
        tokenPayload,
        tokenOptions,
      );
      const resUserObj = {
        id: user.id,
        username: user.username,
        role: user.role,
      };
      if (response)
        return res
          .status(200)
          .json({
            message: "User logged in!",
            user: resUserObj,
            isAdmin: user.role === "Admin",
          });
      return res.sendStatus(501);
    } catch (e) {
      console.error(e);
      return res.sendStatus(501);
    }
  },
];

export default loginController;
