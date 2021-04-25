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
        TableName: process.env.USERS_TABLE,
        Key: {id},
        UpdateExpression: "SET username = :username, email = :email, password = :password",
        ExpressionAttributeValues: {
            ":username": request?.username || user.username,
            ":email": request?.email || user.email,
            ":password": request?.password || user.password
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const response = await dynamoDb.update(params);
        return success(response.Attributes);
    } catch (error) {
        failure(user);
        throw new createError.InternalServerError(error);
    }
};

export const handler = middleware(updateUser);