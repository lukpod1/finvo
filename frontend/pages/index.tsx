import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

type User = {
  email?: string
  name?: string
  picture?: string
}

export default function Home() {
  const [session, setSession] = useState<User | undefined>();
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  const getSession = async () => {
    const token = localStorage.getItem('session');
    if (token) {
      const user = await getUserInfo(token);
      if (user) setSession(user);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    const token = router.query.token;
    if (token) {
      localStorage.setItem('session', token.toString());
      window.location.replace(window.location.origin);
    }
  }, [router])

  const getUserInfo = async (session: any) => {
    try {
      const reponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/session`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session}`
          },
        }
      )
      return reponse.json()
    } catch (error) {
      alert(error)
    }
  }

  const signOut = async () => {
    localStorage.removeItem('session')
    setSession(undefined)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full h-screen flex flex-col items-center text-center">
      <h2>Finance Service</h2>
      {session ? (
        <div className="p-5 rounded-sm">
          <p>Welcome {session.name}!</p>
          <img
            className="mx-auto w-28 h-28 rounded-full"
            src={session.picture}
            alt=""
          />
          <p>{session.email}</p>
          <button
            className="
            w-full
            p-3
            border-none
            rounded
            bg-blue-900
            text-white
            text-sm
            cursor-pointer
            "
            onClick={(signOut)}>
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`}
            rel="noreferrer"
          >
            <button
              className="
              w-full
              p-3
              border-none
              rounded
              bg-blue-900
              text-white
              text-sm
              cursor-pointer
              "
            >Sign in with Google</button>
          </a>
        </div>
      )}
    </div>
  )
}
