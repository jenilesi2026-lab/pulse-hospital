// src/middleware/errorHandler.js
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: "Validation failed", errors: err.flatten() });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Duplicate value", target: err.meta?.target });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ message: "Record not found" });
    }
  }
  console.error(err);
  res.status(500).json({ message: "Server error" });
}
