import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { AUTH_USER_TOKEN_KEY } from "../utils/constants";

export default function DashBoard() {
  return (
    <>
      <Header title="Dashboard" />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <h1>Usuario Logado</h1>
              <p>{localStorage.getItem(AUTH_USER_TOKEN_KEY)}</p>
              {/* {checkUserAuth ? (
                <>
                  <h1>Usuario Logado</h1>
                  <p>{localStorage.getItem(AUTH_USER_TOKEN_KEY)}</p>
                </>
              ) : (
                <>
                <h1>Não Autorizado</h1>
                <p>Token: {localStorage.getItem(AUTH_USER_TOKEN_KEY)}</p>
                <b>Validação: {checkUserAuth}</b>
                </>
              )} */}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}