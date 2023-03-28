import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";


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
            fetch(`${props.baseUrl}/session`, {
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

        <div className="bg-white h-screen">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-md w-52">
                            <li><a>Dashboard</a></li>
                            <li><a>Accounts</a></li>
                            <li><a>Transactions</a></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Finance App</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Dashboard</a></li>
                        <li><a>Accounts</a></li>
                        <li><a>Transactions</a></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <ul className="menu menu-horizontal px-1">
                        <li>{session.name}</li>
                    </ul>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Image width={40} height={40} src={session.picture} alt="profile picture" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-md w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={signOut}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    return {
        props: {
            baseUrl: process.env.NEXT_PUBLIC_API_URL
        }
    }
}
