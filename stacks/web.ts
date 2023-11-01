import { NextjsSite, StackContext, use } from "sst/constructs";
import { Account } from "./account";
import { Session } from "./session";
import { Transaction } from "./transaction";

export function Web({ stack }: StackContext) {

    const session = use(Session);
    const account = use(Account);
    const transaction = use(Transaction);

    const site = new NextjsSite(stack, "site", {
        customDomain: stack.stage === "prod" ? "finvo.net" : `${stack.stage}.finvo.net`,
        path: "frontend",
        environment: {
            NEXT_PUBLIC_API_URL: session.sessionApi.url,
            BASE_URL: session.sessionApi.url,
            NEXT_PUBLIC_ACCOUNTS_API_URL: account.accountsApi.url,
            NEXT_PUBLIC_TRANSACTIONS_API_URL: transaction.transactionApi.url,
        },
        buildCommand: "npx open-next@latest build",
    });

    site.attachPermissions([
        session.sessionApi, 
        account.accountsApi,
        transaction.transactionApi
    ]);

    stack.addOutputs({
        URL: site.url || "http://localhost:3000",
        BaseUrl: session.sessionApi.url
    })

    return {
        site
    }
}