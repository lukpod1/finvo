import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import { retrieveTransaction } from './retrieve';
import { getAccountById } from './../../accounts/handlers/retrieve';
import { updateAmountAndBuildAccountForUpdate } from './../../accounts/handlers/update';

async function deleteTransaction(event) {

    const { id, accountId } = event.pathParameters;
    
    const transaction = await retrieveTransaction({
        table: process.env.TRANSACTIONS_TABLE,
        keys: { id, accountId }
    });
    if (!transaction) {
        return Responses.NotFound(`Transaction with ID "${id}" not found`);
    }

    try {

        const account = await getAccountById(accountId, transaction.userId);

        const response = await dynamoDb.delete({
            TableName: process.env.TRANSACTIONS_TABLE,
            Key: { id, accountId },
            ReturnValues: 'ALL_OLD'
        });

        await updateAmountAndBuildAccountForUpdate(transaction, account);

        return Responses.OK(response.Attributes);
    } catch (error) {
        return Responses.InternalServerError(error);
    }
}

export const handler = middleware(deleteTransaction);
