import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations/",
  strict: true,
  schema: "./src/**/*.sql.ts",
  verbose: true,
  driver: "pg",
  dbCredentials: {
    host: "aws.connect.psdb.cloud",
    user: process.env["SST_Secret_value_PLANETSCALE_USERNAME"],
    password: process.env["SST_Secret_value_PLANETSCALE_PASSWORD"],
    database: "finvo"
  },
});
