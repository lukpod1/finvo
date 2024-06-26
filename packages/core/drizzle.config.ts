import "dotenv/config";

import { Config } from "drizzle-kit";

export default {
  schema: "./src/**/*.sql.ts",
  out: "./migrations/",
  driver: "pg",
  strict: true,
  verbose: true,
  dbCredentials: {
    connectionString: process.env.NEONDB as string,
  },
} satisfies Config;
