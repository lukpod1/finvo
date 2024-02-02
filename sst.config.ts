import { SSTConfig } from "sst";
import { Database } from "./stacks/database";
import { Secrets } from "./stacks/secrets";
import { API } from "./stacks/api";
import { Web } from "./stacks/web";
import { Auth } from "./stacks/auth";

export default {
  config(_input) {
    return {
      name: "finvo",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
      .stack(Secrets)
      .stack(API)
      .stack(Web)
      .stack(Auth)
  },
} satisfies SSTConfig;
