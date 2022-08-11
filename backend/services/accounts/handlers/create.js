import { v4 as uuid } from 'uuid';
import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';

class Account {
    constructor(id, user, name, balance) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.balance = balance;
    }
}

async function createAccount(event) {

    const account = new Account(
        uuid(),
        event.requestContext.authorizer,
        event.body.data.name,
        event.body.data.balance
    );

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