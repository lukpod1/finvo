import { NextjsSite, StackContext, use } from "sst/constructs";
import { API } from "./ApiStack";

export function FrontEnd({ stack }: StackContext) {
    
    const api = use(API);

    const site = new NextjsSite(stack, "site", {
        path: "frontend",
        environment: {
            NEXT_PUBLIC_API_URL: api.api.url,
        },
        buildCommand: "npx open-next@latest build && npx next-sitemap",
    })

    stack.addOutputs({
        URL: site.url || "http://localhost:3000"
    })
}