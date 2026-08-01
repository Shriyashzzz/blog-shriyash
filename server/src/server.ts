import express from "express";
import config from "./config/config";
import { type Response, type Request } from "express";
import homeRouter from "./routes/homeRouter";
import passport from "passport";
import { jwtStrategy } from "./jwtAuth";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouters";
import postRouter from "./routes/postRouter";
import commentRouter from "./routes/commentsRouters";
import { errorHandler } from "./ultility/error";
import cors from "cors";
import postAdminRouter from "./adminRoutes/postAdminRouter";
import commentAdminRouter from "./adminRoutes/commentAdminRouter";

const app = express();
app.use(passport.initialize());
passport.use(jwtStrategy);
const corsOpts = { origin: process.env.CLIENT_URL, credentials: true };
app.disable("x-powered-by");
app.use(cors(corsOpts));
app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/", homeRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.use("/api/admin", postAdminRouter);
app.use("api/admin/comment", commentAdminRouter);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Live: http://localhost:${config.port}`);
});
