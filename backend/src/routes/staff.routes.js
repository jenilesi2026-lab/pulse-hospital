// src/routes/staff.routes.js
import { Router } from "express";
import { listStaff, getStaffMember } from "../controllers/staff.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

// GET /api/staff?type=NURSE&department=ICU
router.get("/", asyncHandler(listStaff));

// GET /api/staff/:id
router.get("/:id", asyncHandler(getStaffMember));

export default router;
