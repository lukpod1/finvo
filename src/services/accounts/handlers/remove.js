import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';

async function removeAccount(event, context) {

    const { id, userId } = event.pathParameters;

    try {
        const response = await dynamoDb.delete({
            TableName: process.env.ACCOUNTS_TABLE,
            Key: { id, userId },
            ReturnValues: "ALL_OLD"
        });

        if (!response.Attributes) {
            Responses.NotFound(`Account with ID "${id}" not found`);
        }

        Responses.OK(response.Attributes);
    } catch (error) {
        Responses.InternalServerError(error);
    }
}

export const handler = middleware(removeAccount);