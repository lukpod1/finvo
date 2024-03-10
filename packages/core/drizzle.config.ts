import "dotenv/config"

import { Config } from "drizzle-kit";

const NEON_URL = "";

export default {
  schema: "./src/**/*.sql.ts",
  out: "./migrations/",
  driver: "pg",
  strict: true,
  verbose: true,
  dbCredentials: {
    connectionString: NEON_URL,
  },
} satisfies Config;
