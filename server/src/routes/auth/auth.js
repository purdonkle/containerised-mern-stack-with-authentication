import { Router } from "express";
import passport from "passport";

const router = Router();

// /api/auth/status
router.get("/status", (req, res) => {
  res.send(200);
});

// /api/auth/google
router.get("/google", passport.authenticate("google"));

// /api/auth/google/redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.send(200);
});

export { router as default };
