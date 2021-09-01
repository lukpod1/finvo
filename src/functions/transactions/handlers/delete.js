import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import { retrieveTransaction } from './retrieve';
import { getAccountById } from './../../accounts/handlers/retrieve';
import { updateAmountAndBuildAccountForUpdate } from './../../accounts/handlers/update';

async function deleteTransaction(event, context) {

    const { id, accountId } = event.pathParameters;

    try {
        const transaction = await retrieveTransaction({
            table: process.env.TRANSACTIONS_TABLE,
            keys: { id, accountId }
        });

        const account = await getAccountById(accountId, transaction.userId);

        const response = await dynamoDb.delete({
            TableName: process.env.TRANSACTIONS_TABLE,
            Key: { id, accountId },
            ReturnValues: 'ALL_OLD'
        });

        console.log(`Transaction to delete: `, transaction);
        console.log(`Account: `, account);

        await updateAmountAndBuildAccountForUpdate(transaction, account);

        if (!response.Attributes) {
            Responses.NotFound(`Transaction with ID "${id}" not found`);
        }

        Responses.OK(response.Attributes);
    } catch (error) {
        Responses.InternalServerError(error);
    }
}

export const handler = middleware(deleteTransaction);