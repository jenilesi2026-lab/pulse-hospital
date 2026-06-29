// src/app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import "dotenv/config";

import authRoutes        from "./routes/auth.routes.js";
import departmentsRoutes from "./routes/departments.routes.js";
import doctorsRoutes     from "./routes/doctors.routes.js";
import staffRoutes       from "./routes/staff.routes.js";
import appointmentsRoutes from "./routes/appointments.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app = express();

// ─── Security Middleware ───────────────────────────────────────────────────
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// ─── CORS ──────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

// ─── Body Parser ───────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ ok: true, time: new Date() }));

// ─── Routes ────────────────────────────────────────────────────────────────
app.use("/api/auth",         authRoutes);
app.use("/api/departments",  departmentsRoutes);
app.use("/api/doctors",      doctorsRoutes);
app.use("/api/staff",        staffRoutes);
app.use("/api/appointments", appointmentsRoutes);

// 404 handler
app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

// ─── Global Error Handler ──────────────────────────────────────────────────
app.use(errorHandler);
