import nodemailer from "nodemailer";
import config from "./config";

export const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false,
  auth: {
    user: config.SMTP_EMAIL,
    pass: config.SMTP_PASSWORD,
  },
});
