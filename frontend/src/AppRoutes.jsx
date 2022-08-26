import { Routes, Route, Navigate } from 'react-router-dom'

import Layout from "./pages/Layout"
import DashBoard from "./pages/DashBoard"
import Transactions from './pages/Transactions'
import Expenses from './pages/Expenses'
import Invoices from './pages/Invoices'
import Accounts from "./pages/Accounts"
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ConfirmSignUp from './pages/ConfirmSignUp'
import ResetPassword from "./pages/ResetPassword"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Layout />
          <Navigate to="dashboard" replace/>
        </>
      }>
        <Route index path="dashboard" element={<DashBoard />} />
        <Route path="transactions" element={<Transactions />}>
          <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />} />
        </Route>
        <Route path="accounts" element={<Accounts />} />
      </Route>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="confirm-signup" element={<ConfirmSignUp />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="*" element={
        <h1>
          Not Found
        </h1>
      } />
    </Routes>
  )
}