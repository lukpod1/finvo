import { NextjsSite, StackContext, use } from "sst/constructs";
import { API } from "./ApiStack";

export function FrontEnd({ stack }: StackContext) {
    
    const apiStack = use(API);

    const site = new NextjsSite(stack, "site", {
        path: "frontend",
        environment: {
            API_URL: apiStack.api.url,
        }
    })

    site.attachPermissions([apiStack.api])

    stack.addOutputs({
        URL: site.url || "http://localhost:3000",
    })
}