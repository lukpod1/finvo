import { Routes, Route } from 'react-router-dom'

import Layout from "./components/Layout"
import DashBoard from "./pages/DashBoard"
import Transactions from './pages/Transactions'
import Expenses from './pages/Expenses'
import Invoices from './pages/Invoices'
import Accounts from "./pages/Accounts"
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ConfirmSignUp from './pages/ConfirmSignUp'
import ResetPassword from "./pages/ResetPassword"
import Default from './components/Default'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route element={<Navbar />}>
          <Route index path="dashboard" element={<DashBoard />} />
          <Route path="transactions" element={<Transactions />}>
            <Route path="expenses" element={<Expenses />} />
            <Route path="invoices" element={<Invoices />} />
          </Route>
          <Route path="accounts" element={<Accounts />} />
        </Route>
      </Route>

      <Route element={<Default/>}>
        <Route path="/" element={<SignIn />}/>
        <Route path="signin" element={<SignIn />}/>
        <Route path="signup" element={<SignUp />} />
        <Route path="confirm-signup" element={<ConfirmSignUp />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={
          <h1>
            Not Found
          </h1>
        } />
      </Route>
    </Routes>
  )
}