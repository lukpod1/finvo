import axios from "axios";
import { useState, useEffect, useContext } from "react";

import Header from "../components/Header";
import { Context } from "../components/Navbar";

import { AUTH_USER_TOKEN_KEY, ENDPOINT_ACCOUNTS } from '../utils/constants'

export default function DashBoard() {
  const [count, setCount] = useState(0);
  const user = useContext(Context)

  useEffect(() => {
    setTimeout(() => {
      const token = localStorage.getItem(AUTH_USER_TOKEN_KEY)
      axios.get(`${ENDPOINT_ACCOUNTS}?userId=${user.id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((response) => {
        if (response.status === 200) {
          setCount(response.data.count);
        }
      }, 1000)
    })
  }, [user])

  return (
    <>
      <Header title="Dashboard" />

      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-row justify-center py-10">
              <div className="flex flex-col rounded-xl bg-white w-80 h-28">
                <div className="h-4 m-4 font-medium text-slate-400">Current Balance</div>
                <div className="h-4 m-3 font-medium text-4xl">R$ 20.000,00</div>
              </div>
              <div className="flex flex-col rounded-xl bg-white mx-10 w-80 h-28">
                <div className="h-4 m-4 font-medium text-slate-400">Expenses</div>
                <div className="h-4 m-3 font-medium text-4xl">R$ 20.000,00</div>
              </div>
              <div className="flex flex-col rounded-xl bg-white w-80 h-28">
                <div className="h-4 m-4 font-medium text-slate-400">Invoices</div>
                <div className="h-4 m-3 font-medium text-4xl">R$ 20.000,00</div>
              </div>
            </div>
          </div>
        </div>
        Accounts: {count}
      </main>
    </>
  )
}