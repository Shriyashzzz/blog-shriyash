import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { Role } from "../generated/prisma/enums.js";

interface CookieOption {
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
}

const setTokenCookie = (
  res: Response,
  cookieName: string,
  cookieOptions: CookieOption,
  tokenPayload: object,
  tokenOptions: object,
) => {
  return new Promise((resolve) => {
    jwt.sign(
      tokenPayload,
      config.JWT_SECRET,
      tokenOptions,
      (err: Error | null, token: string | undefined) => {
        if (err) return resolve(false);
        // if no error send the signed token
        res.cookie(cookieName, token, cookieOptions);
        return resolve(true);
      },
    );
  });
};

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

interface AuthUser {
  username: string;
  id: number;
  role: Role;
}

const buildAuthCookieAndToken = (user: AuthUser) => {
  //builds cookie options for login and sign up controllers
  const isMember = user.role === Role.Member;
  const maxAge = isMember ? 604800000 : 172800000; // 7d vs 2d in ms
  const expiresIn = isMember ? "7d" : "2d";

  const cookieOptions = {
    httpOnly: true,
    secure: config.nodeEnv === "DEV" ? false : true,
    sameSite: "lax" as const,
    maxAge,
    path: "/",
  };

  const tokenPayload = {
    username: user.username,
    id: user.id,
    role: user.role,
  };

  const tokenOptions = { expiresIn };

  return { cookieOptions, tokenPayload, tokenOptions };
};

export { setTokenCookie, clearCookie, buildAuthCookieAndToken };
