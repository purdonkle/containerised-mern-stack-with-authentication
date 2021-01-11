import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../database/models/User.js";

passport.serializeUser((user, done) => {
  console.log("serialize user!");
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  console.log("deserialize user");
  try {
    const userDB = await User.findOne({ email });
    return userDB ? done(null, userDB) : done(null, null);
  } catch (err) {
    console.log(err);
    return done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["email", "profile"],
    },
    async (accesToken, refreshToken, profile, done) => {
      const {
        _json: { name, email },
      } = profile;

      try {
        const userDB = await User.findOne({ email });
        if (!userDB) {
          const newUser = await User.create({ email, name });
          return done(null, newUser);
        }
        return done(null, userDB);
      } catch (error) {
        return done(err, null);
      }
    }
  )
);
