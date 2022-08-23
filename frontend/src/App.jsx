import { Routes, Route } from "react-router-dom"
import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ConfirmSignUp from './pages/ConfirmSignUp'
import ResetPassword from "./pages/ResetPassword"
import Home from "./pages/Home"

function App() {

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="signin" element={<SignIn/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="confirm-signup" element={<ConfirmSignUp/>}/>
        <Route path="reset-password" element={<ResetPassword/>}/>
      </Routes>
    </div>
  )
}

export default App
