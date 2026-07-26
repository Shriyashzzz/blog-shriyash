import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { Role } from "../../generated/prisma/enums";
import type { User } from "../../generated/prisma/client";

const setUserCookie = (res: Response, user: User) => {
  return new Promise((resolve) => {
    jwt.sign(
      { username: user.username, id: user.id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: user.role === Role.Member ? "7d" : "2d" }, //remember to change cookies maxAge too if you change this!
      (err: Error | null, token: string | undefined) => {
        if (err) return resolve(false);
        // if no error send the signed token
        res.cookie("auth_token", token, {
          // branch this out to make this function completely independent
          httpOnly: true,
          secure: config.nodeEnv === "DEV" ? false : true,
          sameSite: "lax",
          maxAge: user.role === Role.Member ? 604800000 : 172800000, // 7days if an member, 2 days for admins both in miliseconds // remember to change token expieresIn too if you change this!
          path: "/",
        });
        return resolve(true);
      },
    );
  });
};

interface CookieOption {
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
}

const clearCookie = (
  res: Response,
  cookieName: string,
  cookieOptions: CookieOption,
) => {
  try {
    res.clearCookie(cookieName, {
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      path: cookieOptions.path,
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export { setUserCookie, clearCookie };
