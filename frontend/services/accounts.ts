import {Account} from "@/domain/Account";
import {MutationFunction} from "@tanstack/react-query";

export const getBalance = async (accountId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ACCOUNTS_API_URL}/accounts/balance?userId=${accountId}`, {
        method: 'GET',
    });
    return await response.json();
}

export const createAccount: MutationFunction<Account, Account> = async (account) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ACCOUNTS_API_URL}/accounts`, {
        method: 'POST',
        body: JSON.stringify(account),
    });
    return await response.json();
}