import { StackContext, Api, use } from "@serverless-stack/resources";
import { DatabaseStack } from "./DatabaseStack";

export function ApiStack({ stack }: StackContext) {

  const dynamodb = use(DatabaseStack);
  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [dynamodb]
      }
    },
    routes: {
      "GET /": "functions/lambda.handler",
      "GET /session": "functions/session.handler"
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api
  };
}
