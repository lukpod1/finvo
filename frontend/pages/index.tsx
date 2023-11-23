import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('session');
        router.push(token ? '/dashboard' : '/login');
    }, [router]);

    return <Loading />
}