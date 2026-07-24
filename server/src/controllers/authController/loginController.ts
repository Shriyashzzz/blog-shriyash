import type { NextFunction, Response, Request } from "express";
import queries from "../../models/queries";
import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //validate these incoming poropertirs later
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user)
    return res.status(400).json({ message: "This account does not exist" });
  const isValidPass = bcrypt.compare(password, user.)
};

export default loginController;
