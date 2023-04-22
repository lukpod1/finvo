import { User } from "@/domain/User";

export const getBalance = async (accountId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ACCOUNTS_API_URL}/accounts/balance?userId=${accountId}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
}