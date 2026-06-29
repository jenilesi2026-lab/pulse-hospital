// src/utils/validators.js
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number").optional(),
  role: z.enum(["PATIENT", "ADMIN", "RECEPTIONIST", "DOCTOR"]).default("PATIENT"),
});

export const appointmentSchema = z.object({
  doctorId: z.string().uuid("Invalid doctor ID"),
  fullName: z.string().min(3, "Name too short"),
  dob: z.string().min(1, "Date of birth required"),
  gender: z.enum(["Male", "Female", "Other"]),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit mobile number"),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().min(3, "Address required"),
  city: z.string().min(2, "City required"),
  pincode: z.string().regex(/^\d{6}$/, "Invalid 6-digit pincode"),
  emergencyName: z.string().min(3, "Emergency contact name required"),
  emergencyPhone: z.string().regex(/^[6-9]\d{9}$/, "Invalid emergency phone"),
  symptoms: z.string().min(3, "Please describe your symptoms"),
  allergies: z.string().optional(),
  history: z.string().optional(),
  appointmentDate: z.string().min(1, "Appointment date required"),
  appointmentTime: z.string().min(1, "Appointment time required"),
}).refine(
  (d) => d.emergencyPhone !== d.phone,
  { message: "Emergency phone must differ from your number", path: ["emergencyPhone"] }
);

export const statusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]),
});
