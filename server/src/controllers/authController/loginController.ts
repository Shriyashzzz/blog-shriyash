import type { NextFunction, Response, Request } from "express";
import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import { setTokenCookie } from "../../ultility/cookie";
import config from "../../config/config";
import { Role } from "../../../generated/prisma/enums";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //Incomplete!: validate the incoming payload from the clien // correct errors on empty form | correct error on non existing users
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Either Email or Password field is empty" });
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user)
    return res.status(400).json({ message: "This account does not exist" });
  const isValidPass = await bcrypt.compare(password, user.password);
  if (!isValidPass)
    return res.status(401).json({ message: "Incorrect Password" });
  try {
    const cookieOptions = {
      // branch this out to make this function completely independent
      httpOnly: true,
      secure: config.nodeEnv === "DEV" ? false : true,
      sameSite: "lax",
      maxAge: user.role === Role.Member ? 604800000 : 172800000, // 7days if an member, 2 days for admins both in miliseconds // remember to change token "expieresIn" too if you change this!
      path: "/",
    };
    const tokenPayload = {
      username: user.username,
      id: user.id,
      role: user.role,
    };
    const tokenOptions = {
      expiresIn: user.role === Role.Member ? "7d" : "2d", //remember to change cookies "maxAge" too if you change this!
    };
    const response = await setTokenCookie(
      res,
      "auth_token",
      cookieOptions,
      tokenPayload,
      tokenOptions,
    );
    if (response) return res.status(200).json({ message: "User logged in!" });
    return res.sendStatus(501);
  } catch (e) {
    console.error(e);
    return res.sendStatus(501);
  }
};

export default loginController;
