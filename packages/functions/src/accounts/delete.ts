import { fromID } from "@finvo/core/account";
import { Account } from "@finvo/core/domain/account";
import { ApiHandler, usePathParams } from "sst/node/api";

export const handler = ApiHandler(async () => {
	try {
		const { id } = usePathParams();

		const account = await Account.getAccountById(id!);

		if (!account) {
			return {
				statusCode: 404,
				body: JSON.stringify({ message: "Account not found" }),
			};
		}

		await account.delete();

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: `Account ${id} deleted successfully`,
			}),
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