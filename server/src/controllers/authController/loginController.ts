import type { NextFunction, Response, Request } from "express";
import queries from "../../models/queries";
import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config";

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
    { expiresIn: "14d" },
    (err: Error | null, token: string | undefined) => {
      if (err) return next(err);
      // if no error send the signed token
      return res.status(200).json({ token });
    },
  );
};

export default loginController;
