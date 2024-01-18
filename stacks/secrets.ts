import { Config, StackContext } from "sst/constructs";

export function Secrets({ stack }: StackContext) {
	return {
		google: Config.Secret.create(stack, "GOOGLE_CLIENT_ID"),
    neonDB: Config.Secret.create(stack, "NEON_DB_URL")
	}
}