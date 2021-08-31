import dynamoDb from '../../../libs/dynamodb';
import { success } from '../../../libs/response';
import createError from 'http-errors';
import { validateField } from '../../../libs/validateField';
import middleware from '../../../libs/middleware';
import { Responses } from '../../../libs/response';

async function signIn(event, context) {

    const { email, password } = event.body;

    const emailIsValid = await validateField({
        table: process.env.USERS_TABLE,
        column: "email",
        field: email
    });

    const passwordIsValid = await validateField({
        table: process.env.USERS_TABLE,
        column: "password",
        field: password
    });

    if (!emailIsValid || !passwordIsValid) {
        Responses.NotFound(`Email or password is invalid.`);
    }

    try {
        console.log(process.env.USERS_TABLE);
        console.log(email);
        console.log(password);
        const response = await dynamoDb.scan({
            TableName: process.env.USERS_TABLE,
            FilterExpression: "email = :email AND password = :password",
            ExpressionAttributeValues: {
                ":email": email,
                ":password": password
            }
        });

        Responses.OK(response.Items[0]);
    } catch (error) {
        Responses.NotFound(`User does not exist.`);
    }
}

export const handler = middleware(signIn);