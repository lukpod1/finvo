import { decimal, serial, pgTable, unique, varchar, integer } from "drizzle-orm/pg-core";
import { users } from "../user/user.sql";

export const accounts = pgTable('accounts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  balance: decimal('balance'),
  userId: integer('user_id').references(() => users.id).notNull(),
}, (account) => ({
  uniqueNameUser: unique().on(account.name, account.userId),
}));