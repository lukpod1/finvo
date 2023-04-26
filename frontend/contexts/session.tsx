import { User } from "@/domain/User";
import { createContext, useContext, useEffect, useState } from "react";

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
        const token = localStorage.getItem('session');
        if (token) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(response => response.json().then(data => {
                setSession(data);
            }));
        }
    }, [])

    return (
        <SessionContext.Provider value={{session}}>
            {children}
        </SessionContext.Provider>
    )
}

