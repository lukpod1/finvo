import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { id, timestamps } from "./../util/sql";
import { relations } from "drizzle-orm";
import { accounts } from "../account/account.sql";

export const users = pgTable('users', {
  ...id,
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  picture: text('picture'),
  ...timestamps
});

export const usersRelations = relations(users, ({many}) => ({
  accounts: many(accounts)
}));