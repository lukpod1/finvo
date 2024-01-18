import { char, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm";

export const cuid = (name: string) => char(name, { length: 24 });

export const id = {
  get id() {
    return cuid("id").primaryKey().notNull();
  }
}

export const timestamps = {
  timeCreated: timestamp("time_created", {
    mode: "string",
  })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  timeUpdated: timestamp("time_updated", {
    mode: "string",
  })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .defaultNow(),
  timeDeleted: timestamp("time_deleted", {
    mode: "string",
  }),
};