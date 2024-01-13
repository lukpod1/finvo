import { decimal, serial, pgTable, unique, varchar, integer, char } from "drizzle-orm/pg-core";
import { users } from "../user/user.sql";
import { id } from "../util/sql";

export const accounts = pgTable('accounts', {
  ...id,
  name: varchar('name', { length: 255 }),
  balance: decimal('balance'),
  userId: char('user_id', { length: 24 }).references(() => users.id).notNull(),
}, (account) => ({
  uniqueNameUser: unique().on(account.name, account.userId),
}));
