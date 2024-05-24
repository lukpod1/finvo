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
  updateBalance: (userId: string) => void;
  fetchSessionData: () => Promise<void>;
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
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetchSession();
        console.log('Session data', response);

        set((state) => {
          if (JSON.stringify(response) !== JSON.stringify(state.session)) {
            const newState = { ...state, session: response.user };
            if (response.user.id && state.session?.id !== response.user.id) {
              newState.updateBalance(response.user.id);
              newState.getAccountsByUserId(response.user.id);
              newState.getTransactionsByUserId(response.user.id);
            }
            return newState;
          }
          return state;
        });

        resolve(); // Resolve a promessa depois de atualizar o estado
      } catch (error) {
        console.error('Error fetching session:', error);
        reject(error); // Rejeita a promessa em caso de erro
      }
    });
  },
}));

