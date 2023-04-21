export const getSession = async () => {
    const token = localStorage.getItem('session');
    if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        const data = await response.json();
        return data;
    }
    return null;
}