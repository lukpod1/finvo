import { SSTConfig } from "sst";
import { Authentication } from "./stacks/AuthStack";
import { Database } from "./stacks/DatabaseStack";
import { FrontEnd } from "./stacks/FrontEndStack";
import { Accounts } from "./stacks/AccountStack";
import { Session } from "./stacks/SessionStack";
import { Transaction } from "./stacks/TransactionStack";
// import { Datadog } from "datadog-cdk-constructs-v2";
import { Stack } from "sst/constructs";

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

    // if (!app.local) {
    //   await app.finish();

    //   app.node.children.forEach((stack) => {
    //     if (stack instanceof Stack) {
    //       const datadog = new Datadog(stack, "Datadog", {
    //         nodeLayerVersion: 91,
    //         extensionLayerVersion: 43,
    //         apiKey: process.env.DATADOG_API_KEY,
    //       });

    //       datadog.addLambdaFunctions(stack.getAllFunctions());
    //     }

    //   })
    // }

  },
} satisfies SSTConfig;
