export async function fetchSession(): Promise<any> {

	try {
		const session = localStorage.getItem("session");
		if (session) {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${session}`
			},
			})

			if (!response.ok)
				throw new Error(`Failed to fetch session: ${response.status}`);

			return response.json();
		}
	} catch (error) {
		console.error('Error fetching session:', error);
		return null;
	}
}