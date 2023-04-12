import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { ApiHandler, useQueryParam } from "sst/node/api";
import { Table } from "sst/node/table";
import Account from "@finance-service/core/domain/account";

const ddb = new DynamoDB({});

async function getAccounts(userId: string | undefined) {
    const result = await ddb.scan({
        TableName: Table.accounts.tableName,
        FilterExpression: "#userId = :userId",
        ExpressionAttributeNames: {
            "#userId": "userId",
        },
        ExpressionAttributeValues: userId ? {
            ":userId": { S: userId },
        } : undefined,
        ReturnConsumedCapacity: "TOTAL",
    })

    return result.Items?.map((item) => {
        return new Account(
            item.id.S ?? "",
            Number(item.balance.N),
            item.name.S ?? "",
            item.userId.S ?? "",
        );
    });
}

async function getTransactions(accountIds: string[] | undefined) {
    const result = await ddb.scan({
        TableName: Table.transactions.tableName,
        FilterExpression: "#accountId IN (:accountIds)",
        ExpressionAttributeNames: {
            "#accountId": "accountId",
        },
        ExpressionAttributeValues: {
            ":accountIds": { SS: accountIds ?? [] },
        },
        ReturnConsumedCapacity: "TOTAL",
    })

    const totalInvoices = result.Items?.reduce((total, item) => {
        return total + Number(item.invoice.N);
    }, 0) ?? 0;

    const totalExpenses = result.Items?.reduce((total, item) => {
        return total + Number(item.expense.N);
    }, 0) ?? 0;
    
    return { totalInvoices, totalExpenses };
}

export const handler = ApiHandler(async (event) => {
    const userId = useQueryParam("userId");
    console.log("userId", userId);

    try {
        const accounts = await getAccounts(userId);

        const totalBalance = accounts?.reduce((total, account) => {
            return total + account.balance;
        }, 0) ?? 0;

        const accountIds = accounts?.map((account) => account.id);

        const { totalInvoices, totalExpenses } = await getTransactions(accountIds);

        return {
            statusCode: 200,
            body: JSON.stringify({
                totalBalance,
                totalInvoices,
                totalExpenses,
            }),
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
});