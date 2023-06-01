import { NextjsSite, StackContext, use } from "sst/constructs";
import { Accounts } from "./AccountStack";
import { Session } from "./SessionStack";
import { Transaction } from "./TransactionStack";

export function FrontEnd({ stack }: StackContext) {

    const sessionStack = use(Session);
    const accountStack = use(Accounts);
    const transactionStack = use(Transaction);

    const site = new NextjsSite(stack, "site", {
        customDomain: {
            domainName: stack.stage === "prod" ? "finvo.net" : `${stack.stage}.finvo.net`,
            domainAlias: stack.stage === "prod" ? "www.finvo.net" : undefined,
        },
        path: "frontend",
        environment: {
            NEXT_PUBLIC_API_URL: sessionStack.sessionApi.url,
            BASE_URL: sessionStack.sessionApi.url,
            NEXT_PUBLIC_ACCOUNTS_API_URL: accountStack.accountsApi.url,
            NEXT_PUBLIC_TRANSACTIONS_API_URL: transactionStack.transactionApi.url,
        },
        buildCommand: "npx open-next@0.7.0 build",
    });

    site.attachPermissions([
        sessionStack.sessionApi, 
        accountStack.accountsApi,
        transactionStack.transactionApi
    ]);

    stack.addOutputs({
        URL: site.url || "http://localhost:3000",
        BaseUrl: sessionStack.sessionApi.url
    })

    return {
        site
    }
}