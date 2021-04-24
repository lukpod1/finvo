import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { success, failure } from '../../../libs/response';
import createError from 'http-errors';
import { getUserById } from './retrieve';

const updateUser = async (event, context) => {

    const { id } = event.pathParameters;
    const { username, email, password } = event.body;

    const user = getUserById(id);

    const params = {
        TableName: process.env.UERS_TABLE,
        Key: {id},
        UpdateExpression: `
            SET username = :username,
                email = :email,
                password = :password,
        `,
        ExpressionAttributes: {
            ":username": username || null,
            ":email": email || null,
            ":password": password || null
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