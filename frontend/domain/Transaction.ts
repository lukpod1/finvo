export interface Transaction {
    id: string;
    amount: number;
    date: string;
    description: string;
    type: TransactionType;
    accountId: string;
    userId: string;
}

export interface TransactionDTO {
    id: string;
    amount: number;
    date: string;
    description: string;
    type: TransactionType;
    accountId: string;
    accountName: string;
    userId: string;
}

type TransactionType = "income" | "expense";
