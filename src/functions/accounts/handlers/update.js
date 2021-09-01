import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import { getAccountById } from './retrieve';
import { validateField } from '../../../libs/validateField';

export async function updateAccount(event) {

    const { id } = event.pathParameters;

    const {name, balance, userId} = event.body;

    const account = await getAccountById(id, userId);

    if(name && name !== account.name) {
        const nameIsValid = await validateField({
            table: process.env.ACCOUNTS_TABLE,
            column: "name",
            field: name
        });

        if(nameIsValid) {
            Responses.Conflict(`The "${name}" already exists`);
        }
    }

    const params = {
        TableName: process.env.ACCOUNTS_TABLE,
        Key: {id, userId},
        UpdateExpression: "SET #name = :name, balance = :balance",
        ExpressionAttributeValues: {
            ":name": name || account.name,
            ":balance": balance || balance.email,
        },
        ExpressionAttributeNames: {
            "#name": "name"
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const response = await dynamoDb.update(params);
        Responses.OK(response.Attributes);
    } catch (error) {
        Responses.InternalServerError(error);
    }

}

export async function updateAmountAndBuildAccountForUpdate(transaction, account) {
    if (transaction.type == "EXPENSE") {
        account.balance -= transaction.amount;

        const updatedAccount = {
            pathParameters: { id: account.id },
            body: {
                balance: account.balance,
                userId: account.userId
            }
        };

        await updateAccount(updatedAccount);
    } else {
        account.balance += transaction.amount;

        const updatedAccount = {
            pathParameters: { id: account.id },
            body: {
                balance: account.balance,
                userId: account.userId
            }
        };

        await updateAccount(updatedAccount);
    }
}

export const handler = middleware(updateAccount);