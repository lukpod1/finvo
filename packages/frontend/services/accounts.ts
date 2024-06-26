import { Account } from "@/domain/Account";
import { Balance } from "@/domain/Balance";

export const getBalance = async (userId: string): Promise<Balance> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/balance?userId=${userId}`, {
		method: 'GET',
		credentials: "include"
	});
	return await response.json();
}

export const createAccount = async (account: any) => {
	console.log('account', account);
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
		method: 'POST',
		body: JSON.stringify(account),
		credentials: "include"
	});
	return await response.json();
}

export const getAccounts = async (userId: string): Promise<Account[]> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts?userId=${userId}`, {
		method: 'GET',
		credentials: "include"
	});
	return await response.json();
}

export const updateAccount = async (account: any) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${account.id}`, {
		method: 'PUT',
		body: JSON.stringify(account),
		credentials: "include"
	});
	return await response.json();
}

export const deleteAccount = async (account: any) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${account.id}`, {
		method: 'DELETE',
		credentials: "include"
	});
	return await response.json();
}