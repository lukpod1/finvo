import { parseCookies } from "nookies";

export async function fetchSession(): Promise<any> {
	const { session } = parseCookies();

	if (!session) return null;

	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
			method: 'GET',
			credentials: "include"
		})

		if (!response.ok)
			throw new Error(`Failed to fetch session: ${response.status}`);

		return response.json();

	} catch (error) {
		console.error('Error fetching session:', error);
		return null;
	}
}