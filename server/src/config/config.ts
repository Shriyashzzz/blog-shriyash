import dotenv from "dotenv";

dotenv.config();

interface Config {
  DATABASE_URL: string;
  port: number;
  nodeEnv: string;
  JWT_SECRET: string;
}

const config: Config = {
  port: Number(process.env.PORT),
  nodeEnv: process.env.ENV || "DEV",
  DATABASE_URL: process.env.DATABASE_URL || " ",
  JWT_SECRET: process.env.JWT_SECRET || "",
} satisfies Config;

export default config;
