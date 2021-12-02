import StorageStack from "./StorageStack";
import UserStack from "./UserStack";
import AccountStack from "./AccountStack";
import TransactionStack from "./TransactionStack";
//import AuthStack from "./AuthStack";

export default function main(app) {
  // Set default runtime for all functions
  app.setDefaultFunctionProps({
    runtime: "nodejs12.x"
  });

  // Add more stacks
  const storageStack = new StorageStack(app, "storage");
  
  new UserStack(app, "user-api", {
    usersTable: storageStack.usersTable,
  });

  new AccountStack(app, "account-api", {
    accountsTable: storageStack.accountsTable,
  });

  new TransactionStack(app, "transaction-api", {
      transactionsTable: storageStack.transactionsTable,
      accountsTable: storageStack.accountsTable,
  });

  // new AuthStack(app, "auth", {
  //   api: apiStack.api,
  //   bucket: storageStack.bucket,
  // });
}

