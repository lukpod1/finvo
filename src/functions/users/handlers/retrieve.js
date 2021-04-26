import dynamoDb from '../../../libs/dynamodb';
import createError from 'http-errors';

export const getUserById = async (id) => {
    let user = {};

    try {
        const result = await dynamoDb.get({
            TableName: process.env.USERS_TABLE,
            Key: { id },
            ProjectionExpression: "id, username"
        });

        user = result.Item;
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    if(!user) {
        throw new createError.NotFound(`User with ID "${id}" not found!`);
    }

    return user;
};
