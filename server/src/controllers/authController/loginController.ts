import type { NextFunction, Response, Request } from "express";
import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import { Role } from "../../../generated/prisma/enums";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //Incomplete!: validate the incoming payload from the client later
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
  jwt.sign(
    { username: user.username, id: user.id, role: user.role },
    config.JWT_SECRET,
    { expiresIn: user.role === Role.Member ? "7d" : "2d" }, //remember to change cookies maxAge too if you change this!
    (err: Error | null, token: string | undefined) => {
      if (err) return next(err);
      // if no error send the signed token
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: config.nodeEnv === "DEV" ? false : true,
        sameSite: "lax",
        maxAge: user.role === Role.Member ? 604800000 : 172800000, // 7days if an member, 2 days for admins in miliseconds // remember to change token expieresIn too if you change this!
        path: "/",
      });
      res.sendStatus(200);
    },
  );
};

export default loginController;
