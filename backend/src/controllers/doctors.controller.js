// src/controllers/doctors.controller.js
import { prisma } from "../prisma.js";

/**
 * GET /api/doctors?department=slug&search=name
 * Returns all doctors with optional filtering by department slug or name search
 */
export async function listDoctors(req, res, next) {
  try {
    const { department, search } = req.query;

    const where = {};

    // Filter by department slug
    if (department) {
      const dept = await prisma.department.findUnique({
        where: { slug: department },
        select: { id: true },
      });
      if (!dept) return res.json([]); // unknown slug → empty array
      where.departmentId = dept.id;
    }

    // Filter by doctor name (case-insensitive contains)
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    const doctors = await prisma.doctor.findMany({
      where,
      orderBy: { name: "asc" },
      include: { department: { select: { id: true, name: true, slug: true } } },
    });

    res.json(doctors);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/doctors/:id
 * Returns a single doctor with their department info
 */
export async function getDoctor(req, res, next) {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: req.params.id },
      include: { department: true },
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/doctors/:id/availability?date=YYYY-MM-DD
 * Returns booked time slots for the given doctor on a given date
 * (so the frontend can show unavailable slots)
 */
export async function getDoctorAvailability(req, res, next) {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "date query param required (YYYY-MM-DD)" });

    const start = new Date(`${date}T00:00:00`);
    const end   = new Date(`${date}T23:59:59`);

    const booked = await prisma.appointment.findMany({
      where: {
        doctorId: req.params.id,
        status: { notIn: ["CANCELLED"] },
        appointmentDate: { gte: start, lte: end },
      },
      select: { appointmentDate: true, status: true },
    });

    // Return just the time strings that are booked
    const bookedSlots = booked.map((a) =>
      a.appointmentDate.toTimeString().slice(0, 5) // "HH:MM"
    );

    res.json({ date, doctorId: req.params.id, bookedSlots });
  } catch (err) {
    next(err);
  }
}
