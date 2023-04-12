import { NextjsSite, StackContext, use } from "sst/constructs";
import { Accounts } from "./AccountStack";
import { Session } from "./SessionStack";

export function FrontEnd({ stack }: StackContext) {

    const sessionStack = use(Session);
    const accountStack = use(Accounts);

    const site = new NextjsSite(stack, "site", {
        path: "frontend",
        environment: {
            NEXT_PUBLIC_API_URL: sessionStack.sessionApi.url,
            BASE_URL: sessionStack.sessionApi.url,
            NEXT_PUBLIC_ACCOUNTS_API_URL: accountStack.accountsApi.url,
        },
        buildCommand: "npx open-next@0.7.0 build",
    });

    site.attachPermissions([
        sessionStack.sessionApi, 
        accountStack.accountsApi
    ]);

    stack.addOutputs({
        URL: site.url || "http://localhost:3000",
        BaseUrl: sessionStack.sessionApi.url
    })

    return {
        site
    }
}