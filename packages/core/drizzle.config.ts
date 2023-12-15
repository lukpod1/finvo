import "dotenv/config"

import { Config } from "drizzle-kit";

export default {
  schema: "./src/**/*.sql.ts",
  out: "./migrations/",
  driver: "pg",
  strict: true,
  verbose: true,
  dbCredentials: {
    connectionString: process.env["SST_Secret_value_NEON_DB_URL"]!,
  },
} satisfies Config;
