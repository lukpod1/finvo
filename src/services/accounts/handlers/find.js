import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';

export async function handler(event) {
    const { id } = event.pathParameters;
    const { userId } = event.body;

    const params = {
        TableName: process.env.ACCOUNTS_TABLE,
        Key: { id, userId }
    };

    const result = await dynamoDb.scan(params);

    Responses.OK(result.Items);
}