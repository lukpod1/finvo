import { Auth } from "aws-amplify";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";

function ConfirmSignUp() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      confirmationCode: '',
      email: searchParams.get('email'),
    }
  })

  const handleOnPaste = async (event) => {
    let code = event.clipboardData.getData('text')
    formik.setFieldValue('confirmationCode', code)

    const reg = /^\d+$/;

    if (reg.test(code) && code.length === 6) {
      await Auth.confirmSignUp(formik.values.email, code)
        .then((user) => {
          navigate('/signin')
        }).catch((error) => {
          console.error('Error: Invalid code', code)
        })
    }
  }

  const resendConfirmationCode = async () => {
    await Auth.resendSignUp(formik.values.email)
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
            Lify App
          </h2>
          <div className="py-3 rounded text-center">
            <h1 className="text-2xl font-bold">We Emailed You!</h1>
            <div className="flex flex-col mt-4">
              <span>Your code is on the way. To log in, enter the code we sent you. It may take a minute to arrive</span>
              <span className="font-bold"></span>
            </div>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="confirmation-code"
                type="text"
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300"
                placeholder="Enter your Code"
                value={formik.values.confirmationCode}
                onChange={formik.handleChange}
                onPaste={handleOnPaste}
              />
            </div>
            <div>
              <button className="my-3 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100">
                Confirm
              </button>
            </div>
            <div>
              <button onClick={resendConfirmationCode} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-800 bg-indigo-200 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-100">
                Resend Code
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmSignUp;