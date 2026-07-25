// import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import queries from "./models/queries";
import config from "./config/config";

const opts = {
  secretOrKey: config.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // write your own custom extractor to get the session out the cookie
};

const jwtStrategy = new JWTStrategy(opts, async (jwt_payload, done) => {
  const isUserValid = await queries.verifyTokenPayload(jwt_payload);
  if (isUserValid.isValid) return done(null, isUserValid.user);
  return done(null, false);
});

export { jwtStrategy };
