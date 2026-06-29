// src/controllers/departments.controller.js
import { prisma } from "../prisma.js";

/**
 * GET /api/departments
 * Returns all departments ordered by name
 */
export async function listDepartments(req, res, next) {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { doctors: true } }, // include doctor count
      },
    });
    res.json(departments);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/departments/:slug
 * Returns a single department by slug
 */
export async function getDepartmentBySlug(req, res, next) {
  try {
    const dept = await prisma.department.findUnique({
      where: { slug: req.params.slug },
      include: {
        _count: { select: { doctors: true } },
      },
    });
    if (!dept) return res.status(404).json({ message: "Department not found" });
    res.json(dept);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/departments/:slug/doctors
 * Returns all doctors belonging to this department
 */
export async function listDoctorsByDepartment(req, res, next) {
  try {
    const dept = await prisma.department.findUnique({
      where: { slug: req.params.slug },
      select: { id: true, name: true },
    });
    if (!dept) return res.status(404).json({ message: "Department not found" });

    const doctors = await prisma.doctor.findMany({
      where: { departmentId: dept.id },
      orderBy: { name: "asc" },
    });

    res.json({ department: dept, doctors });
  } catch (err) {
    next(err);
  }
}
