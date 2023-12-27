import { char, decimal, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { users } from "../user/user.sql";
import { accounts } from "../account/account.sql";
import { id, timestamps} from "../util/sql";

export const typeEnum = pgEnum('type', ['income', 'expense']);

export const transactions = pgTable('transactions', {
  ...id,
  description: text('description'),
  amount: decimal('amount'),
  ...timestamps,
  type: typeEnum('type'),
  userId: char('user_id', { length: 24 }).references(() => users.id).notNull(),
  accountId: char('account_id', { length: 24 }).references(() => accounts.id).notNull()
});