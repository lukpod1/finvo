import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next';
import { User } from '@/domain/User';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { Balance } from '@/domain/Balance';
import Layout from '@/components/Layout';
import { getSession } from '@/hooks/getSession';

interface DashBoardProps {
  session: User;
  accountsApiUrl: string;
  userId: string;
}

export default function DashBoard(props: any) {
  const router = useRouter();
  const [balance, setBalance] = useState<Balance>({} as Balance);
  const [session, setSession] = useState<User>({} as User);

  useEffect(() => {

    const token = localStorage.getItem('session');
    if (!token) {
      router.push('/login');
    }
  }, [])

  useEffect(() => {
    console.log("PROPS: ", props)
    getSession().then((data) => {
      console.log("DATA: ", data)
      setSession(data);
      getBalance(data).then((data) => {
        setBalance(data);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  }, [])

  const getBalance = async (session: User) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ACCOUNTS_API_URL}/accounts/balance?userId=${session.id}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }

  return (
    <Layout>
      <main className="">
        <div className="flex flex-col w-full lg:flex-row container mx-auto px-4">
          <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Current Balance</div>
            <div className="font-medium text-neutral-600 text-4xl">R$ {balance.totalBalance}</div>
          </div>
          <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Expenses</div>
            <div className="font-medium text-red-600 text-4xl">R$ {balance.totalExpenses}</div>
          </div>
          <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center mx-2 my-2">
            <div className="font-medium text-slate-400">Invoices</div>
            <div className="font-medium text-green-600 text-color text-4xl">R$ {balance.totalInvoices}</div>
          </div>
        </div>
      </main>

      <section>
        <div className="overflow-x-auto flex flex-col w-full lg:flex-row container mx-auto px-4 py-3">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  )
}

