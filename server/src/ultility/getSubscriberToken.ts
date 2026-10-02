import config from "../config/config";
import jwt from "jsonwebtoken";

export function generateSubscriberToken(email: string): string | undefined {
  if (!email) return;
  const normalizedEmail = email.trim().toLowerCase();
  const token = jwt.sign({ email: normalizedEmail }, config.JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
  return token;
}

export function verifySubscribersToken(token: string): boolean {
  try {
    var decoded = jwt.verify(token, config.JWT_SECRET);
    return true;
  } catch (err) {
    return false;
  }
}
