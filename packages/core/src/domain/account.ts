import { DeleteItemCommand, DynamoDBClient, GetItemCommand, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { Table } from "sst/node/table";
import { Transaction } from "./transaction";
import { Console } from "console";

export class Account {
    id: string;
    balance: number;
    name: string;
    userId: string;

    static client = new DynamoDBClient({});

    constructor(id: string, name: string, userId: string, balance?: number) {
        console.log(id, balance, name, userId)
        if (!id || !name || !userId) {
            throw new Error('Missing required parameter');
        }

        this.id = id;
        this.balance = balance || 0;
        this.name = name;
        this.userId = userId;
    }

    async save(): Promise<void> {
        try {
            await Account.client.send(new PutItemCommand({
                TableName: Table.accounts.tableName,
                Item: {
                    id: { S: this.id },
                    balance: { N: this.balance.toString() },
                    name: { S: this.name },
                    userId: { S: this.userId },
                },
            }));
            console.log(`Account ${this.id} saved successfully`);
        } catch (error) {
            throw new AccountSaveError(`Error saving account ${this.id}`, this.id);
        }
    }

    static async getAccountById(id: string, userId: string): Promise<Account> {
        try {
            const result = await Account.client.send(new GetItemCommand({
                TableName: Table.accounts.tableName,
                Key: {
                    id: { S: id },
                    userId: { S: userId },
                },
            }));
            if (!result.Item) {
                throw new AccountGetError(`Account with ID ${id} not found!`, id)
            }

            return new Account(
                result.Item.id.S ?? "",
                result.Item.name.S ?? "",
                result.Item.userId.S ?? "",
                Number(result.Item.balance.N),
            );
        } catch (error) {
            throw new AccountGetError(`Error getting account ${id} for user ${userId}: ${error}`, id)
        }
    }

    static async updateBalance(amountDifference: number, id: string, userId: string): Promise<void> {
        try {
            await Account.client.send(new UpdateItemCommand({
                TableName: Table.accounts.tableName,
                Key: {
                    id: { S: id },
                    userId: { S: userId },
                },
                UpdateExpression: "SET balance = balance + :amountDifference",
                ExpressionAttributeValues: {
                    ":amountDifference": { N: amountDifference.toString() },
                },
                ReturnValues: "ALL_NEW",
            }));
            console.log(`Account ${id} updated successfully`);
        } catch (error) {
            throw new AccountUpdateError(`Error updating account ${id}`, id);
        }
    }

    static async updateAccountBalance(transaction: Transaction): Promise<void> {
        const account = await this.getAccountById(transaction.accountId, transaction.userId);
        if (transaction.type === "expense") {
            account.balance -= transaction.amount;
        } else {
            account.balance += transaction.amount;
        }

        await account.save();
    }

    async updateName(name: string): Promise<void> {
        try {
            await Account.client.send(new UpdateItemCommand({
                TableName: Table.accounts.tableName,
                Key: {
                    id: { S: this.id },
                    userId: { S: this.userId },
                },
                UpdateExpression: "SET #name = :name",
                ExpressionAttributeNames: {
                    "#name": "name",
                },
                ExpressionAttributeValues: {
                    ":name": { S: name },
                },
            }));
            console.log(`Account ${this.id} updated successfully`);
        } catch (error) {
            throw new AccountUpdateError(`Error updating account ${this.id}`, this.id);
        }
    }

    async delete(): Promise<void> {
        try {

            const transactions = await Transaction.getTransactionsByAccountId(this.id);

            if (transactions.length > 0) {
                console.log(`Deleting ${transactions.length} transactions for account ${this.id}`);
                await Promise.all(
                    transactions.map(async (transaction) => {
                        await transaction.delete();
                    })
                );
            } else {
                console.log(`No transactions to delete for account ${this.id}`);
            }


            await Account.client.send(new DeleteItemCommand({
                TableName: Table.accounts.tableName,
                Key: {
                    id: { S: this.id },
                    userId: { S: this.userId },
                },
            }));
            
            console.log(`Account ${this.id} deleted successfully`);
        } catch (error) {
            throw new AccountUpdateError(`Error deleting account ${this.id}`, this.id);
        }
    }
}

export type AccountDTO = {
    balance?: number;
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