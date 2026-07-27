import type { NextFunction, Request, Response } from "express";
import authQueries from "../../models/authQueries";
import bcrypt from "bcryptjs";
import { setTokenCookie } from "../../ultility/cookie";
import config from "../../config/config";
import { Role } from "../../../generated/prisma/enums";

const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Incomplete: Make sure to validate the incoming payload including cheking if user already exists in a db!
  const { username, email, password, cpassword } = req.body;
  //hash password, call authqueries method to create new user, if unsuccessfull handle the error gracefully, will have an error message with the response
  const hashedPassword = await bcrypt.hash(password, 12);
  const response = await authQueries.signUpNewUser(
    email,
    hashedPassword,
    username,
  );
  if (!response.success)
    return res.status(500).json({ message: "Server Error" });
  if (response.user) {
    // ------**cookie options**----------
    const cookieOptions = {
      httpOnly: true,
      secure: config.nodeEnv === "DEV" ? false : true,
      sameSite: "lax",
      maxAge: response.user.role === Role.Member ? 604800000 : 172800000, // 7days if an member, 2 days for admins both in miliseconds // remember to change token "expieresIn" too if you change this!
      path: "/",
    };
    const tokenPayload = {
      username: response.user.username,
      id: response.user.id,
      role: response.user.role,
    };
    const tokenOptions = {
      expiresIn: response.user.role === Role.Member ? "7d" : "2d", //remember to change cookies "maxAge" too if you change this!
    };
    // ------------**cookie options**-----------
    const isCookieAdded = await setTokenCookie(
      res,
      "auth_token",
      cookieOptions,
      tokenPayload,
      tokenOptions,
    );
    if (isCookieAdded)
      return res
        .status(200)
        .json({ message: "user id now logged in", redirectUrl: "/" });
  } else {
    return res.status(501).json({ message: "Error saving the user info " });
  }
};
export default signUpController;
