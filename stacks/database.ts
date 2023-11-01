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
    globalIndexes: {
      userIdIndex: {
        partitionKey: "userId",
        sortKey: "id",
      }
    }
  });

  const dbTransactions = new Table(stack, "transactions", {
    fields: {
      id: "string",
      amount: "number",
      date: "string",
      description: "string",
      type: "string",
      accountId: "string",
      userId: "string",
    },
    primaryIndex: { partitionKey: "id", sortKey: "accountId" },
    globalIndexes: {
      userIdIndex: {
        partitionKey: "userId",
        sortKey: "id",
      },
      accountIdIndex: {
        partitionKey: "accountId",
        sortKey: "id",
      }
    }
  });

  return {
    dbUsers, dbAccounts, dbTransactions
  }
}