import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { success, failure } from '../../../libs/response';
import createError from 'http-errors';
import { getTransactionById } from './retrieve';

const deleteTransaction = async (event, context) => {

    const { id } = event.pathParameters;
    const { userId } = event.body;

    try {
        // let transaction = await getTransactionById()

        const response = await dynamoDb.delete({
            TableName: process.env.TRANSACTIONS_TABLE,
            Key: {id, userId}
        });

        if (!response.Attributes) {
            throw new createError.NotFound(`Transaction with ID "${id}" not found`);
        }

        return success(response.Attributes);
    } catch (error) {
        failure(error);
        throw new createError.InternalServerError(error);
    }
};

export const handler = middleware(deleteTransaction);