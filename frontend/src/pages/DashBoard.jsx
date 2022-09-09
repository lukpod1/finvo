import { useState, useEffect } from "react";

import Header from "../components/Header";


export default function DashBoard() {
  return (
    <>
      <Header title="Dashboard" />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <h1>Usuario Logado</h1>
              <p></p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}