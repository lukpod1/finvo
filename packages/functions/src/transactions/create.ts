import { ApiHandler, useJsonBody } from "sst/node/api";
import { Transaction, TransactionDTO, TransactionType } from "@finvo/core/domain/transaction";
import { randomUUID } from "crypto";
import * as yup from "yup";
import { Account } from "@finvo/core/domain/account";

const schema = yup.object().shape({
    amount: yup.number().required(),
    date: yup.string().required(),
    description: yup.string().required(),
    type: yup.string().oneOf<TransactionType>(['income', 'expense']).required(),
    accountId: yup.string().required(),
    userId: yup.string().required(),
});

export const handler = ApiHandler(async () => {
    try {
        const { amount, date, description, type, accountId, userId }: TransactionDTO = await schema.validate(useJsonBody());
        const transaction = new Transaction(randomUUID(), amount, date, description, type as TransactionType , accountId, userId);
        
        await Account.updateBalance(transaction);

        await Transaction.save(transaction);

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