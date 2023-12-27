import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DB_NEON_URL!);
export const db = drizzle(sql);