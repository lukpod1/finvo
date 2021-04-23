import { v4 as uuid } from 'uuid';
import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { success, failure } from '../../../libs/response';
import createError from 'http-errors';

const createUser = async (event, context) => {

    const { username } = event.body;

    const user = {
        id: uuid(),
        username
    };

    try {
        await dynamoDb.put({
            TableName: 'local-Users',
            Item: user
        });
        return success(user);
    } catch (error) {
        failure(user);
        throw new createError.InternalServerError(error);
    }
};

export const handler = middleware(createUser);