import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import { getUserById } from './retrieve';
import { validateField } from '../../../libs/validateField';

async function updateUser(event, context) {

    const { id } = event.pathParameters;

    const { username, email, password } = event.body;

    const { body } = await getUserById(id);

    if (username && username !== body.username) {
        const usernameIsValid = await validateField({
            table: process.env.USERS_TABLE,
            column: "username",
            field: username
        });

        if (usernameIsValid) {
            return Responses.Conflict(`The "${username}" already exists`);
        }
    }

    if (email && email !== body.email) {
        const emailIsValid = await validateField({
            table: process.env.USERS_TABLE,
            column: "email",
            field: email
        });

        if (emailIsValid) {
            return Responses.Conflict(`The "${email}" already exists`);
        }
    }


    const params = {
        TableName: process.env.USERS_TABLE,
        Key: { id },
        UpdateExpression: "SET username = :username, email = :email, password = :password",
        ExpressionAttributeValues: {
            ":username": username || body.username,
            ":email": email || body.email,
            ":password": password || body.password
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const response = await dynamoDb.update(params);
        return Responses.OK(response.Attributes);
    } catch (error) {
        return Responses.InternalServerError(error);
    }

}

export const handler = middleware(updateUser);