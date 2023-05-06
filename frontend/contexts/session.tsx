import { User } from "@/domain/User";
import React, { createContext, useContext, useEffect, useState } from "react";
import {fetchSession} from "@/services/session";

type SessionContextType ={
    session: User;
};

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export const useSession = () => useContext(SessionContext);

type SessionProviderProps = {
    children: React.ReactNode;
};

export const SessionProvider = ({ children}: SessionProviderProps) => {
    const [ session, setSession ] = useState<User>({} as User);

    useEffect(() => {
        fetchSession().then(response => setSession(response));
    }, [])

    return (
        <SessionContext.Provider value={{session}}>
            {children}
        </SessionContext.Provider>
    )
}

