import { useState, useEffect, useContext } from "react";

import Header from "../components/Header";
import { Context } from "../components/Navbar";

function Accounts() {
  const user = useContext(Context)
  return (
    <>
      <Header title="Accounts" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <p>{user.fullName}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </main>
    </>
  )
}

export default Accounts