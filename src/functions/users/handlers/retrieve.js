import dynamoDb from '../../../libs/dynamodb';
import middleware from '../../../libs/middleware';
import createError from 'http-errors';
import { success, failure } from '../../../libs/response';

export const getUserById = async (id) => {
    let user = {};

    try {
        const result = await dynamoDb.get({
            TableName: process.env.USERS_TABLE,
            Key: {id}
        });

        user = result.Item;
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    if(!user) {
        throw new createError.NotFound(`User with ID "${id}" not found!`);
    }

    return user;
}

const retrive = (event, context) => {
    const {id} = event.pathParameters;
    const user = await getUserById(id);

    return success(user);
}

export const handler = middleware(retrive);