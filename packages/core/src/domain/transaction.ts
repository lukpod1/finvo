import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { type } from "os";
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

    static async save(transaction: Transaction) {
        const params: PutItemCommandInput = {
            TableName: Table.accounts.tableName,
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
            console.log(`Account ${transaction.id} saved successfully`);
        } catch (error) {
            throw new TransactionSaveError(`Error saving account ${transaction.id}`, transaction.id);
        }

    }
}

export type TransactionDTO = {
    amount: number;
    date: string;
    description: string;
    type: string;
    accountId: string;
    userId: string;
}

export type TransactionType = "INCOME" | "EXPENSE";

class TransactionSaveError extends Error {
    constructor(message: string, public accountId: string) {
        super(message);
    }
}