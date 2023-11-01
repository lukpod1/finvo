import { SSTConfig } from "sst";
import { Auth} from "./stacks/auth";
import { Database } from "./stacks/database";
import { Web } from "./stacks/web";
import { Account } from "./stacks/account";
import { Session } from "./stacks/session";
import { Transaction } from "./stacks/transaction";

export default {
  config(_input) {
    return {
      name: "finvo",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(Database)
    app.stack(Session)
    app.stack(Account)
    app.stack(Transaction)
    app.stack(Web)
    app.stack(Auth)
  },
} satisfies SSTConfig;
