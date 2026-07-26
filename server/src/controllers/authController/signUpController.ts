import type { NextFunction, Request, Response } from "express";
import authQueries from "../../models/authQueries";
import bcrypt from "bcryptjs";
import { setUserCookie } from "../../ultility/cookie";

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
    const isCookieAdded = await setUserCookie(res, response.user);
    if (isCookieAdded)
      return res
        .status(200)
        .json({ message: "user id now logged in", redirectUrl: "/" });
  } else {
    return res.status(501).json({ message: "Error saving the user info " });
  }
};
export default signUpController;
