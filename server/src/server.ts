import express from "express";
import config from "./config/config.js";
import homeRouter from "./routes/homeRouter.js";
import passport from "passport";
import { jwtStrategy } from "./jwtAuth.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouters.js";
import postRouter from "./routes/postRouter.js";
import commentRouter from "./routes/commentsRouters.js";
import { errorHandler } from "./ultility/error.js";
import cors from "cors";
import postAdminRouter from "./adminRoutes/postAdminRouter.js";
import commentAdminRouter from "./adminRoutes/commentAdminRouter.js";
import { searchRouter } from "./routes/searchRouter.js";

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(passport.initialize());
passport.use(jwtStrategy);

if (config.nodeEnv !== "DEV") {
  const allowedOrigins = [
    process.env.CLIENT_USER_URL,
    process.env.CLIENT_ADMIN_URL,
  ].filter((url): url is string => Boolean(url) && url !== "");
  console.log(allowedOrigins);
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        } else {
          console.warn(`[CORS Blocked]: ${origin}`);
          return callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      optionsSuccessStatus: 200,
    }),
  );
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", homeRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.use("/api/admin/posts", postAdminRouter);
app.use("/api/admin/comment", commentAdminRouter);
app.use("/api/search", searchRouter);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Live: http://localhost:${config.port}`);
});
