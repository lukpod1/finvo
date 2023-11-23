import { Auth as STTAuth, Config, StackContext, use } from "sst/constructs";
import { Web } from "./web";
import { Session } from "./session";
import { Secrets } from "./secrets";

export function Auth({ stack }: StackContext) {

    const { google } = use(Secrets);
    const session = use(Session);
    const web = use(Web);

    const auth = new STTAuth(stack, "auth", {
        authenticator: {
            handler: "packages/functions/src/auth.handler",
            bind: [session.sessionApi, google.GOOGLE_CLIENT_ID],
            environment: {
                SITE_URL: web.site.url || "http://localhost:3000",
            },
        }
    });

    auth.attach(stack, {
        api: session.sessionApi,
        prefix: "/auth"
    })
}
