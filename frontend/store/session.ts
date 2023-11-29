import { create } from 'zustand';
import { getBalance, getAccounts } from "@/services/accounts";
import { getTransactions } from "@/services/transactions";
import { Transaction } from "@/domain/Transaction";
import { fetchSession } from "@/services/session";
import { Account } from "@/domain/Account";
import { Balance } from "@/domain/Balance";
import { User } from "@/domain/User";

type SessionStore = {
  session: User | null;
  balance: Balance;
  accounts: Account[];
  transactions: Transaction[];
  getAccountsByUserId: (userId: string) => void;
  getTransactionsByUserId: (userId: string) => void;
  updateBalance: (userId: string) => void;
  fetchSessionData: () => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  session: null,
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
    set({ balance: newBalance });
  },
  fetchSessionData: async () => {
    const response = await fetchSession();

    if (response) {
      set({ session: response });
      const { id } = response;
      set((state) => {
        if (id && id !== state.session?.id) {
          state.updateBalance(id);
          state.getAccountsByUserId(id);
          state.getTransactionsByUserId(id);
        }
        return state;
      });
    }
  },
}));

