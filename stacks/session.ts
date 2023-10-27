import { Api, StackContext, use } from "sst/constructs";
import { Database } from "./database";

export function Session({ stack }: StackContext) {

    const { dbUsers } = use(Database)

    const sessionApi = new Api(stack, "sessionApi", {
        defaults: {
            function: {
                bind: [dbUsers]
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