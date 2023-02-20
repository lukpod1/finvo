import { StackContext, Table } from "sst/constructs";

export function Database({ stack }: StackContext) {
  const dbUsers = new Table(stack, "users", {
    fields: {
        id: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  return {
    dbUsers,
  }
}