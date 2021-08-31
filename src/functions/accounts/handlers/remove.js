import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import createError from 'http-errors';

const removeAccount = async (event, context) => {

    const { id, userId } = event.pathParameters;

    try {
        const response = await dynamoDb.delete({
            TableName: process.env.ACCOUNTS_TABLE,
            Key: {id, userId},
            ReturnValues: "ALL_OLD"
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