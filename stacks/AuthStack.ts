import { Auth, StackContext, use } from "@serverless-stack/resources";
import { ApiStack } from "./ApiStack";
import { WebStack } from "./WebStack";

export function AuthStack({ stack }: StackContext) {

    const api = use(ApiStack);
    const site = use(WebStack)
    const auth = new Auth(stack, "auth", {
        authenticator: {
            handler: "functions/auth.handler",
            bind: [site.site]
        }
    });

    auth.attach(stack, {
        api: api.api,
        prefix: "/auth"
    })
}