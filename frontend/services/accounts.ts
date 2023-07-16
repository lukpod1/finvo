export const getBalance = async (accountId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ACCOUNTS_API_URL}/accounts/balance?userId=${accountId}`, {
        method: 'GET',
    });
    return await response.json();
}

export const createAccount = async (account: any) => {
    console.log('account', account);
    const response = await fetch(`${process.env.NEXT_PUBLIC_ACCOUNTS_API_URL}/accounts`, {
        method: 'POST',
        body: JSON.stringify(account),
    });
    return await response.json();
}

export const getAccounts = async (userId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ACCOUNTS_API_URL}/accounts?userId=${userId}`, {
        method: 'GET',
    });
    return await response.json();
}

export const updateAccount = async (account: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ACCOUNTS_API_URL}/accounts/${account.id}`, {
        method: 'PUT',
        body: JSON.stringify(account),
    });
    return await response.json();
}

export const deleteAccount = async (account: any) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ACCOUNTS_API_URL}/accounts/${account.id}/${account.userId}`, {
        method: 'DELETE',
    });
    return await response.json();
}