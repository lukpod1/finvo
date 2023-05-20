import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { Transaction, TransactionType } from "@finance-service/core/domain/transaction";
import { Table } from "sst/node/table";

const ddb = new DynamoDB({});

export async function getTransactions(userId: string | undefined) {
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

    return result.Items?.map((item) => {
        return new Transaction(
            item.id.S ?? "",
            Number(item.amount.N) ?? 0,
            item.date.S ?? "",
            item.description.S ?? "",
            item.type?.S as TransactionType ?? "",
            item.accountId.S ?? "",
            item.userId.S ?? "",
        );
    });

}
