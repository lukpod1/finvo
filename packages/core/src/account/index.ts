import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { accounts } from "./account.sql";
import { Schema, z } from "zod";
import { zod } from "../util/zod";
import { db } from "../drizzle";
import { id } from "../util/sql";
import { and, eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export const AccountsSchema = createSelectSchema(accounts, {
  id: (schema) => schema.id,
  name: (schema) => schema.name,
  balance: (schema) => schema.balance,
  userId: (schema) => schema.userId
});
export type Accounts = z.infer<typeof AccountsSchema>;

export const getAccountsByUserId = zod(AccountsSchema.shape.userId, async (userId) => {
  return db.select()
    .from(accounts)
    .where(eq(accounts.userId, userId))
    .execute()
    .then((rows) => rows);
});

export const create = zod(
  AccountsSchema.pick({
    id: true,
    name: true,
    balance: true,
    userId: true
  }),
  async (input) => {
    console.log("accounts inputs: ", input)
    await db.insert(accounts).values({
      id: input.id,
      name: input.name,
      balance: input.balance,
      userId: input.userId
    });
    return id;
  }
);

export const fromID = zod(AccountsSchema.shape.id, async (id) => {
  return db.select()
    .from(accounts)
    .where(eq(accounts.id, id))
    .execute()
    .then((rows) => rows[0]);
});

export const remove = zod(
  AccountsSchema.pick({
    id: true,
    userId: true
  }), async (input) => {
  return db.delete(accounts)
    .where(and(
      eq(accounts.id, input.id),
      eq(accounts.userId, input.userId)
    ))
    .returning({ deletedId: accounts.id });
})