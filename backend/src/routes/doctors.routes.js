// src/routes/doctors.routes.js
import { Router } from "express";
import {
  listDoctors,
  getDoctor,
  getDoctorAvailability,
} from "../controllers/doctors.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// GET /api/doctors?department=cardiology&search=sharma
router.get("/", asyncHandler(listDoctors));

// GET /api/doctors/:id
router.get("/:id", asyncHandler(getDoctor));

// GET /api/doctors/:id/availability?date=2026-07-01
router.get("/:id/availability", asyncHandler(getDoctorAvailability));

export default router;
