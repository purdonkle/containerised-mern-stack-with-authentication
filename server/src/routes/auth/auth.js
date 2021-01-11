import { Router } from "express";
import passport from "passport";

const router = Router();

// /api/auth/status
router.get("/status", (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

// /api/auth/google
router.get("/google", passport.authenticate("google"));

// /api/auth/google/redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
   res.redirect("http://localhost:3000/home");
});

export { router as default };
