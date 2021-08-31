import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';

export async function handler() {
    const params = {
        TableName: process.env.USERS_TABLE
    };

    const result = await dynamoDb.scan(params);
    return Responses.OK(result.Items);
};