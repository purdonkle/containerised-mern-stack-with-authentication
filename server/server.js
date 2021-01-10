// server.js
import "dotenv/config.js";
import express from "express";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import sessionStore from "connect-mongo";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import routes from "./src/routes/routes.js";
import "./src/database/database.js";
import "./src/strategies/google.js";

// variable declartion and instantiation
const MongoStore = sessionStore(session);
const app = express();
const PORT = process.env.PORT || 8080;
const CLIENT_BUILD_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "../client/build"
);

// Register middlesware for body requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Instantiate cookie for session
var sess = {
  cookie: {
    maxAge: 3600000 * 24,
  },
  saveUninitialized: false,
  resave: false,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
};

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// api routes barrel
app.use("/api", routes);

// If the build is in production we serve the static files using express
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(CLIENT_BUILD_PATH));

  // Serve React Client
  app.get("/", (req, res) => {
    res.sendFile(join(CLIENT_BUILD_PATH, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
