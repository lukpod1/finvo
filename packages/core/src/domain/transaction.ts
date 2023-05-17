import { DeleteItemCommand, DeleteItemCommandInput, DynamoDBClient, GetItemCommand, PutItemCommand, PutItemCommandInput, QueryCommand } from "@aws-sdk/client-dynamodb";
import { Table } from "sst/node/table";

export class Transaction {
    id: string;
    amount: number;
    date: string;
    description: string;
    type: TransactionType;
    accountId: string;
    userId: string;

    static client = new DynamoDBClient({});

    constructor(id: string, amount: number, date: string, description: string, type: TransactionType, accountId: string, userId: string) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.description = description;
        this.type = type;
        this.accountId = accountId;
        this.userId = userId;
    }

    static async save(transaction: Transaction): Promise<void> {
        const params: PutItemCommandInput = {
            TableName: Table.transactions.tableName,
            Item: {
                id: { S: transaction.id },
                amount: { N: transaction.amount.toString() },
                date: { S: transaction.date },
                description: { S: transaction.description },
                type: { S: transaction.type },
                accountId: { S: transaction.accountId },
                userId: { S: transaction.userId },
            },
        };

        try {
            const command = new PutItemCommand(params);
            await this.client.send(command);
            console.log(`Transaction ${transaction.id} saved successfully`);
        } catch (error) {
            throw new TransactionSaveError(`Error saving account ${transaction.id}`, transaction.id);
        }

    }

    static async retrieve(id: string, accountId: string): Promise<Transaction | undefined> {

        const result = await this.client.send(new GetItemCommand({
            TableName: Table.transactions.tableName,
            Key: {
                id: { S: id },
                accountId: { S: accountId },
            },
        }));

        if (!result.Item) {
            return undefined;
        }

        return new Transaction(
            result.Item.id.S ?? "",
            Number(result.Item.amount.N) ?? 0,
            result.Item.date.S ?? "",
            result.Item.description.S ?? "",
            result.Item.type?.S as TransactionType ?? "",
            result.Item.accountId.S ?? "",
            result.Item.userId.S ?? "",
        );
    }

    async update(): Promise<void> {
        // implement this method
        const params: PutItemCommandInput = {
            TableName: Table.transactions.tableName,
            Item: {
                id: { S: this.id },
                amount: { N: this.amount.toString() },
                date: { S: this.date },
                description: { S: this.description },
                type: { S: this.type },
                accountId: { S: this.accountId },
                userId: { S: this.userId },
            },
        };

        try {
            const command = new PutItemCommand(params);
            await Transaction.client.send(command);
            console.log(`Transaction ${this.id} updated successfully`);
        }   catch (error) {
            throw new TransactionSaveError(`Error updating account ${this.id}`, this.id);
        }
    }

    async delete(): Promise<void> {
        // implement this method
        const params: DeleteItemCommandInput = {
            TableName: Table.transactions.tableName,
            Key: {
                id: { S: this.id },
                accountId: { S: this.accountId },
            },
            ReturnValues: "ALL_OLD",
        };

        try {
            const command = new DeleteItemCommand(params);
            await Transaction.client.send(command);
            console.log(`Transaction ${this.id} deleted successfully`);
        }   catch (error) {
            throw new TransactionSaveError(`Error deleting account ${this.id}`, this.id);
        }
    }

    static async getTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
        const params = {
            TableName: Table.transactions.tableName,
            IndexName: "accountIdIndex",
            KeyConditionExpression: "accountId = :accountId",
            ExpressionAttributeValues: {
                ":accountId": { S: accountId },
            },
        };

        try {
            const data = await Transaction.client.send(new QueryCommand(params));
            const transactions: Transaction[] = [];
            data.Items?.forEach((item) => {
                transactions.push(new Transaction(
                    item.id.S ?? "",
                    Number(item.amount.N) ?? 0,
                    item.date.S ?? "",
                    item.description.S ?? "",
                    item.type?.S as TransactionType ?? "",
                    item.accountId.S ?? "",
                    item.userId.S ?? "",
                ));
            }
            );
            return transactions;
        } catch (error) {
            throw new TransactionSaveError(`Error getting transactions for account ${accountId}`, accountId);
        }
    }

}

export type TransactionDTO = {
    id?: string;
    amount: number;
    date: string;
    description: string;
    type: string;
    accountId: string;
    userId: string;
}

export type TransactionType = "income" | "expense";

class TransactionSaveError extends Error {
    constructor(message: string, public accountId: string) {
        super(message);
    }
}