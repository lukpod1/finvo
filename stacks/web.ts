import { NextjsSite, StackContext, use } from "sst/constructs";
import { API } from "./api";
import { DNS } from "./dns";

export function Web({ stack }: StackContext) {
	const dns = use(DNS);
	const api = use(API);

	const site = new NextjsSite(stack, "site", {
		customDomain: {
			domainName: dns.domain,
			hostedZone: dns.zone?.zoneName
		},
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
