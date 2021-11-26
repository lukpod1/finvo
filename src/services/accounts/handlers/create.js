import { v4 as uuid } from 'uuid';
import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';

async function createAccount(event) {

    const { name, balance, userId } = event.body;

    const account = {
        id: uuid(),
        userId,
        name,
        balance
    };

    try {
        await dynamoDb.put({
            TableName: process.env.ACCOUNTS_TABLE,
            Item: account
        });
        return Responses.OK(account);
    } catch (error) {
        return Responses.InternalServerError(error);
    }
}

export const handler = middleware(createAccount);