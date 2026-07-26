import express from "express";
import config from "./config/config";
import { type Response, type Request } from "express";
import homeRouter from "./routes/homeRouter";
import passport from "passport";
import { jwtStrategy } from "./jwtAuth";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouters";
import postRouter from "./routes/postRouter";

const app = express();
app.use(passport.initialize());
passport.use(jwtStrategy);

app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", homeRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.listen(config.port, () => {
  console.log(`Live: http://localhost:${config.port}`);
});
