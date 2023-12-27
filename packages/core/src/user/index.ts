import { createSelectSchema } from "drizzle-zod";
import { users } from "./user.sql";
import { z } from "zod";
import { zod } from "../util/zod";
import { db } from "../drizzle";
import { id } from "../util/sql";

export const Info = createSelectSchema(users, {
  id: (schema) => schema.id,
  email: (schema) => schema.email.trim().toLowerCase(),
  name: (schema) => schema.name,
  picture: (schema) => schema.picture
});
export type Info = z.infer<typeof Info>;

export const create = zod(
  Info.pick({
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
    });
    return id;
  }
);