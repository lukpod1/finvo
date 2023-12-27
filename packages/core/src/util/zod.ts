import { z } from "zod";

export function zod<
  Schema extends z.ZodSchema<any, any, any>,
  Return extends any
>(schema: Schema, func: (value: z.infer<Schema>) => Return) {
  const resut = (input: z.infer<Schema>) => {
    const parsed = schema.parse(input);
    return func(parsed);
  };
  resut.schema = schema;
  return resut;
}