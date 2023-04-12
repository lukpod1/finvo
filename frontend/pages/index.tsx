import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next';
import { User } from '@/domain/User';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { Balance } from '@/domain/Balance';

export default function Home(props: any) {
  const router = useRouter();
  const [session, setSession] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    const token = localStorage.getItem('session');
    if (!token) {
      router.push('/login');
    }
  }, [])

  useEffect(() => {
    setLoading(true);
    getSession().then((data) => {
      setSession(data);
      return data.id;
    }).then((userId) => {
      return getBalance(userId);
    }).then((data) => {
      setBalance(data);
      setLoading(false);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const getSession = async () => {
    const token = localStorage.getItem('session');
    if (token) {
      const response = await fetch(`${props.baseUrl}/session`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      const data = await response.json();
      return data;
    }
    return null;
  }

  const getBalance = async (userId: string) => {
    const response = await fetch(`${props.accountsApiUrl}/accounts/balance?userId=${userId}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }

  const handleSignOut = async () => {
    localStorage.removeItem('session');
    router.push('/login');
  }

  if (isLoading) return <p>Loading...</p>
  if (!session) return <p>No profile data</p>

  return (
    <>
      <Navbar session={session} signOut={handleSignOut} />
      <Header title="Dashboard" />

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

      {/* <section>
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
      </section> */}
    </>
  )
}

export async function getServerSideProps(context: NextPageContext) {

  return {
    props: {
      baseUrl: process.env.NEXT_PUBLIC_API_URL,
      accountsApiUrl: process.env.NEXT_PUBLIC_ACCOUNTS_API_URL
    }
  }
}