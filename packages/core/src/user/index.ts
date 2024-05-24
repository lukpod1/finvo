import { createSelectSchema } from "drizzle-zod";
import { users } from "./user.sql";
import { z } from "zod";
import { zod } from "../util/zod";
import { db } from "../drizzle";
import { id } from "../util/sql";
import { eq } from "drizzle-orm";

export const UserSchema = createSelectSchema(users, {
  id: (schema) => schema.id,
  email: (schema) => schema.email.trim().toLowerCase(),
  name: (schema) => schema.name,
  picture: (schema) => schema.picture
});
export type User = z.infer<typeof UserSchema>;

export const create = zod(
  UserSchema.pick({
    id: true,
    email: true,
    name: true,
    picture: true
  }),
  async (input) => {
    console.log("users inputs: ", input)
    await db.insert(users).values({
      id: input.id,
      email: input.email,
      name: input.name,
      picture: input.picture
    }).onConflictDoNothing();
    return id;
  }
);

export const fromID = zod(UserSchema.shape.id, async (id) => {
  return db.select()
    .from(users)
    .where(eq(users.id, id))
    .execute()
    .then((rows) => rows[0]);
});
