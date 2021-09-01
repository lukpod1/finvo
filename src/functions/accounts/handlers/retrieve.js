import dynamoDb from '../../../libs/dynamodb';
import dotenv from 'dotenv';
import { Responses } from '../../../libs/response';

dotenv.config();

export async function getAccountById(id, userId) {

    try {
        const result = await dynamoDb.get({
            TableName: process.env.ACCOUNTS_TABLE,
            Key: { id, userId }
        });

        let account = result.Item;

        if (!account) {
            Responses.NotFound(`Account with ID "${id}" not found!`);
        }

        return account;
    } catch (error) {
        console.error(error);
        Responses.InternalServerError(error);
    }

}
