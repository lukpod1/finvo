import { User } from "@/domain/User";
import { parseCookies } from "nookies";

export async function fetchSession(): Promise<any> {
	const { session } = parseCookies();

	if (session) {
		const response = await fetch(`${process.env.NEXT_PUBLIC_SESSION_API_URL}/session`, {
			method: 'GET',
			credentials: "include"
		})
		const data: User = await response.json();
		return data;
	}
}