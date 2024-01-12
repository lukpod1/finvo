import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import "dotenv/config";
import { Config } from "sst/node/config";

neonConfig.fetchConnectionCache = true;

const sql = neon(Config.NEON_DB_URL);
export const db = drizzle(sql);