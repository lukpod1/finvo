import React, { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { User } from "@/domain/User";
import { useRouter } from "next/router";
import { getSession } from "@/hooks/getSession";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [session, setSession] = useState<User>({} as User);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('session');
        if (!token) {
            router.push('/login');
        }
    }, [])

    useEffect(() => {
        setLoading(true);
        getSession().then((data) => {
            setSession(data);
            setLoading(false);
        }).catch(error => {
            console.log(error);
        });
    }, [])

    const title = useMemo(() => {
        if (router.pathname === '/dashboard') return 'Dashboard';
        if (router.pathname === '/accounts') return 'Accounts';
        if (router.pathname === '/transactions') return 'Transactions';
        return '';
    }, [router.pathname])

    if (isLoading) {
        return (
            <>
                <Navbar session={session} />
                <Header title={title} />
                <p>
                    ...Loading
                </p>
            </>
        )
    }
    if (!session) return <p>No profile data</p>

    return (
        <>
            <Navbar session={session} />
            <Header title={title} />
            {children}
        </>
    )
}


