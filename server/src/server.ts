import express from "express";
import config from "./config/config";
import { type Response, type Request } from "express";
import homeRouter from "./routes/homeRouter";
import loginRouter from "./routes/authRoutes/loginRouter";
import passport from "passport";
import { jwtStrategy } from "./jwtAuth";
import cookieParser from "cookie-parser";

const app = express();
app.use(passport.initialize());
passport.use(jwtStrategy);

app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", homeRouter);
app.use("/api/login", loginRouter);
app.get(
  "/api/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    return res.send("welcome to the protected route");
  },
);
app.listen(config.port, () => {
  console.log(`Live: http://localhost:${config.port}`);
});
