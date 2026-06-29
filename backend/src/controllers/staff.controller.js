// src/controllers/staff.controller.js
import { prisma } from "../prisma.js";

/**
 * GET /api/staff?type=NURSE|SUPPORT_STAFF&department=ICU
 * Returns all staff members with optional type/department filtering
 */
export async function listStaff(req, res, next) {
  try {
    const { type, department } = req.query;

    const where = {};
    if (type && ["NURSE", "SUPPORT_STAFF"].includes(type.toUpperCase())) {
      where.type = type.toUpperCase();
    }
    if (department) {
      where.department = { contains: department, mode: "insensitive" };
    }

    const staff = await prisma.staff.findMany({
      where,
      orderBy: { name: "asc" },
    });

    res.json(staff);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/staff/:id
 * Returns a single staff member
 */
export async function getStaffMember(req, res, next) {
  try {
    const member = await prisma.staff.findUnique({
      where: { id: req.params.id },
    });
    if (!member) return res.status(404).json({ message: "Staff member not found" });
    res.json(member);
  } catch (err) {
    next(err);
  }
}
