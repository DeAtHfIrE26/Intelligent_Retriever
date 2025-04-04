import { defineConfig } from "drizzle-kit";

// Use a dummy URL if DATABASE_URL is not set (for development purposes)
const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost:5432/dummy";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
