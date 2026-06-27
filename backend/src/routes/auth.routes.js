import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/profile", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile fetched successfully.",
    user: req.user,
  });
});

export default router;
