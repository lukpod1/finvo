import dynamoDb from '../../../libs/dynamodb';
import middleware from '../../../libs/middleware';
import { Responses } from '../../../libs/response';

export async function retrieveTransaction({ table, keys }) {

    try {
        const response = await dynamoDb.get({
            TableName: table,
            Key: keys
        });
        return response.Item;
    } catch (error) {
        return Responses.NotFound(`Transaction with ID "${keys.id}" not found`);
    }
}

async function getTransactionById(event) {

    const { id, accountId } = event.pathParameters;

    try {

        const response = await dynamoDb.get({
            TableName: process.env.TRANSACTIONS_TABLE,
            Key: { id, accountId }
        });

        console.log(response);
        return Responses.OK(response.Item);
    } catch (error) {
        return Responses.InternalServerError(error);
    }
}

export const handler = middleware(getTransactionById);
