import { NextjsSite, StackContext, use } from "sst/constructs";
import { API } from "./MyStack";

export function FrontEnd({ stack }: StackContext) {
    
    const api = use(API);

    const site = new NextjsSite(stack, "site", {
        path: "frontend",
        environment: {
            NEXT_PUBLIC_API_URL: api.api.url,
        }
    })

    // stack.addOutputs({
    //     URL: site.url as string,
    // })
}