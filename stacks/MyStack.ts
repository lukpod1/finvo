import { StackContext, Api, use } from "sst/constructs";
import { Database } from "./DatabaseStack";

export function API({ stack }: StackContext) {
  const dbUsers = use(Database)
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [dbUsers.dbUsers]
      }
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /session": "packages/functions/src/session.handler" 
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  }
}
