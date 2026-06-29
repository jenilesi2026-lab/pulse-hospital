// src/controllers/appointments.controller.js
import { prisma } from "../prisma.js";
import { appointmentSchema, statusSchema } from "../utils/validators.js";

/**
 * Converts separate date and time strings into a single JS Date object.
 * Forces IST (+05:30).
 */
function toISODateTime(dateStr, timeStr) {
  return new Date(`${dateStr}T${timeStr}:00+05:30`);
}

/**
 * POST /api/appointments   (protected — requires JWT)
 * Books an appointment for the authenticated user.
 * Prevents double-booking the same doctor at the same time slot.
 */
export async function createAppointment(req, res, next) {
  try {
    const data = appointmentSchema.parse(req.body);

    // Verify doctor exists
    const doctor = await prisma.doctor.findUnique({ where: { id: data.doctorId } });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // Combine date + time into a single DateTime
    const appointmentDateTime = toISODateTime(data.appointmentDate, data.appointmentTime);

    // Check for double booking — same doctor, same exact slot
    const conflict = await prisma.appointment.findFirst({
      where: {
        doctorId: data.doctorId,
        appointmentDate: appointmentDateTime,
        status: { notIn: ["CANCELLED"] }, // cancelled slots can be re-booked
      },
    });
    if (conflict) {
      return res.status(409).json({
        message: `This time slot is already booked. Please choose another time.`,
      });
    }

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        doctorId:        data.doctorId,
        createdByUserId: req.user?.sub || null, // link to user if authenticated
        fullName:        data.fullName,
        dob:             new Date(data.dob),
        gender:          data.gender,
        bloodGroup:      data.bloodGroup,
        phone:           data.phone,
        email:           data.email || null,
        address:         data.address,
        city:            data.city,
        pincode:         data.pincode,
        emergencyName:   data.emergencyName,
        emergencyPhone:  data.emergencyPhone,
        symptoms:        data.symptoms,
        allergies:       data.allergies || null,
        history:         data.history || null,
        appointmentDate: appointmentDateTime,
        feeAmount:       doctor.fee, // snapshot the fee at booking time
      },
      include: {
        doctor: {
          include: { department: { select: { name: true, slug: true } } },
        },
      },
    });

    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/appointments   (protected: ADMIN or RECEPTIONIST)
 * Returns all appointments ordered by date (newest first)
 */
export async function listAppointments(req, res, next) {
  try {
    const { status, doctorId, date } = req.query;

    const where = {};
    if (status) where.status = status.toUpperCase();
    if (doctorId) where.doctorId = doctorId;
    if (date) {
      const start = new Date(`${date}T00:00:00`);
      const end   = new Date(`${date}T23:59:59`);
      where.appointmentDate = { gte: start, lte: end };
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { appointmentDate: "desc" },
      include: {
        doctor: {
          include: { department: { select: { name: true, slug: true } } },
        },
        createdByUser: { select: { id: true, name: true, email: true } },
      },
    });

    res.json(appointments);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/appointments/:id   (protected)
 * Returns a single appointment
 */
export async function getAppointment(req, res, next) {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: req.params.id },
      include: {
        doctor: {
          include: { department: true },
        },
        createdByUser: { select: { id: true, name: true, email: true } },
      },
    });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/appointments/my   (protected: PATIENT)
 * Returns appointments created by the currently logged-in user
 */
export async function myAppointments(req, res, next) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: { createdByUserId: req.user.sub },
      orderBy: { appointmentDate: "desc" },
      include: {
        doctor: {
          include: { department: { select: { name: true, slug: true } } },
        },
      },
    });
    res.json(appointments);
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/appointments/:id/status   (protected: ADMIN or RECEPTIONIST)
 * Updates the status of an appointment (PENDING → CONFIRMED, CANCELLED, COMPLETED)
 */
export async function updateAppointmentStatus(req, res, next) {
  try {
    const { status } = statusSchema.parse(req.body);

    const updated = await prisma.appointment.update({
      where: { id: req.params.id },
      data: { status },
      include: { doctor: true },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}
