import { Auth, Config, StackContext, use } from "sst/constructs";
import { API } from "./MyStack";

export function AUTH({ stack }: StackContext) {

    const api = use(API);

    const auth = new Auth(stack, "auth", {
        authenticator: {
            handler: "packages/functions/src/auth.handler",
            bind: [api.api]
        }
    });

    auth.attach(stack, {
        api: api.api,
        prefix: "/auth"
    })
}