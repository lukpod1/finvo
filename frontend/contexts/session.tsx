import { User } from "@/domain/User";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { fetchSession } from "@/services/session";
import { getBalance, getAccounts } from "@/services/accounts";
import { Balance } from "@/domain/Balance";
import { Account } from "@/domain/Account";

type SessionContextType = {
    session: User | undefined;
    balance: Balance;
    accounts: Account[];
    getAccountsByUserId: (userId: string | undefined) => void;
    updateBalance: (userId: string | undefined) => void;
};

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export const useSession = () => useContext(SessionContext);

type SessionProviderProps = {
    children: React.ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [session, setSession] = useState<User | undefined>({} as User);
    const [accounts, setAccounts] = useState<Account[]>([]);
    //const [currentBalance, setCurrentBalance] = useState<number>(0);
    const [balance, setBalance] = useState<Balance>({} as Balance);
    const prevBalanceRef = useRef<Balance>();

    useEffect(() => {
        fetchSession().then(response => {
            setSession(response);
            if (response?.id) {
                updateBalance(response.id);
                getAccountsByUserId(response.id);
            }
        });
    }, [])

    function updateBalance(userId: string | undefined) {
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

    function getAccountsByUserId(userId: string | undefined) {
        getAccounts(userId).then(accounts => {
            setAccounts(accounts);
        })
    }

    return (
        <SessionContext.Provider value={{ session, balance, accounts, updateBalance, getAccountsByUserId }}>
            {children}
        </SessionContext.Provider>
    )
}

