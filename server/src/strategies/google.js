import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import User from "../database/models/User.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findOne({ id }, (err, user) => {
        done(err, user);
    });
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
          console.log("creating user!");
          console.log(newUser);
          return done(null, newUser);
        }
        console.log("user found!");
        console.log(userDB);
        return done(null, userDB);
      } catch (error) {
        return done(err, null);
      }
    }
  )
);
