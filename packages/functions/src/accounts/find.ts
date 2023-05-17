import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { ApiHandler, useQueryParam } from "sst/node/api";
import { Table } from "sst/node/table";
import { Account } from "@finance-service/core/domain/account";

const ddb = new DynamoDB({});

export async function getAccounts(userId: string | undefined) {
    const result = await ddb.query({
        TableName: Table.accounts.tableName,
        IndexName: "userIdIndex",
        KeyConditionExpression: "#userId = :userId",
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
            Number(item.balance.N) ?? 0,
            item.name.S ?? "",
            item.userId.S ?? "",
        );
    });
}

async function getTransactions(userId: string | undefined) {
    const result = await ddb.query({
        TableName: Table.transactions.tableName,
        IndexName: 'userIdIndex',
        KeyConditionExpression: '#userId = :userId',
        ExpressionAttributeNames: {
            "#userId": "userId",
        },
        ExpressionAttributeValues: userId ? {
            ":userId": { S: userId },
        } : undefined,
        ReturnConsumedCapacity: "TOTAL",
    });

    const totalIncomes = result.Items?.reduce((total, item) => {
        if (item.type.S === "income" && !Number.isNaN(Number(item.amount.N))) {
            return total + Number(item.amount.N);
        }
        return total;
    }, 0) ?? 0;

    const totalExpenses = result.Items?.reduce((total, item) => {
        if (item.type.S === "expense" && !Number.isNaN(Number(item.amount.N))) {
            return total + Number(item.amount.N);
        }
        return total;
    }, 0) ?? 0;

    return { totalIncomes, totalExpenses };
}

export const handler = ApiHandler(async (event) => {
    const userId = useQueryParam("userId");

    try {
        const accounts = await getAccounts(userId);

        const totalBalance = accounts?.reduce((total, account) => {
            return total + account.balance;
        }, 0) ?? 0;

        const { totalIncomes, totalExpenses } = await getTransactions(userId);

        return {
            statusCode: 200,
            body: JSON.stringify({
                totalBalance,
                totalIncomes,
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