import { SSTConfig } from "sst";
import { Authentication } from "./stacks/AuthStack";
import { Database } from "./stacks/DatabaseStack";
import { FrontEnd } from "./stacks/FrontEndStack";
import { Accounts } from "./stacks/AccountStack";
import { Session } from "./stacks/SessionStack";
import { Transaction } from "./stacks/TransactionStack";

export default {
  config(_input) {
    return {
      name: "finance-service",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Database)
    app.stack(Session)
    app.stack(Accounts)
    app.stack(Transaction)
    app.stack(FrontEnd)
    app.stack(Authentication)
  },
} satisfies SSTConfig;
