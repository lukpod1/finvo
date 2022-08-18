import StorageStack from "./StorageStack";
import UserStack from "./UserStack";
import AccountStack from "./AccountStack";
import TransactionStack from "./TransactionStack";
import AuthStack from "./AuthStack";

export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x"
  });

  // Add more stacks
  const storageStack = new StorageStack(app, "storage");
  
  const authStack = new AuthStack(app, "auth", {
    usersTable: storageStack.usersTable
  });
  
  const userStack = new UserStack(app, "user-api", {
    auth: authStack.authorizer,
    usersTable: storageStack.usersTable,
  });

  const accountStack = new AccountStack(app, "account-api", {
    auth: authStack.authorizer,
    accountsTable: storageStack.accountsTable,
  });

  const transactionStack = new TransactionStack(app, "transaction-api", {
      auth: authStack.authorizer,
      transactionsTable: storageStack.transactionsTable,
      accountsTable: storageStack.accountsTable,
  });

}

