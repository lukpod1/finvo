import { useState, useEffect, useContext } from "react";

import Header from "../components/Header";
import { Context } from "../components/Navbar";


export default function DashBoard() {
  const user = useContext(Context)

  return (
    <>
      <Header title="Dashboard" />

      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-row justify-center py-10">
              <div className="flex flex-col rounded-xl bg-white w-80 h-28">
                <div className="h-full m-4 font-medium text-slate-400">Current Balance</div>
                <div className="h-full m-4 font-medium text-2xl">R$ 20.000,00</div>
              </div>
              <div className="flex flex-col rounded-xl bg-white mx-10 w-80 h-28">
                <div className="h-full m-4 font-medium text-slate-400">Expenses</div>
                <div className="h-full m-4 font-medium text-2xl">R$ 20.000,00</div>
              </div>
              <div className="flex flex-col rounded-xl bg-white w-80 h-28">
                <div className="h-full m-4 font-medium text-slate-400">Invoices</div>
                <div className="h-full m-4 font-medium text-2xl">R$ 20.000,00</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}