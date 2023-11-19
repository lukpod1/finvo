import { SSTConfig } from "sst";
import { Web } from "./stacks/web";
import { Auth} from "./stacks/auth";
import { Secrets } from "./stacks/secrets";
import { Session } from "./stacks/session";
import { Account } from "./stacks/account";
import { Database } from "./stacks/database";
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
    app.stack(Secrets)
    app.stack(Session)
    app.stack(Account)
    app.stack(Transaction)
    app.stack(Web)
    app.stack(Auth)
  },
} satisfies SSTConfig;
