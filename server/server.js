// server.js
import "dotenv/config.js";
import "./src/strategies/google.js";
import "./src/database/database.js";
import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import mongoose from "mongoose";
import sessionStore from "connect-mongo";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import routes from "./src/routes/routes.js";


// variable declartion and instantiation
const app = express();
const PORT = process.env.PORT || 8080;
const CLIENT_BUILD_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "../client/build"
);
app.use(express.static(CLIENT_BUILD_PATH));

const MongoStore = sessionStore(session);

// Register cors
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}));


// Register middlesware for body requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Instantiate cookie for session
app.use(
  session({
    cookie: {
      maxAge: 3600000 * 24,
    },
    saveUninitialized: false,
    resave: false,
    secret: "kitty cat",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// api routes barrel
app.use("/api", routes);

// If the build is in production we serve the static files using express
if (process.env.NODE_ENV === "production") {
  // Serve React Client
  app.get("*", (req, res) => {
    res.sendFile(join(CLIENT_BUILD_PATH, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});
