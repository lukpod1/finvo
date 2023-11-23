import { ApiHandler, usePathParams } from "sst/node/api";
import { Transaction } from "@finvo/core/domain/transaction";
import { Account } from "@finvo/core/domain/account";


export const handler = ApiHandler(async () => {
	try {
		const { id, accountId } = usePathParams();

		const transaction = await Transaction.retrieve(id!, accountId!);

		if (!transaction) {
			return {
				statusCode: 404,
				body: JSON.stringify({
					message: `Transaction ${id} not found`,
				}),
			};
		}

		await transaction.delete();

		transaction.amount *= -1
		await Account.updateBalance(transaction);

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: `Transaction ${id} deleted successfully`,
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