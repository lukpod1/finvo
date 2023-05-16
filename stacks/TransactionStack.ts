import { Api, StackContext, use } from "sst/constructs";
import { Database } from "./DatabaseStack";

export function Transaction({ stack }: StackContext) {
    const { dbAccounts, dbTransactions } = use(Database)

    const transactionApi = new Api(stack, "transactionApi", {
        defaults: {
            function: {
                bind: [dbAccounts, dbTransactions]
            }
        },
        routes: {
            "GET /transactions": "packages/functions/src/transactions/findAll.handler",
            "POST /transactions": "packages/functions/src/transactions/create.handler",
            "PUT /transactions/{id}": "packages/functions/src/transactions/update.handler",
        },
    });

    stack.addOutputs({
        TransactionEndpoint: transactionApi.url,
    });

    return {
        transactionApi
    };
}