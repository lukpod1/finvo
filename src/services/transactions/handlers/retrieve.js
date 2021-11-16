import dynamoDb from '../../../libs/dynamodb';
import middleware from '../../../libs/middleware';
import { Responses } from '../../../libs/response';

export default async function retrieveTransaction({ table, keys }) {
    console.log(table, keys);
    let response = await dynamoDb.get({
        TableName: table,
        Key: keys
    });

    return response.Item;
}

async function getTransactionById(event) {

    const { id, accountId } = event.pathParameters;

    try {

        const response = retrieveTransaction({
            table: process.env.TRANSACTIONS_TABLE,
            keys: { id, accountId }
        });

        Responses.OK(response.Item);
    } catch (error) {
        Responses.InternalServerError(error);
    }
}

export const handler = middleware(getTransactionById);
