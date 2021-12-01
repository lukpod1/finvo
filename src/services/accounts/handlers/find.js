import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import middleware from '../../../libs/middleware';

export async function find(event) {
    const { id, userId } = event.pathParameters;

    const params = {
        TableName: process.env.ACCOUNTS_TABLE,
        Key: { id, userId }
    };

    try {
        const result = await dynamoDb.scan(params);
        return Responses.OK(result.Items);
    } catch(error) {
        return Responses.InternalServerError(error);
    }

}

export const handler = middleware(find);
