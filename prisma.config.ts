import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Explicitly load DATABASE_URL from environment
const databaseUrl = process.env.DATABASE_URL || env("DATABASE_URL");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: databaseUrl,
  },
});
