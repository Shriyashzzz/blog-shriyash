import { type Request, type Response } from "express";
import config from "../../config/config.js";
import { clearCookie } from "../../ultility/cookie.js";

const logOutController = (req: Request, res: Response) => {
  const logInCookie = "auth_token";
  const cookieOptions = {
    httpOnly: true,
    secure: config.nodeEnv === "DEV" ? false : true,
    path: "/",
  };
  const isCookieCleared = clearCookie(res, logInCookie, cookieOptions);
  if (isCookieCleared) {
    return res.status(201).json({ message: "You have been logged out!" });
  } else {
    return res.status(500).json({ message: "Error Logging out" });
  }
};

export default logOutController;
