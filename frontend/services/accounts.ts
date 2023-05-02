import { Account } from "@/domain/Account";
import { User } from "@/domain/User";
import { MutationFunction } from "@tanstack/react-query";

export const getBalance = async (accountId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ACCOUNTS_API_URL}/accounts/balance?userId=${accountId}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}

export const createAccount: MutationFunction<Account, Account> = async (account) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ACCOUNTS_API_URL}/accounts`, {
        method: 'POST',
        body: JSON.stringify(account),
    });
    const data = await response.json();
    return data;
}