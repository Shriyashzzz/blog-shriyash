import express from "express";
import config from "./config/config";
import { type Response, type Request } from "express";
import homeRouter from "./routes/homeRouter";
import loginRouter from "./routes/authRoutes/loginRouter";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", homeRouter);
app.use("/api/login", loginRouter);
app.listen(config.port, () => {
  console.log(`Live: http://localhost:${config.port}`);
});
