import dynamoDb from '../../../libs/dynamodb';
import {success} from '../../../libs/response';

export const handler = async (event, context) => {
    const params = {
        TableName: process.env.USERS_TABLE
    };

    const result = await dynamoDb.scan(params);
    return success(result.Items);
};