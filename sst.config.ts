import { SSTConfig } from "sst";
import { AUTH } from "./stacks/AuthStack";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "finance-service",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "nodejs14.x",
    })
    app.stack(API).stack(AUTH)
  },
} satisfies SSTConfig;
