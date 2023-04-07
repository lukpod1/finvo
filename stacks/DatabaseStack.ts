import { StackContext, Table } from "sst/constructs";

export function Database({ stack }: StackContext) {
  const dbUsers = new Table(stack, "users", {
    fields: {
      id: "string",
      name: "string",
      email: "string",
      picture: "string"
    },
    primaryIndex: { partitionKey: "id" },
  });

  const dbAccounts = new Table(stack, "accounts", {
    fields: {
      id: "string",
      userId: "string",
      name: "string",
      balance: "number",
    },
    primaryIndex: { partitionKey: "id" , sortKey: "userId"},
  });

  const dbTransactions = new Table(stack, "transactions", {
    fields: {
      id: "string",
      amount: "number",
      date: "string",
      type: "string",
      accountId: "string",
      userId: "string",
    },
    primaryIndex: { partitionKey: "id", sortKey: "accountId" },
  });

  return {
    dbUsers, dbAccounts, dbTransactions
  }
}