import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';

export async function getUserById(id) {

    try {

        const result = await dynamoDb.get({
            TableName: process.env.USERS_TABLE,
            Key: { id }
        });

        const user = result.Item;

        if (!user) {
            Responses.NotFound(`User with ID "${id}" not found!`);
        }

        return user;
    } catch (error) {
        Responses.InternalServerError(error);
    }

}
