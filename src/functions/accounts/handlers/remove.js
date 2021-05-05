import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { success, failure } from '../../../libs/response';
import createError from 'http-errors';
// import { validateField } from '../../../libs/validateField';

const removeAccount = async (event, context) => {

    const { id } = event.pathParameters;
    const { userId } = event.body;

    try {
        const response = await dynamoDb.delete({
            TableName: process.env.ACCOUNTS_TABLE,
            Key: {id, userId}
        });

        if (!response.Attributes) {
            throw new createError.NotFound(`Account with ID "${id}" not found`);
        }

        return success(response.Attributes);
    } catch (error) {
        failure(error);
        throw new createError.InternalServerError(error);
    }
};

export const handler = middleware(removeAccount);