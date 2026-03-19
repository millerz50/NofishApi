import rateLimit, { Options } from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

// Ensure env is parsed as number
const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX) || 100;

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: MAX_REQUESTS,
  message: {
    status: "error",
    message: "Too many requests, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
} as Options);