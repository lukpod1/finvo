import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type User = {
    email: string
    name: string
    picture: string
}

export default function Dashboard(props: any) {
    const [session, setSession] = useState<User>();
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem('session');
        if (token) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setSession(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, []);

    if (isLoading) return <p>Loading...</p>
    if (!session) return <p>No profile data</p>

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

// export async function getServerSideProps() {
//     return {
//         props: {
//             baseUrl: process.env.NEXT_PUBLIC_API_URL,
//         }
//     }
// }