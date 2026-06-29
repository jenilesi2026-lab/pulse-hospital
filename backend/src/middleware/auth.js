// src/middleware/auth.js
import jwt from "jsonwebtoken";

/**
 * Protects routes — must have a valid Bearer JWT token.
 */
export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing Bearer token" });
  }

  const token = header.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { sub: userId, role, email, iat, exp }
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
}

/**
 * Role-based access control.
 * Usage: requireRole("ADMIN", "RECEPTIONIST")
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized — not authenticated" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden — requires one of: ${roles.join(", ")}`,
      });
    }
    next();
  };
}
