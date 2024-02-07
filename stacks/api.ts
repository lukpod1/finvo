import { Api, StackContext, use } from "sst/constructs";
import { Database } from "./database";
import { Secrets } from "./secrets";

export function API({ stack }: StackContext) {

	const { google } = use(Secrets);

	const api = new Api(stack, "api", {
		defaults: {
			function: {
				bind: [google.GOOGLE_CLIENT_ID],
			}
		},
		routes: {
			// SESSION
			"GET /session": "packages/functions/src/session.handler",
			// ACCOUNTS
			"GET /accounts": "packages/functions/src/accounts/findAll.handler",
			"POST /accounts": "packages/functions/src/accounts/create.handler",
			"GET /accounts/balance": "packages/functions/src/accounts/find.handler",
			"PUT /accounts/{id}": "packages/functions/src/accounts/update.handler",
			"DELETE /accounts/{id}/{userId}": "packages/functions/src/accounts/delete.handler",
			// TRANSACTIONS
			"GET /transactions": "packages/functions/src/transactions/findAll.handler",
			"POST /transactions": "packages/functions/src/transactions/create.handler",
			"PUT /transactions/{id}": "packages/functions/src/transactions/update.handler",
			"DELETE /transactions/{id}/{accountId}": "packages/functions/src/transactions/delete.handler",
		},
		// cors: {
		// 	allowCredentials: true,
		// 	allowHeaders: ["content-type"],
		// 	allowMethods: ["ANY"],
		// 	allowOrigins: ["http://localhost:5173", site.url!]
		// }
	});

	stack.addOutputs({
		ApiEndpoint: api.url,
	});

	return api
}
