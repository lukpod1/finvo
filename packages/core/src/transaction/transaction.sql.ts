import { decimal, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "../user/user.sql";
import { accounts } from "../account/account.sql";

export const typeEnum = pgEnum('type', ['income', 'expense']);

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  description: text('description'),
  amount: decimal('amount'),
  timestamp: timestamp('timestamp').defaultNow(),
  type: typeEnum('type'),
  userId: integer('user_id').references(() => users.id).notNull(),
  accountId: integer('account_id').references(() => accounts.id).notNull()
});