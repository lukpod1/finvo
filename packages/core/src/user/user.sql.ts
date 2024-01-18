import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { id } from "../util/sql";

export const users = pgTable('users', {
  ...id,
  name: text('name'),
  email: varchar('email', { length: 255 }).unique(),
  picture: text('picture')
});