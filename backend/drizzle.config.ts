import { defineConfig } from "drizzle-kit";

// Note: This configuration assumes you have a standard Postgres connection string
// accessible via environment variables (e.g., Supabase connection pooling URL).
export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
    },
    verbose: true,
    strict: true,
});
