import dynamoDb from '../../../libs/dynamodb';
import {success} from '../../../libs/response';

export const handler = async (event, context) => {
    const { id } = event.pathParameters;
    const { userId } = event.body;
    
    const params = {
        TableName: process.env.ACCOUNTS_TABLE,
        Key: {id, userId}
    };

    const result = await dynamoDb.scan(params);
    return success(result.Items);
};