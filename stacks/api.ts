import { Api, StackContext, use } from "sst/constructs";
import { Database } from "./database";
import { Secrets } from "./secrets";

export function API({ stack }: StackContext) {

	const { google } = use(Secrets);
	const database = use(Database);

	const api = new Api(stack, "api", {
		defaults: {
			function: {
				bind: [...Object.values(database), google.GOOGLE_CLIENT_ID],
			}
		},
		routes: {
			"GET /session": "packages/functions/src/session.handler",
			"GET /accounts": "packages/functions/src/accounts/findAll.handler",
			"POST /accounts": "packages/functions/src/accounts/create.handler",
			"GET /accounts/balance": "packages/functions/src/accounts/find.handler",
			"PUT /accounts/{id}": "packages/functions/src/accounts/update.handler",
			"DELETE /accounts/{id}/{userId}": "packages/functions/src/accounts/delete.handler",
			"GET /transactions": "packages/functions/src/transactions/findAll.handler",
			"POST /transactions": "packages/functions/src/transactions/create.handler",
			"PUT /transactions/{id}": "packages/functions/src/transactions/update.handler",
			"DELETE /transactions/{id}/{accountId}": "packages/functions/src/transactions/delete.handler",
		},
	});

	stack.addOutputs({
		ApiEndpoint: api.url,
	});

	return api
}