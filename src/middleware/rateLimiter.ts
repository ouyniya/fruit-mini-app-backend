import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import { AuthenticatedRequest } from "./auth.middleware";

// General API Rate Limiter
export const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000"), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "0"),
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict Rate Limiter for Auth endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000, // 5 attempts per window
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later",
  },
  keyGenerator: (req) => {
    // Use email or username as key instead of IP
    const identifier = req.body.email || req.body.username;
    return identifier || req.ip; // fallback to IP if body is missing
  },
});

// Speed Limiter for repeated requests
export const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 2, // allow 2 requests per windowMs at full speed
  delayMs: () => 500, // add 500ms delay per request after delayAfter
});
