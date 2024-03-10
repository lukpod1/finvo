import { ApiHandler, useQueryParam } from "sst/node/api";
import { getAccountsByUserId } from "@finvo/core/account";
import { getTransactionsByUserId } from "@finvo/core/transaction";

export async function getAccounts(userId: string) {
	return await getAccountsByUserId(userId);
}

async function getTransactions(userId: string) {
	const result = await getTransactionsByUserId(userId);

	const totalIncomes = result.reduce((total, item) => {
		if (item.type === "income" && !Number.isNaN(Number(item.amount))) {
			return total + Number(item.amount);
		}
		return total;
	}, 0) ?? 0;

	const totalExpenses = result.reduce((total, item) => {
		if (item.type === "expense" && !Number.isNaN(Number(item.amount))) {
			return total + Number(item.amount);
		}
		return total;
	}, 0) ?? 0;

	return { totalIncomes, totalExpenses };
}

export const handler = ApiHandler(async (event) => {
	const userId = useQueryParam("userId") as string;

	try {
		const accounts = await getAccounts(userId);

		const totalBalance = accounts.reduce((total, account) => {
			return total + account.balance;
		}, 0) ?? 0;

		const { totalIncomes, totalExpenses } = await getTransactions(userId);

		return {
			statusCode: 200,
			body: JSON.stringify({
				totalBalance,
				totalIncomes,
				totalExpenses,
			}),
		};
	} catch (error) {
		console.log(error);
		return {
			statusCode: 500,
			body: JSON.stringify(error),
		};
	}
});