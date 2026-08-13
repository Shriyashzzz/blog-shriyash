// import { Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as JWTStrategy } from "passport-jwt";
import config from "./config/config.js";
import { type Request } from "express";
import type { Role } from "./generated/prisma/enums.js";
import type { DoneCallback } from "passport";
import type { Algorithm } from "jsonwebtoken";

interface JwtPayload {
  username: string;
  id: number;
  role: Role;
  iat: number;
  exp: number;
}

type ExtractTokenFunction = (req: Request) => string | null;

interface JwtOptions {
  secretOrKey: string;
  jwtFromRequest: ExtractTokenFunction; // write your own custom extractor to get the session out the cookie
  algorithms: Array<Algorithm>;
}

// options to check jwt tokens
const opts: JwtOptions = {
  secretOrKey: config.JWT_SECRET,
  jwtFromRequest: extractTokenFromCookie, // write your own custom extractor to get the session out the cookie
  algorithms: ["HS256"], // the algotithm to amke the token
};

//custom token extract function from the cookie
function extractTokenFromCookie(req: Request) {
  const authToken = req.cookies["auth_token"];
  if (!authToken) return null;
  return authToken;
}

// strategy to populate req.user
const jwtStrategy = new JWTStrategy(
  opts,
  async (jwt_payload: JwtPayload, done: DoneCallback) => {
    const { iat, exp, ...user } = jwt_payload;
    return done(null, user);
  },
);

export { jwtStrategy };
