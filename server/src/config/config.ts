import dotenv from "dotenv";

dotenv.config();

interface Config {
  DATABASE_URL: string;
  port: number;
  nodeEnv: string;
  JWT_SECRET: string;
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
const config: Config = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.ENV || "DEV",
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
} satisfies Config;

export default config;
