import { NextjsSite, StackContext, StaticSite, use } from "sst/constructs";
import { API } from "./api";

export function Web({ stack }: StackContext) {

	const api = use(API);

	// const site = new NextjsSite(stack, "site", {
	// 	customDomain:
	// 		stack.stage === "prod" ? "finvo.net" : `${stack.stage}.finvo.net`,
	// 	path: "packages/frontend",
	// 	environment: {
	// 		NEXT_PUBLIC_API_URL: api.url,
	// 	},
	// 	buildCommand: "npx open-next@0.7.0 build",
	// });

	const site = new StaticSite(stack, "vue", {
		path: "packages/web/finvo",
		customDomain:
			stack.stage === "prod" ? "finvo.net" : `${stack.stage}.finvo.net`,
		environment: {
			VITE_APP_API_URL: api.url
		}
	});

	api.setCors({
		allowCredentials: true,
		allowHeaders: ["content-type"],
		allowMethods: ["ANY"],
		allowOrigins: ["http://localhost:5173", site.url]
	});


	stack.addOutputs({
		URL: site.url || "http://localhost:5173",
	})

	return {
		site
	}
}