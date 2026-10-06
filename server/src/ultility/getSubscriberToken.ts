import config from "../config/config.js";
import jwt from "jsonwebtoken";

export function generateSubscriberToken(email: string): string | undefined {
  if (!email) return;
  const normalizedEmail = email.trim().toLowerCase();
  const token = jwt.sign({ email: normalizedEmail }, config.JWT_SECRET, {
    algorithm: "HS256",
  });
  return token;
}

export function verifySubscribersToken(token: string): boolean {
  try {
    jwt.verify(token, config.JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}
