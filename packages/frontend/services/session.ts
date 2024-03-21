import { User } from "@/domain/User";
import { setCookie } from "nookies";

type Session = {
	user: User,
	token: string
}

export async function fetchSession(): Promise<Session> {

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
			method: 'GET',
			credentials: "include"
		});

		const data: Promise<Session> = response.json()

		setCookie(null, "session", (await data).token);

		if (!response.ok)
			throw new Error(`Failed to fetch session: ${response.status}`);

		return data;
	} catch (error) {
		console.error('Error fetching session:', error);
		throw new Error(`${error}`);
	}
}