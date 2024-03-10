import { char, decimal, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { users } from "../user/user.sql";
import { accounts } from "../account/account.sql";
import { id, timestamps } from "../util/sql";
import { relations } from "drizzle-orm";

export const typeEnum = pgEnum('type', ['income', 'expense']);

export const transactions = pgTable('transactions', {
  ...id,
  description: text('description'),
  amount: decimal('amount').notNull(),
  type: typeEnum('type').notNull(),
  userId: char('user_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  accountId: char('account_id', { length: 255 })
    .notNull()
    .references(() => accounts.id),
  ...timestamps,
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
	account: one(accounts, { 
    fields: [transactions.accountId], 
    references: [accounts.id] 
  }),
	user: one(users, { 
    fields: [transactions.userId], 
    references: [users.id] 
  }),
}));