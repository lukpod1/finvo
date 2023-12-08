import { numeric, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "../user/user.sql";

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  name: text('name'),
  balance: numeric('balance'),
  userId: text('user_id').references(() => users.id),
});