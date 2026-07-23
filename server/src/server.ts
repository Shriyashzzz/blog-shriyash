import express from "express";
import config from "./config/config";
import { type Response, type Request } from "express";
const app = express();

app.listen(config.port, () => {
  console.log(`Live: http://localhost:${config.port}`);
});
