import { Auth, Config, StackContext } from "sst/constructs";

export function AUTH({ stack }: StackContext) {

    const auth = new Auth(stack, "auth", {
        authenticator: {
            handler: "packages/functions/src/authenticator.handler",
        }
    });
}