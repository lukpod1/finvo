import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { success, failure } from '../../../libs/response';
import createError from 'http-errors';
import { retrieveTransaction } from './retrieve';
import { getAccountById } from './../../accounts/handlers/retrieve';
import { updateAmountAndBuildAccountForUpdate } from './../../accounts/handlers/update';

const deleteTransaction = async (event, context) => {

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
            throw new createError.NotFound(`Transaction with ID "${id}" not found`);
        }

        return success(response.Attributes);
    } catch (error) {
        failure(error);
        throw new createError.InternalServerError(error);
    }
};

export const handler = middleware(deleteTransaction);