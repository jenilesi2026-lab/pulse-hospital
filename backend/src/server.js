// src/server.js
import "dotenv/config";
import { app } from "./app.js";
import { prisma } from "./prisma.js";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    // Test DB connection
    await prisma.$connect();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Pulse Backend running at http://localhost:${PORT}`);
      console.log(`   Health: http://localhost:${PORT}/health`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to database:", err.message);
    process.exit(1);
  }
}

bootstrap();
