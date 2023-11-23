import { Account, AccountDTO } from "@finvo/core/domain/account";
import { ApiHandler, useJsonBody, usePathParam } from "sst/node/api";

export const handler = ApiHandler(async () => {

	try {
		const id = usePathParam('id');
		const { name, userId, balance }: AccountDTO = useJsonBody();
		const account = new Account(id!, name, userId, balance);

		const accountResult = await Account.getAccountById(id!, userId);

		if (!accountResult) {
			return {
				statusCode: 404,
				body: JSON.stringify({ message: "Account not found" }),
			};
		}

		await account.updateName(name);

		return {
			statusCode: 200,
			body: JSON.stringify(account),
		};
	} catch (error: any) {
		console.error(error);

		return {
			statusCode: error.status || 500,
			body: JSON.stringify({
				message: error.message || 'Internal Server Error',
			}),
		};
	}
});