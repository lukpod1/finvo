import Layout from '@/components/Layout';
import { fetchSession } from '@/services/session';
import { useSessionStore } from '@/store/session';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from "nookies";
import { useEffect } from 'react';

export default function DashBoard() {
  const { balance } = useSessionStore();

  return (
    <Layout>
      <main className="">
        <div className="flex flex-col w-full lg:flex-row container mx-auto px-4">
          <div className="grid flex-grow h-32 card bg-base-300 rounded-lg place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Balance</div>
            <div className="font-medium text-neutral-600 text-4xl">
              {balance?.totalBalance !== undefined ? (
                Number.isInteger(balance?.totalBalance) ? (
                  `R$ ${balance?.totalBalance.toFixed(0)}`
                ) : (
                  `R$ ${balance?.totalBalance.toFixed(2)}`
                )
              ) : (
                'R$ 0.00'
              )
              }
            </div>
          </div>
          <div className="grid flex-grow h-32 card bg-base-300 rounded-lg place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Expenses</div>
            <div className="font-medium text-red-600 text-4xl">
              {balance?.totalExpenses !== undefined ? (
                Number.isInteger(balance?.totalExpenses) ? (
                  `R$ ${balance?.totalExpenses.toFixed(0)}`
                ) : (
                  `R$ ${balance?.totalExpenses.toFixed(2)}`
                )
              ) : (
                'R$ 0.00'
              )
              }
            </div>
          </div>
          <div className="grid flex-grow h-32 card bg-base-300 rounded-lg place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Invoices</div>
            <div className="font-medium text-green-600 text-4xl">
              {balance?.totalIncomes !== undefined ? (
                Number.isInteger(balance?.totalIncomes) ? (
                  `R$ ${balance?.totalIncomes.toFixed(0)}`
                ) : (
                  `R$ ${balance?.totalIncomes.toFixed(2)}`
                )
              ) : (
                'R$ 0.00'
              )
              }
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
