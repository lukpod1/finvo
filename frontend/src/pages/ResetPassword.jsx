import { Link } from "react-router-dom"
import { useState } from "react"
import { forgotPassword } from "../services/AuthenticationService"

function ResetPassword() {
  const [codeSended, setCodeSended] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(null)

  const sendCode = async () => {
    try {
      await forgotPassword(email)
      setCodeSended(true)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleChangeEmail = (event) => {
    console.log(email)
    setEmail(event.target.value)
  }

  const handleChangeCode = (event) => {
    console.log(code)
    setCode(event.target.value)
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500" >
              Back to Sign In
            </Link>
          </p>
        </div>
        {codeSended
          ?
          <div>
            <p>
              Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.
            </p>
            <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={code}
                  onChange={handleChangeCode}
                />
              </div>
              <div>
                <button type="submit"
                  className="my-3 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => sendCode()}
                >
                  Send Code
                </button>
              </div>
            </div>
          </div>
          </div>
          
          
          :
          <div className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={email}
                  onChange={handleChangeEmail}
                />
              </div>
              <div>
                <button type="submit"
                  className="my-3 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => sendCode()}
                >
                  Send Code
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default ResetPassword;