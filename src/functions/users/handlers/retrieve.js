import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';

export const getUserById = async (id) => {
    let user = {};

    try {
        const result = await dynamoDb.get({
            TableName: process.env.USERS_TABLE,
            Key: { id }
        });

        user = result.Item;
    } catch (error) {
        return Responses.InternalServerError(error);
    }

    if(!user) {
        return Responses.NotFound(`User with ID "${id}" not found!`);
    }

    return user;
};
