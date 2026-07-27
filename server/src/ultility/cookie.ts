import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

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

export { setTokenCookie, clearCookie };
