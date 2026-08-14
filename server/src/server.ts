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
app.use(passport.initialize());
passport.use(jwtStrategy);
const allowlist = [process.env.CLIENT_USER_URL, process.env.CLIENT_ADMIN_URL];
const corsOpts = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowlist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("not allowed");
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.disable("x-powered-by");
app.use(cors(corsOpts));
app.set("trust proxy", true);
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
