// src/routes/auth.routes.js
import { Router } from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// POST /api/auth/register
router.post("/register", asyncHandler(register));

// POST /api/auth/login
router.post("/login", asyncHandler(login));

// GET /api/auth/me  (protected)
router.get("/me", requireAuth, asyncHandler(me));

export default router;
