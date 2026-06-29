// src/routes/departments.routes.js
import { Router } from "express";
import {
  listDepartments,
  getDepartmentBySlug,
  listDoctorsByDepartment,
} from "../controllers/departments.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// GET /api/departments
router.get("/", asyncHandler(listDepartments));

// GET /api/departments/:slug
router.get("/:slug", asyncHandler(getDepartmentBySlug));

// GET /api/departments/:slug/doctors
router.get("/:slug/doctors", asyncHandler(listDoctorsByDepartment));

export default router;
