import dynamoDb from '../../../libs/dynamodb';
import createError from 'http-errors';
import middleware from '../../../libs/middleware';
import { success } from '../../../libs/response';

export const retrieveTransaction = async ({ table, keys }) => {
    console.log(table, keys);
    let response = await dynamoDb.get({
        TableName: table,
        Key: keys
    });

    return response.Item;
};

const getTransactionById = async (event) => {

    const { id, accountId } = event.pathParameters;

    try {

        const response = await retrieveTransaction({
            table: process.env.TRANSACTIONS_TABLE,
            keys: { id, accountId }
        });

        return success(response.Item);
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
};

export const handler = middleware(getTransactionById);
