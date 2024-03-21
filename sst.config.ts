import { SSTConfig } from "sst";
import { Secrets } from "./stacks/secrets";
import { API } from "./stacks/api";
import { Web } from "./stacks/web";
import { Auth } from "./stacks/auth";
import { DNS } from "./stacks/dns";

export default {
  config(_input) {
    return {
      name: "finvo",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
      .stack(DNS)
      .stack(Secrets)
      .stack(API)
      .stack(Web)
      .stack(Auth)
  },
} satisfies SSTConfig;
