import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [session, setSession] = useState(null)
  const router = useRouter();

  const getSession = async () => {
    const token = localStorage.getItem('session');
    if (token) {
      setSession(token);
    }
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

  const signOut = async () => {
    localStorage.removeItem('session')
    setSession(null)
  }

  return (
    <div className="container">
      <h2>SST Auth Google</h2>
      {(session ? (
        <div>
          <h3>Logged in</h3>
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
