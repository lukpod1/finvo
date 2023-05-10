import { User } from "@/domain/User";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { fetchSession } from "@/services/session";
import { getBalance } from "@/services/accounts";
import { Balance } from "@/domain/Balance";

type SessionContextType = {
    session: User;
    balance: Balance;
    updateBalance: (userId: string) => void;
};

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export const useSession = () => useContext(SessionContext);

type SessionProviderProps = {
    children: React.ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
    const [session, setSession] = useState<User>({} as User);
    const [currentBalance, setCurrentBalance] = useState<number>(0);
    const [balance, setBalance] = useState<Balance>({} as Balance);
    const prevBalanceRef = useRef<Balance>();

    useEffect(() => {
        fetchSession().then(response => {
            setSession(response);
            updateBalance(response.id);
        });
    }, [])

    function updateBalance(userId: string) {
        console.log("entrou o updateBalance")
        getBalance(userId).then((newBalance) => {
            if (!isEqual(newBalance, prevBalanceRef.current)) {
                prevBalanceRef.current = newBalance;
                console.log("mudou o balance")
                setBalance(newBalance);
            }
        });

        function isEqual(a: any, b: any): boolean {
            return JSON.stringify(a) === JSON.stringify(b);
        }
    }

    return (
        <SessionContext.Provider value={{ session, balance, updateBalance }}>
            {children}
        </SessionContext.Provider>
    )
}

