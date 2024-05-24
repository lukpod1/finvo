import { char, text, timestamp } from "drizzle-orm/pg-core"

export const cuid = (name: string) => text(name);

export const id = {
  get id() {
    return cuid("id").primaryKey().notNull();
  }
}

export const timestamps = {
  createdAt: timestamp("created_at", {
    mode: "string"
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "string"
  })
    .notNull()
    .defaultNow(),
};