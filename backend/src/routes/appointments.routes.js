// src/routes/appointments.routes.js
import { Router } from "express";
import {
  createAppointment,
  listAppointments,
  getAppointment,
  myAppointments,
  updateAppointmentStatus,
} from "../controllers/appointments.controller.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// POST /api/appointments — requires login
router.post("/", requireAuth, asyncHandler(createAppointment));

// GET /api/appointments/my — logged-in patient's own appointments
router.get("/my", requireAuth, asyncHandler(myAppointments));

// GET /api/appointments — admin/receptionist only, supports ?status=&doctorId=&date=
router.get(
  "/",
  requireAuth,
  requireRole("ADMIN", "RECEPTIONIST"),
  asyncHandler(listAppointments)
);

// GET /api/appointments/:id — admin/receptionist only
router.get(
  "/:id",
  requireAuth,
  requireRole("ADMIN", "RECEPTIONIST"),
  asyncHandler(getAppointment)
);

// PATCH /api/appointments/:id/status — admin/receptionist only
router.patch(
  "/:id/status",
  requireAuth,
  requireRole("ADMIN", "RECEPTIONIST"),
  asyncHandler(updateAppointmentStatus)
);

export default router;
