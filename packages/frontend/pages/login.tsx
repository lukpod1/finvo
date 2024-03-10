import { useSessionStore } from "@/store/session";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
	const router = useRouter();
	const { fetchSessionData } = useSessionStore();

	useEffect(() => {
		const token = router.query.token;
		if (token) {
			localStorage.setItem('session', token.toString());
			setTimeout(() => {
				fetchSessionData()
				router.push('/dashboard');
			}, 1000);
		}
	})

	return (
		<div>
			<Head>
				<title>Finvo</title>
			</Head>
			<div className="bg-black h-screen flex flex-col justify-center items-center">
				<div className="bg-white h-3/4 w-4/5 rounded-lg shadow-lg flex flex-col justify-center items-center animate-fade-in">
					<div className="w-full">
						<h1 className="text-black text-center text-2xl md:text-4xl font-bold mb-6">
							Finvo
						</h1>
					</div>
					<div className="w-full self-center flex flex-col justify-center items-center">
						<Link href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`}>
							<button className="bg-black text-white rounded-md px-8 py-4 text-sm sm:text-lg md:text-xl lg:text-2xl hover:bg-white hover:text-black hover:border-black border-2 border-black transition duration-300 ease-in-out">
								Continue with Google
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>


	)
}
