import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { Auth } from 'aws-amplify';

function SignUp() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      disableSubmit: true
    },
    onSubmit: async (values) => {
      await Auth.signUp({ username: values.email, password: values.password })
        .then((user) => {
          navigate(`/confirm-signup?email=${user.user.getUsername()}`)
        }).catch((error) => {
          console.log('error signing up:', error);
        })
    },
  })

  const compareToFirstPassword = (event) => {

    const { value } = event.target;
    formik.setFieldValue('confirmPassword', value)

    if (value && value !== formik.values.password) {
      console.log('Two passwords that you enter is inconsistent')
      formik.setFieldValue('disableSubmit', true)
    } else if (value === formik.values.password) {
      formik.setFieldValue('disableSubmit', false)
      console.log('correct')
    }
  };

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
            Sign up for Lify
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500" >
              Sign in to an existing Lify account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="my-3 appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="confirm-password"
                required
                className="my-3 appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={compareToFirstPassword}
              />
            </div>

          </div>

          <div>
            <button
              type="submit"
              disabled={formik.values.disableSubmit}
              className={formik.values.disableSubmit ?
                "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-400 hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400" :
                "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;