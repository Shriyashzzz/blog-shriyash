import { type Request, type Response } from "express";
import config from "../../config/config";

const logOutController = async (req: Request, res: Response) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: config.nodeEnv === "DEV" ? false : true,
    path: "/",
  });
  return res.status(200).json({ message: "Logged Out Successfully" });
};

export default logOutController;
