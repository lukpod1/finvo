import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout';
import { useSession } from '@/contexts/session';
import { User } from '@/domain/User';

export default function DashBoard() {
  const router = useRouter();
  const { session, balance, updateBalance } = useSession();

  useEffect(() => {
    const token = localStorage.getItem('session');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (session && session.id && session !== {} as User) {
      updateBalance(session.id);
    }
  }, [session, updateBalance]);

  return (
    <Layout>
      <main className="">
        <div className="flex flex-col w-full lg:flex-row container mx-auto px-4">
          <div className="grid flex-grow h-32 card bg-base-300 rounded-lg place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Balance</div>
            <div className="font-medium text-neutral-600 text-4xl">R$ {balance?.totalBalance}</div>
          </div>
          <div className="grid flex-grow h-32 card bg-base-300 rounded-lg place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Expenses</div>
            <div className="font-medium text-red-600 text-4xl">R$ {balance?.totalExpenses}</div>
          </div>
          <div className="grid flex-grow h-32 card bg-base-300 rounded-lg place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Invoices</div>
            <div className="font-medium text-green-600 text-4xl">R$ {balance?.totalIncomes}</div>
          </div>
        </div>
      </main>
    </Layout>
  )
}