import { DynamoDB, DynamoDBClient, GetItemCommand, PutItemCommand, PutItemCommandInput, UpdateItemCommand, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { Table } from "sst/node/table";
import { Transaction } from "./transaction";

export class Account {
    id: string;
    balance: number;
    name: string;
    userId: string;

    static client = new DynamoDBClient({});

    constructor(id: string, balance: number, name: string, userId: string) {
        if (!id || !balance || !name || !userId) {
            throw new Error('Missing required parameter');
        }

        this.id = id;
        this.balance = balance;
        this.name = name;
        this.userId = userId;
    }

    async save() {
        const params: PutItemCommandInput = {
            TableName: Table.accounts.tableName,
            Item: {
                id: { S: this.id },
                balance: { N: this.balance.toString() },
                name: { S: this.name },
                userId: { S: this.userId },
            },
        };

        try {
            const command = new PutItemCommand(params);
            await Account.client.send(command);
            console.log(`Account ${this.id} saved successfully`);
        } catch (error) {
            throw new AccountSaveError(`Error saving account ${this.id}`, this.id);
        }
    }

    async getAccountById(id: string, userId: string): Promise<Account> {
        const params = {
            TableName: Table.accounts.tableName,
            Key: {
                id: { S: id },
                userId: { S: userId },
            },
        };

        try {
            const result = await Account.client.send(new GetItemCommand(params));
            if (!result.Item) {
                throw new AccountGetError(`Account with ID ${id} not found!`, id)
            }

            return new Account(
                result.Item.id.S ?? "",
                Number(result.Item.balance.N),
                result.Item.name.S ?? "",
                result.Item.userId.S ?? "",
            );
        } catch (error) {
            throw new AccountGetError(`Error getting account ${id} for user ${userId}: ${error}`, id)
        }
    }

    async updateAmount(balance: number) {
        const params: UpdateItemCommandInput = {
            TableName: Table.accounts.tableName,
            Key: {
                id: { S: this.id },
                userId: { S: this.userId },
            },
            UpdateExpression: "SET #balance = :balance",
            ExpressionAttributeValues: {
                ":balance": { N: balance.toString() },
            },
            ReturnValues: "ALL_NEW",
        };

        try {
            const command = new UpdateItemCommand(params);
            await Account.client.send(command);
            console.log(`Account ${this.id} updated successfully`);
        } catch (error) {
            throw new AccountUpdateError(`Error updating account ${this.id}`, this.id);
        }
    }

    async updateAccountBalance(transaction: Transaction) {
        const account = await this.getAccountById(transaction.accountId, transaction.userId);
        if (transaction.type == "EXPENSE") {
            account.balance -= transaction.amount;
        } else {
            account.balance += transaction.amount;
        }

        await account.save();
    }
}

export type AccountDTO = {
    balance: number;
    name: string;
    userId: string;
}

class AccountSaveError extends Error {
    constructor(message: string, public accountId: string) {
        super(message);
    }
}

class AccountGetError extends Error {
    constructor(message: string, public accountId: string) {
        super(message);
    }
}

class AccountUpdateError extends Error {
    constructor(message: string, public accountId: string) {
        super(message);
    }
}