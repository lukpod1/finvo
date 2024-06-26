import { Api, StackContext, use } from "sst/constructs";
import { Secrets } from "./secrets";

const DEV = "http://dev.finvo.net";
const PROD = "http://finvo.net";

export function API({ stack }: StackContext) {

	const { google, neonDB } = use(Secrets);

	const api = new Api(stack, "api", {
		defaults: {
			function: {
				bind: [google.GOOGLE_CLIENT_ID, neonDB.NEON_DB_URL],
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
			"DELETE /accounts/{id}": "packages/functions/src/accounts/delete.handler",
			// TRANSACTIONS
			"GET /transactions": "packages/functions/src/transactions/findAll.handler",
			"POST /transactions": "packages/functions/src/transactions/create.handler",
			"PUT /transactions/{id}": "packages/functions/src/transactions/update.handler",
			"DELETE /transactions/{id}/{accountId}": "packages/functions/src/transactions/delete.handler",
		},
		cors: {
			allowCredentials: true,
			allowHeaders: ["content-type"],
			allowMethods: ["GET", "POST", "PUT","DELETE"],
			allowOrigins: ["http://localhost:3000", DEV, PROD],
		},
	});

	stack.addOutputs({
		ApiEndpoint: api.url,
	});

	return api
}
