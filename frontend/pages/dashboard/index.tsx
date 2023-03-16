import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type User = {
    email: string
    name: string
    picture: string
}

export default function Dashboard() {
    const [session, setSession] = useState<User>();
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    useEffect(() => {
        const getSession = async () => {
            const token = localStorage.getItem('session');
            if (token) {
                const user = await getUserInfo(token);
                if (user) setSession(user);
            }
        };
        getSession();
    }, [setSession]);

    const getUserInfo = async (session: any) => {
        try {
            const reponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/session`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${session}`
                    },
                }
            )
            return reponse.json();
        } catch (error) {
            alert(error)
        }
    }

    const signOut = async () => {
        localStorage.removeItem('session');
        router.push('/');
    }

    return (
        <div>
            <p>
                {session?.email}

            </p>

            <button
                className="
                w-1/2
                p-3
                border-none
                rounded
                bg-blue-900
                text-white
                text-sm
                cursor-pointer
                "
                onClick={(signOut)}>
                Sign out
            </button>
        </div>
    )
}