import { defineStore } from "pinia";

export const useSessionStore = defineStore({
    id: 'session',
    state: () => ({
        token: localStorage.getItem('session') || null,
    }),
    getters: {
        getToken: (state) => state.token
    },
    actions: {
        setToken(token: string | null) {
            this.token = token;
            localStorage.setItem('session', token || '');
        }
    }
});