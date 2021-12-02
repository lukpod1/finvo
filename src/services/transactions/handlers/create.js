import { v4 as uuid } from 'uuid';
import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import { getAccountById } from '../../accounts/handlers/retrieve';
import { updateAmountAndBuildAccountForUpdate } from '../../accounts/handlers/update';

async function createTransaction(event) {

    const { amount, accountId, type, timestamp, comment, userId } = event.body;

    try {
        let account = await getAccountById(accountId, userId);

        const transaction = {
            id: uuid(),
            amount,
            accountId,
            type,
            timestamp:  new Date().toISOString().split('T')[0],
            comment,
            userId
        };

        await updateAmountAndBuildAccountForUpdate(transaction, account);

        console.log(process.env.TRANSACTIONS_TABLE);
        await dynamoDb.put({
            TableName: process.env.TRANSACTIONS_TABLE,
            Item: transaction
        });

        return Responses.OK(transaction);
    } catch (error) {
        return Responses.InternalServerError(error);
    }
}

export const handler = middleware(createTransaction);
