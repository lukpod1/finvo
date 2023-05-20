import { Auth, Config, StackContext, use } from "sst/constructs";
import { FrontEnd } from "./FrontEndStack";
import { Session } from "./SessionStack";

export function Authentication({ stack }: StackContext) {

    const sessionStack = use(Session);
    const frontEndStack = use(FrontEnd);

    const GOOGLE_CLIENT_ID = new Config.Secret(stack, "GOOGLE_CLIENT_ID");

    const auth = new Auth(stack, "auth", {
        authenticator: {
            handler: "packages/functions/src/auth.handler",
            bind: [sessionStack.sessionApi, GOOGLE_CLIENT_ID],
            environment: {
                SITE_URL: frontEndStack.site.url || "http://localhost:3000",
            },
        }
    });

    sessionStack.sessionApi.bind([GOOGLE_CLIENT_ID])

    auth.attach(stack, {
        api: sessionStack.sessionApi,
        prefix: "/auth"
    })
}