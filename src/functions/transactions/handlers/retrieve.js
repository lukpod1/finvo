import dynamoDb from '../../../libs/dynamodb';
import createError from 'http-errors';
import middleware from '../../../libs/middleware';
import { success } from '../../../libs/response';

export const getTransactionById = async (event) => {

    const { id, accountId } = event.pathParameters;

    try {
        const response = await dynamoDb.get({
            TableName: process.env.TRANSACTIONS_TABLE,
            Key: { id, accountId }
        });

        return success(response.Item);
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
};

export const handler = middleware(getTransactionById);
