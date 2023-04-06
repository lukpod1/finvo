import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next';
import { User } from '@/domain/User';
import Image from "next/image";
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';


export default function Home(props: any) {
  const router = useRouter();
  const [session, setSession] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('session');
    if (!token) {
      router.push('/login');
    }
  }, [])

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('session');
    if (token) {
      fetch(`${props.baseUrl}/session`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setSession(data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }, []);

  if (isLoading) return <p>Loading...</p>
  if (!session) return <p>No profile data</p>

  const handleSignOut = async () => {
    localStorage.removeItem('session');
    router.push('/login');
  }

  return (
    <>
      <Navbar session={session} signOut={handleSignOut} />
      <Header title="Dashboard" />

      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-row justify-center py-10">
              <div className="flex flex-col rounded-xl bg-white w-80 h-28">
                <div className="h-4 m-4 font-medium text-slate-400">Current Balance</div>
                <div className="h-4 m-3 font-medium text-neutral-600 text-4xl">R$ 20.000,00</div>
              </div>
              <div className="flex flex-col rounded-xl bg-white mx-10 w-80 h-28">
                <div className="h-4 m-4 font-medium text-slate-400">Expenses</div>
                <div className="h-4 m-3 font-medium text-red-600 text-4xl">R$ 20.000,00</div>
              </div>
              <div className="flex flex-col rounded-xl bg-white w-80 h-28">
                <div className="h-4 m-4 font-medium text-slate-400">Invoices</div>
                <div className="h-4 m-3 font-medium text-green-600 text-color text-4xl">R$ 20.000,00</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {

  return {
    props: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
    }
  }
}