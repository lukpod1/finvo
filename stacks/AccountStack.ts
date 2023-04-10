import { Api, StackContext, use } from "sst/constructs";
import { Database } from "./DatabaseStack";

export function Accounts({ stack }: StackContext) {
    const { dbAccounts } = use(Database)

    const accountsApi = new Api(stack, "accountsApi", {
        defaults: {
            function: {
                bind: [dbAccounts]
            }
        },
        routes: {
            "GET /accounts": "packages/functions/src/accounts/create.handler"
        },
    });

    stack.addOutputs({
        AccountsEndpoint: accountsApi.url,
    });

    return {
        accountsApi
    };
}