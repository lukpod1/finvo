import { NextjsSite, StackContext, use } from "sst/constructs";
import { API } from "./api";
import { DNS } from "./dns";

export function Web({ stack }: StackContext) {
	const api = use(API);

	const site = new NextjsSite(stack, "site", {
		customDomain:
		stack.stage === "prod" ? "finvo.net" : `${stack.stage}.finvo.net`,
	 	path: "packages/frontend",
	 	environment: {
	 		NEXT_PUBLIC_API_URL: api.url,
	 	},
	});

	stack.addOutputs({
		URL: site.url || "http://localhost:3000",
	})

	return {
		site
	}
}
