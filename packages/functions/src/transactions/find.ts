import { getTransactionsByUserId } from "@finvo/core/transaction";

export async function getTransactions(userId: string) {
	return await getTransactionsByUserId(userId);
}
