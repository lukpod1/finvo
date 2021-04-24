import { v4 as uuid } from 'uuid';
import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { success, failure } from '../../../libs/response';
import createError from 'http-errors';
import { getUserById } from './retrieve';

const updateUser = async (event, context) => {

    const { id } = event.pathParameters;
    const request = event.body;

    const user = await getUserById(id);

    const params = {
        TableName: process.env.UERS_TABLE,
        Key: {id},
        UpdateExpression: "SET username = :username"
    }

    // try {
    //     await dynamoDb.put({
    //         TableName: 'local-Users',
    //         Item: user
    //     });
    //     return success(user);
    // } catch (error) {
    //     failure(user);
    //     throw new createError.InternalServerError(error);
    // }
};

export const handler = middleware(updateUser);