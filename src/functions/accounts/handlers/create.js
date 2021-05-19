import { v4 as uuid } from 'uuid';
import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { success, failure } from '../../../libs/response';
import createError from 'http-errors';

const createAccount = async (event, context) => {

    const { name, balance, userId } = event.body;

    const account = {
        id: uuid(),
        userId,
        name,
        balance
    };

    try {
        await dynamoDb.put({
            TableName: process.env.ACCOUNTS_TABLE,
            Item: account
        });
        return success(account);
    } catch (error) {
        failure(account);
        throw new createError.InternalServerError(error);
    }
};

export const handler = middleware(createAccount);