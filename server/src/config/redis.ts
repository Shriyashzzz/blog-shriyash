import IOredis from "ioredis";
import config from "./config.js";

export const redisConnection = new IOredis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
});
