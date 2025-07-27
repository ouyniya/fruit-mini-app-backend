import "dotenv/config";
import prisma from "./config/database";
import { app } from "./app";

const PORT = process.env.PORT || 3000;

// --- Server Startup Logic ---
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully!");

    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(
        `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
      );
      console.log(`Client URL: ${process.env.CLIENT_URL}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);

    await prisma.$disconnect();
    // Exit the process with a non-zero code to indicate failure
    process.exit(1);
  }
};

startServer();
