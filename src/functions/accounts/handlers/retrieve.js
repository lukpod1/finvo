import dynamoDb from '../../../libs/dynamodb';
import createError from 'http-errors';
import dotenv from 'dotenv';

dotenv.config();

export const getAccountById = async (id, userId) => {
    let account = {};

    try {
        const result = await dynamoDb.get({
            TableName: process.env.ACCOUNTS_TABLE,
            Key: { id, userId }
        });

        account = result.Item;
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }

    if(!account) {
        throw new createError.NotFound(`Account with ID "${id}" not found!`);
    }

    return account;
};
