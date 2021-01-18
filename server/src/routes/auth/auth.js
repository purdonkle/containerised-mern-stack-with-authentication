import { Router } from "express";
import passport from "passport";
import "dotenv/config.js";

const router = Router();

// /api/auth/status
router.get("/status", (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

// /api/auth/google
router.get("/google", passport.authenticate("google"));

// /api/auth/google/redirect
if (process.env.NODE_ENV === "production") {
  router.get(
    "/google/redirect",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("http://localhost:8080/home");
    }
  );
} else {
  router.get(
    "/google/redirect",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("http://localhost:3000/home");
    }
  );
}

export { router as default };
