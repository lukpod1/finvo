import { neon, neonConfig } from "@neondatabase/serverless";
import { Config } from "sst/node/config";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

const sql = neon(Config.NEON_DB_URL);
export const db = drizzle(sql);