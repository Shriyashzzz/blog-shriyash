import type { NextFunction, Response, Request } from "express";
import { prisma } from "../../config/prisma";
import bcrypt from "bcryptjs";
import { setUserCookie } from "../../ultility/cookie";
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //Incomplete!: validate the incoming payload from the client
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
    setUserCookie(res, next, user);
  } catch (e) {
    console.error(e);
    return res.sendStatus(501);
  }
};

export default loginController;
