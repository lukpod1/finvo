import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { success, failure } from '../../../libs/response';
import createError from 'http-errors';
import { getUserById } from './retrieve';
import { validateField } from '../../../libs/validateField';

const updateUser = async (event, context) => {

    const { id } = event.pathParameters;

    const {username, email, password} = event.body;

    const user = await getUserById(id);

    if(username && username !== user.username) {
        const usernameIsValid = await validateField({
            table: process.env.USERS_TABLE,
            column: "username",
            field: username
        });

        if(usernameIsValid) {
            throw new createError.Conflict(`The "${username}" already exists`);
        }
    }

    if(email && email !== user.email) {
        const emailIsValid = await validateField({
            table: process.env.USERS_TABLE,
            column: "email",
            field: email
        });

        if(emailIsValid) {
            throw new createError.Conflict(`The "${email}" already exists`);
        }
    }


    const params = {
        TableName: process.env.USERS_TABLE,
        Key: {id},
        UpdateExpression: "SET username = :username, email = :email, password = :password",
        ExpressionAttributeValues: {
            ":username": username || user.username,
            ":email": email || user.email,
            ":password": password || user.password
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