import { Auth, Config, StackContext, use } from "sst/constructs";
import { API } from "./ApiStack";
import { FrontEnd } from "./FrontEndStack";

export function AUTH({ stack }: StackContext) {

    const apiStack = use(API);
    const frontEndStack = use(FrontEnd);

    const GOOGLE_CLIENT_ID = new Config.Secret(stack, "GOOGLE_CLIENT_ID");

    const auth = new Auth(stack, "auth", {
        authenticator: {
            handler: "packages/functions/src/auth.handler",
            bind: [apiStack.api, GOOGLE_CLIENT_ID],
            environment: {
                SITE_URL: frontEndStack.site.url || "http://localhost:3000",
            },
        }
    });

    apiStack.api.bind([GOOGLE_CLIENT_ID])

    auth.attach(stack, {
        api: apiStack.api,
        prefix: "/auth"
    })
}