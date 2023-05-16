import { Transaction } from "@/domain/Transaction";

export const createTransaction = async (transaction: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_TRANSACTIONS_API_URL}/transactions`, {
        method: 'POST',
        body: JSON.stringify(transaction),
    });
    return await response.json();
}

export const getTransactions = async (userId: string): Promise<Transaction[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_TRANSACTIONS_API_URL}/transactions?userId=${userId}`, {
        method: 'GET',
    });
    return await response.json();
}

export const updateTransaction = async (transaction: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_TRANSACTIONS_API_URL}/transactions/${transaction.id}`, {
        method: 'PUT',
        body: JSON.stringify(transaction),
    });
    return await response.json();
}