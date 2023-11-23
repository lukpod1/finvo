import { Api, StackContext, use } from "sst/constructs";
import { Database } from "./database";

export function Account({ stack }: StackContext) {
	const { dbAccounts, dbTransactions } = use(Database)

	const accountsApi = new Api(stack, "accountsApi", {
		defaults: {
			function: {
				bind: [dbAccounts, dbTransactions]
			}
		},
		routes: {
			"GET /accounts": "packages/functions/src/accounts/findAll.handler",
			"POST /accounts": "packages/functions/src/accounts/create.handler",
			"GET /accounts/balance": "packages/functions/src/accounts/find.handler",
			"PUT /accounts/{id}": "packages/functions/src/accounts/update.handler",
			"DELETE /accounts/{id}/{userId}": "packages/functions/src/accounts/delete.handler",
		},
	});

	stack.addOutputs({
		AccountsEndpoint: accountsApi.url,
	});

	return {
		accountsApi
	};
}