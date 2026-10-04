import IOredis from "ioredis";
import config from "./config";

export const redisConnection = new IOredis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
});
