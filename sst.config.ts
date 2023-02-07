import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import { Api } from "sst/constructs";

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
    app.stack(API)
  },
} satisfies SSTConfig;
