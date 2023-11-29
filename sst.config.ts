import { Database } from "./stacks/database";
import { Secrets } from "./stacks/secrets";
import { Auth} from "./stacks/auth";
import { API } from "./stacks/api";
import { Web } from "./stacks/web";
import { SSTConfig } from "sst";

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
    app.stack(API)
    app.stack(Web)
    app.stack(Auth)
  },
} satisfies SSTConfig;
