import { pgTable, varchar, char, doublePrecision } from "drizzle-orm/pg-core";
import { users } from "../user/user.sql";
import { id, timestamps } from "../util/sql";
import { relations } from "drizzle-orm";
import { transactions } from "../transaction/transaction.sql";

export const accounts = pgTable('accounts', {
  ...id,
  name: varchar('name', { length: 255 }).notNull(),
  balance: doublePrecision('balance').notNull(),
  userId: char('user_id', { length: 255 })
    .notNull()
    .references(() => users.id),
  ...timestamps
});

export const accountsRelations = relations(accounts, ({one, many}) => ({
  user: one(users, { 
    fields: [accounts.userId], 
    references: [users.id] 
  }),
  transactions: many(transactions)
}));