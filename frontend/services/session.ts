import { User } from "@/domain/User";

export async function fetchSession(): Promise<User | undefined> {
    try {
        const token = localStorage.getItem('session');
        if (token) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            const data: User = await response.json();
            return data;
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching session');
    }
}