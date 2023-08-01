import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { use, useEffect } from "react";
import { setTimeout } from "timers";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('session');
        if (token) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    }, [router]);

    return <Loading />
}