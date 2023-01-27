import { AuthStack } from "./AuthStack";
import { ApiStack } from "./ApiStack";
import { App } from "@serverless-stack/resources";
import { WebStack } from "./WebStack";
import { DatabaseStack } from "./DatabaseStack";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });

  app.stack(DatabaseStack).stack(ApiStack).stack(WebStack).stack(AuthStack);
}
