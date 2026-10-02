import dotenv from "dotenv";

dotenv.config();

interface Config {
  DATABASE_URL: string;
  port: number;
  nodeEnv: string;
  JWT_SECRET: string;
  SMTP_PORT: number;
  SMTP_HOST: string;
  SMTP_EMAIL: string;
  SMTP_PASSWORD: string;
  FROM_EMAIL: string;
}

if (!process.env.JWT_SECRET) {
  throw new Error(
    "CRITICAL CONFIG ERROR: process.env.JWT_SECRET is not defined.",
  );
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "CRITICAL CONFIG ERROR: process.env.DATABASE_URL is not defined.",
  );
}

if (
  !process.env.FROM_EMAIL ||
  !process.env.SMTP_HOST ||
  !process.env.SMTP_EMAIL ||
  !process.env.SMTP_PASSWORD ||
  !process.env.SMTP_PORT
) {
  throw new Error(
    "CRITICAL CONFIG ERROR: SMTP Variable not defined, Double check",
  );
}
const config: Config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.ENV || "DEV",
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SMTP_PORT: Number(process.env.SMTP_PORT),
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_EMAIL: process.env.SMTP_EMAIL,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  FROM_EMAIL: process.env.FROM_EMAIL,
} satisfies Config;

export default config;
