import { DeleteItemCommand, DynamoDBClient, GetItemCommand, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { Table } from "sst/node/table";
import { Transaction } from "./transaction";
import { create, fromID, remove } from "../account";

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
			await create({ ...this })
			console.log(`Account ${this.id} saved successfully`);
		} catch (error) {
			throw new AccountSaveError(`Error saving account ${this.id}`, this.id);
		}
	}

	static async getAccountById(id: string): Promise<Account> {
		try {
			const result = await fromID(id);

			if (!result) {
				throw new AccountGetError(`Account with ID ${id} not found!`, id)
			}

			return new Account(
				result.id,
				result.name,
				result.userId,
				result.balance
			);
		} catch (error) {
			throw new AccountGetError(`Error getting account ${id}: ${error}`, id)
		}
	}

	static async updateBalance(transaction: Transaction): Promise<void> {
		const account = await this.getAccountById(transaction.accountId, transaction.userId);

		if (transaction.type === "expense") {
			account.balance -= transaction.amount;
		} else {
			account.balance += transaction.amount;
		}

		await account.save();
	}

	static async updateAccountBalance(transaction: Transaction): Promise<void> {
		const account = await this.getAccountById(transaction.accountId, transaction.userId);

		const transactionResult = await Transaction.retrieve(transaction.id, transaction.accountId);

		if (!transactionResult) {
			throw new Error(`Transaction with ID ${transaction.id} not found`);
		}

		const amountDifference = transaction.amount - transactionResult.amount;

		if (transaction.type === "expense") {
			account.balance -= amountDifference;
		} else if (transaction.type === "income") {
			account.balance += amountDifference;
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

			const deleted = await remove({id: this.id, userId: this.userId});

			console.log(`Account, ${this.name} - ${deleted[0]?.deletedId} deleted successfully`);
		} catch (error) {
			throw new AccountUpdateError(`Error deleting account ${this.id}: ${error}`, this.id);
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