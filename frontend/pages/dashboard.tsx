import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Balance } from '@/domain/Balance';
import Layout from '@/components/Layout';
import { useSessionStore } from '@/contexts/session';
import { getBalance } from '@/services/accounts';
import { User } from '@/domain/User';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { fetchSession } from '@/services/session';

export default function DashBoard() {
  const router = useRouter();
  const { session, fetchSession } = useSessionStore();
  const [balance, setBalance] = useState<Balance>();

  useEffect(() => {
    const token = localStorage.getItem('session');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {

    console.log(session);
    if (session && session !== undefined && session.id && session !== {} as User) {
      getBalance(session.id).then((balance) => {
        setBalance(balance);
      })
    }
  }, [session])


  return (
    <Layout>
      <main className="">
        <div className="flex flex-col w-full lg:flex-row container mx-auto px-4">
          <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Current Balance</div>
            <div className="font-medium text-neutral-600 text-4xl">R$ {balance?.totalBalance}</div>
          </div>
          <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Expenses</div>
            <div className="font-medium text-red-600 text-4xl">R$ {balance?.totalExpenses}</div>
          </div>
          <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Invoices</div>
            <div className="font-medium text-green-600 text-color text-4xl">R$ {balance?.totalInvoices}</div>
          </div>
        </div>
      </main>
    </Layout>
  )
}