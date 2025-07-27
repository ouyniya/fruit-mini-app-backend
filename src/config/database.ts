import { PrismaClient } from "@prisma/client";

// Initialize PrismaClient.
// Log 'query', 'error', 'warn' in development for debugging.
// Only log 'error' in production to avoid verbose logs and potential sensitive data exposure.
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
});

export default prisma;
