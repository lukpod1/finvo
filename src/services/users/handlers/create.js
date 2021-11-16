import { v4 as uuid } from 'uuid';
import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import { validateField } from '../../../libs/validateField';
import { hash } from "../../../libs/encryption";

async function createUser(event) {

    const { username, email, password } = event.body;
    console.log('body request:', event.body);

    const usernameIsValid = await validateField({
        table: process.env.USERS_TABLE,
        column: "username",
        field: username
    });

    if (usernameIsValid) {
        return Responses.Conflict(`The "${username}" already exists`);
    }

    const emailIsValid = await validateField({
        table: process.env.USERS_TABLE,
        column: "email",
        field: email
    });

    if (emailIsValid) {
        return Responses.Conflict(`The "${email}" already exists`);
    }

    const hashedPassword = await hash(password);

    const user = {
        id: uuid(),
        username,
        email,
        password: hashedPassword,
    };

    try {
        await dynamoDb.put({
            TableName: process.env.USERS_TABLE,
            Item: user
        });

        return Responses.OK({
            message: "User created with success",
            createdUser: user.email
        });
    } catch (error) {
        return Responses.InternalServerError(error);
    }
}

export const handler = middleware(createUser);
