import { NextjsSite, StackContext, ViteStaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";

export function WebStack({ stack }: StackContext) {
    const api = use(ApiStack);

    const site = new ViteStaticSite(stack, "Site", {
        path: "web",
        environment: {
            VITE_APP_API_URL: api.api.url,
        }
    })

    stack.addOutputs({
        SITE: site.url,
        API_URL: api.api.url,
    })

    return {
        api,
        site
    };

}