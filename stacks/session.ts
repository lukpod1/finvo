import { Api, StackContext, use } from "sst/constructs";
import { Database } from "./database";
import { Secrets } from "./secrets";

export function Session({ stack }: StackContext) {

    const { google } = use(Secrets);
    const { dbUsers } = use(Database)

    const sessionApi = new Api(stack, "sessionApi", {
        defaults: {
            function: {
                bind: [dbUsers, google.GOOGLE_CLIENT_ID]
            }
        },
        routes: {
            "GET /session": "packages/functions/src/session.handler"
        },
    });

    stack.addOutputs({
        SessionApiEndpoint: sessionApi.url,
    });

    return {
        sessionApi
    }
};