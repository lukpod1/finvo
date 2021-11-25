import StorageStack from "./StorageStack";
import UserStack from "./UserStack";
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
    accountsTable: storageStack.accountsTable,
    transactionsTable: storageStack.transactionsTable,
  });

  // new AuthStack(app, "auth", {
  //   api: apiStack.api,
  //   bucket: storageStack.bucket,
  // });
}
