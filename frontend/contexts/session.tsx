import { User } from "@/domain/User";
import { create } from "zustand";

type SessionState = {
    session: User;
    fetchSession: () => Promise<User | null>;
}

export const useSessionStore = create<SessionState>((set) => ({
    session: {} as User,
    fetchSession: async () => {
        const token = localStorage.getItem('session');
        if (token) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            const data = await response.json();
            set({ session: data });
            return data;
        }
        return null;
    }
}))