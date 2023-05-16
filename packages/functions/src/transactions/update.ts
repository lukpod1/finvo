import { Account } from "@finance-service/core/domain/account";
import { Transaction, TransactionDTO, TransactionType } from "@finance-service/core/domain/transaction";
import { ApiHandler, useJsonBody, usePathParam } from "sst/node/api";

export const handler = ApiHandler(async () => {

    try {
        const id = usePathParam('id');
        const { amount, date, description, type, accountId, userId }: TransactionDTO = useJsonBody();
        const transaction = new Transaction(id!, amount, date, description, type as TransactionType, accountId, userId);

        // Get the current transaction data before updating
        const transactionResult = await Transaction.retrieve(id!, accountId);

        // fix this 
        if (!transactionResult) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Transaction not found" }),
            };
        }

        const amountDifference = transaction.amount - transactionResult.amount;

        if (amountDifference !== 0) {
            await Account.updateBalance(amountDifference, accountId, userId);
        }

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