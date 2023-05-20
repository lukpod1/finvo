import { User } from "@/domain/User";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { fetchSession } from "@/services/session";
import { getBalance, getAccounts } from "@/services/accounts";
import { Balance } from "@/domain/Balance";
import { Account } from "@/domain/Account";
import { Transaction, TransactionDTO } from "@/domain/Transaction";
import { getTransactions } from "@/services/transactions";
import Loading from "@/components/Loading";

type SessionContextType = {
    session: User;
    balance: Balance;
    accounts: Account[];
    transactions: Transaction[];
    getAccountsByUserId: (userId: string) => void;
    getTransactionsByUserId: (userId: string) => void;
    updateBalance: (userId: string) => void;
    fetchSessionData: () => void;
};

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export const useSession = () => useContext(SessionContext);

type SessionProviderProps = {
    children: React.ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [session, setSession] = useState<User>({} as User);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState<Balance>({} as Balance);
    const prevBalanceRef = useRef<Balance>();

    useEffect(() => {
        fetchSessionData();
    }, []);

    function fetchSessionData() {
        fetchSession().then(response => {
            setSession(response);
            if (response?.id) {
                updateBalance(response.id);
                getAccountsByUserId(response.id);
                getTransactionsByUserId(response.id);
            }
        });
    }

    function updateBalance(userId: string) {
        getBalance(userId).then((newBalance) => {
            if (!isEqual(newBalance, prevBalanceRef.current)) {
                prevBalanceRef.current = newBalance;
                setBalance(newBalance);
            }
        });

        function isEqual(a: any, b: any): boolean {
            return JSON.stringify(a) === JSON.stringify(b);
        }
    }

    function getAccountsByUserId(userId: string) {
        getAccounts(userId).then(accounts => {
            setAccounts(accounts);
        })
    }

    function getTransactionsByUserId(userId: string) {
        getTransactions(userId).then(transactions => setTransactions(transactions));
    }

    return (
        <SessionContext.Provider value={{ session, balance, accounts, transactions, updateBalance, getAccountsByUserId, getTransactionsByUserId, fetchSessionData }}>
            {children}
        </SessionContext.Provider>
    )
}

