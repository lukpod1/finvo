import { Api, StackContext, use } from "sst/constructs";
import { Database } from "./DatabaseStack";

export function Session({ stack }: StackContext) {

    const dbUsers = use(Database)

    const sessionApi = new Api(stack, "sessionApi", {
        defaults: {
            function: {
                bind: [dbUsers.dbUsers]
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