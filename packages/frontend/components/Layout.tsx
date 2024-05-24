import React, { use, useEffect, useMemo } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const title = useMemo(() => {
		if (router.pathname === '/dashboard') return 'Dashboard';
		if (router.pathname === '/accounts') return 'Accounts';
		if (router.pathname === '/transactions') return 'Transactions';
		return '';
	}, [router.pathname])

	return (
		<>
			<Navbar />
			<Header title={title} />
			{children}
		</>
	)
}


