// src/controllers/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";
import { loginSchema, registerSchema } from "../utils/validators.js";

/**
 * POST /api/auth/register
 * Create a new user account (anyone can self-register as PATIENT)
 */
export async function register(req, res, next) {
  try {
    const data = registerSchema.parse(req.body);

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        phone: data.phone || null,
        role: data.role || "PATIENT",
      },
      select: { id: true, name: true, email: true, role: true, phone: true, createdAt: true },
    });

    const token = signToken(user);

    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/auth/login
 * Returns { token, user }
 */
export async function login(req, res, next) {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = signToken(user);

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/auth/me  (protected)
 * Returns the currently authenticated user's profile
 */
export async function me(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.sub },
      select: { id: true, name: true, email: true, role: true, phone: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    next(err);
  }
}

// ─── Helper ─────────────────────────────────────────────────────────────────
function signToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}
