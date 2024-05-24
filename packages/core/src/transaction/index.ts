import { createSelectSchema } from "drizzle-zod";
import { transactions } from "./transaction.sql";
import { Schema, z } from "zod";
import { zod } from "../util/zod";
import { db } from "../drizzle";
import { id } from "../util/sql";
import { eq } from "drizzle-orm";

export const TransactionsSchema = createSelectSchema(transactions);
export type Transactions = z.infer<typeof TransactionsSchema>;

export const getTransactionsByUserId = zod(TransactionsSchema.shape.userId, async (userId) => {
  return db.select()
    .from(transactions)
    .where(eq(transactions.userId, userId))
    .execute()
    .then((rows) => rows);
});

export const getTransactionsByAccountId = zod(TransactionsSchema.shape.accountId, async (accountId) => {
  return db.select()
    .from(transactions)
    .where(eq(transactions.accountId, accountId))
    .execute()
    .then((rows) => rows);
})

export const remove = zod(TransactionsSchema.shape.id, async (id) => {
  db.delete(transactions)
    .where(eq(transactions.id, id))
    .execute();
})