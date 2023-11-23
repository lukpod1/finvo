import { create } from 'zustand';
import { getBalance, getAccounts } from "@/services/accounts";
import { getTransactions } from "@/services/transactions";
import { Transaction } from "@/domain/Transaction";
import { fetchSession } from "@/services/session";
import { Account } from "@/domain/Account";
import { Balance } from "@/domain/Balance";
import { User } from "@/domain/User";

type SessionStore = {
    session: User;
    balance: Balance;
    accounts: Account[];
    transactions: Transaction[];
    getAccountsByUserId: (userId: string) => void;
    getTransactionsByUserId: (userId: string) => void;
    updateBalance: (userId: string) => any;
    fetchSessionData: () => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
    session: {} as User,
    accounts: [],
    transactions: [],
    balance: {} as Balance,
    getAccountsByUserId: (userId: string) => {
        getAccounts(userId).then((accounts) => set({ accounts }));
    },
    getTransactionsByUserId: (userId: string) => {
        getTransactions(userId).then((transactions) => set({ transactions }));
    },
    updateBalance: async (userId: string) => {
        const newBalance = await getBalance(userId);
        set((state) => {
            if (JSON.stringify(newBalance) !== JSON.stringify(state.balance)) {
                return { ...state, balance: newBalance };
            }
            return state;
        });
    },
    fetchSessionData: async () => {
        const response = await fetchSession();
        console.log('Session data', response);
        set((state) => {
            if (JSON.stringify(response) !== JSON.stringify(state.session)) {
                return { ...state, session: response };
            }

            if (response?.id) {
                state.updateBalance(response.id);
                state.getAccountsByUserId(response.id);
                state.getTransactionsByUserId(response.id);
            }
            return state;
        });
    },
}));

