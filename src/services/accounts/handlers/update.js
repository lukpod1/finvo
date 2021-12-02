import middleware from '../../../libs/middleware';
import dynamoDb from '../../../libs/dynamodb';
import { Responses } from '../../../libs/response';
import { getAccountById } from './retrieve';
import { validateField } from '../../../libs/validateField';

export async function updateAccount(event) {

    const { id, userId } = event.pathParameters;

    const { name, balance } = event.body;

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
            ":balance": balance || account.balance,
        },
        ExpressionAttributeNames: {
            "#name": "name"
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const response = await dynamoDb.update(params);
        return Responses.OK(response.Attributes);
    } catch (error) {
        return Responses.InternalServerError(error);
    }

}

async function updateAmount(account) {
    const params = {
        TableName: process.env.ACCOUNTS_TABLE,
        Key: {id: account.id, userId: account.userId},
        UpdateExpression: "SET #name = :name, balance = :balance",
        ExpressionAttributeValues: {
            ":name": account.name,
            ":balance": account.balance,
        },
        ExpressionAttributeNames: {
            "#name": "name"
        },
        ReturnValues: 'ALL_NEW'
    };

    await dynamoDb.update(params);
}

export async function updateAmountAndBuildAccountForUpdate(transaction, account) {
    if (transaction.type == "EXPENSE") {
        account.balance -= transaction.amount;

        await updateAmount(account);
    } else {
        account.balance += transaction.amount;

        await updateAmount(account);
    }
}

export const handler = middleware(updateAccount);
