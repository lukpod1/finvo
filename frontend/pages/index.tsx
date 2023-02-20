import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [session, setSession] = useState(null)
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
    setSession(null)
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="container">
      <h2>Finance Service</h2>
      {(session ? (
        <div className="profile">
          <p>Welcome {session.name}!</p>
          <img 
            src={session.picture} 
            style={{ borderRadius: "50%" }}
            width={100}
            height={100}
            alt="" 
          />
          <p>{session.email}</p>
          <button onClick={(signOut)}>Sign out</button>
        </div>
      ) : (
        <div>
          <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/authorize`}
            rel="noreferrer"
          >
            <button>Sign in with Google</button>
          </a>
        </div>
      ))}
    </div>
  )
}
