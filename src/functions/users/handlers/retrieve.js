import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import middleware from '../../../libs/middleware';

export async function getUserById(event) {

    const { id } = event.pathParameters;

    try {

        const result = await dynamoDb.get({
            TableName: process.env.USERS_TABLE,
            Key: { id }
        });

        const user = result.Item;

        if (!user) {
            Responses.NotFound(`User with ID "${id}" not found!`);
        }

        Responses.OK(user);
    } catch (error) {
        Responses.InternalServerError(error);
    }

}

export const handler = middleware(getUserById);