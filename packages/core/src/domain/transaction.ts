import { DeleteItemCommand, DeleteItemCommandInput, DynamoDBClient, GetItemCommand, PutItemCommand, PutItemCommandInput, QueryCommand } from "@aws-sdk/client-dynamodb";
import { Table } from "sst/node/table";
import { getTransactionsByAccountId, remove } from "../transaction";

export class Transaction {
	id: string;
	amount: number;
	createdAt: string;
	updatedAt: string;
	description: string;
	type: TransactionType;
	accountId: string;
	userId: string;

	static client = new DynamoDBClient({});

	constructor(id: string, amount: number, createdAt: string, updatedAt: string, description: string, type: TransactionType, accountId: string, userId: string) {
		this.id = id;
		this.amount = amount;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
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
		} catch (error) {
			throw new TransactionSaveError(`Error updating account ${this.id}`, this.id);
		}
	}

	async delete(): Promise<void> {

		try {
			await remove(this.id);
			console.log(`Transaction ${this.id} deleted successfully`);
		} catch (error) {
			throw new TransactionSaveError(`Error deleting account ${this.id}`, this.id);
		}
	}

	static async getTransactionsByAccountId(accountId: string): Promise<Transaction[]> {
		console.log(`Getting transactions for account ${accountId}`);

		try {
			const data = await getTransactionsByAccountId(accountId);
			const transactions: Transaction[] = [];
			data?.forEach((item) => {
				transactions.push(new Transaction(
					item.id ?? "",
					Number(item.amount) ?? 0,
					item.createdAt ?? "",
					item.updatedAt ?? "",
					item.description ?? "",
					item.type as TransactionType ?? "",
					item.accountId ?? "",
					item.userId ?? "",
				));
			}
			);

			console.log(`Found ${transactions.length} transactions for account ${accountId}`);
			return transactions;
		} catch (error) {
			throw new TransactionSaveError(`Error getting transactions for account ${accountId} | ${error}`, accountId);
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