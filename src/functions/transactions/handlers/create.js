import { v4 as uuid } from 'uuid';
import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { success, failure } from '../../../libs/response';
import createError from 'http-errors';
import { getAccountById } from '../../accounts/handlers/retrieve';
import { updateAmountAndBuildAccountForUpdate } from '../../accounts/handlers/update';

const createTransaction = async (event) => {

    let { amount, accountId, type, date, comment, userId } = event.body;

    date = new Date().toISOString().split('T')[0];

    let account = await getAccountById(accountId, userId);

    const transaction = {
        id: uuid(),
        amount,
        accountId,
        type,
        date,
        comment,
        userId
    };

    try {
        await dynamoDb.put({
            TableName: process.env.TRANSACTIONS_TABLE,
            Item: transaction
        });

        await updateAmountAndBuildAccountForUpdate(transaction, account);

        return success(transaction);
    } catch (error) {
        failure(transaction);
        throw new createError.InternalServerError(error);
    }
};

export const handler = middleware(createTransaction);