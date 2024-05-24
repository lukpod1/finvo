import { Account } from "@finvo/core/domain/account";
import { Transaction, TransactionDTO, TransactionType } from "@finvo/core/domain/transaction";
import { ApiHandler, useJsonBody, usePathParam } from "sst/node/api";

export const handler = ApiHandler(async () => {

	try {
		const id = usePathParam('id');
		const { amount, date, description, type, accountId, userId }: TransactionDTO = useJsonBody();
		const transaction = new Transaction(id!, amount, date, description, type as TransactionType, accountId, userId);

		await Account.updateAccountBalance(transaction);

		await transaction.update();

		return {
			statusCode: 200,
			body: JSON.stringify(transaction),
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