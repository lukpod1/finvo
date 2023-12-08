import { Config, StackContext } from "sst/constructs";

export function Secrets({ stack }: StackContext) {
	return {
		google: Config.Secret.create(stack, "GOOGLE_CLIENT_ID"),
		database: Config.Secret.create(
      stack,
      "PLANETSCALE_USERNAME",
      "PLANETSCALE_PASSWORD",
    ),
	}
}