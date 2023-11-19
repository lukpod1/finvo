import { Auth as STTAuth, Config, StackContext, use } from "sst/constructs";
import { Web } from "./web";
import { Session } from "./session";

export function Auth({ stack }: StackContext) {

    const session = use(Session);
    const web = use(Web);

    const GOOGLE_CLIENT_ID = new Config.Secret(stack, "GOOGLE_CLIENT_ID");

    const auth = new STTAuth(stack, "auth", {
        authenticator: {
            handler: "packages/functions/src/auth.handler",
            bind: [session.sessionApi, GOOGLE_CLIENT_ID],
            environment: {
                //SITE_URL: web.site.url || "http://localhost:3000",
                FRONTEND_URL: web.finvoVue.url || "http://localhost:5173"
            },
        }
    });

    session.sessionApi.bind([GOOGLE_CLIENT_ID])

    auth.attach(stack, {
        api: session.sessionApi,
        prefix: "/auth"
    })
}
